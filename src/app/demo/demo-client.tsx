"use client";
import { useState } from "react";
import {
  Bot,
  CircleDot,
  Loader2,
  MessageSquare,
  Play,
  Terminal,
} from "lucide-react";

/** gepdemo chat-start Function URL — accepts an identity KEY and a task id
 *  from a server-side allow-list; origin-pinned and rate-limited. */
const CHAT_START_URL =
  "https://4yxy2uoytzl2mqrixylj7vrmqa0gfpoo.lambda-url.us-east-1.on.aws/";

const TASKS = [
  {
    id: "access-review",
    label: "Access review",
    blurb: "Review what the demo user can reach in the demo tenant.",
  },
  {
    id: "new-starter",
    label: "New starter",
    blurb: "Kick off a new-starter check for the demo company.",
  },
  {
    id: "offboard-check",
    label: "Offboard check",
    blurb: "Check what offboarding the demo user would need to touch.",
  },
] as const;

type ChatLine = { kind: "msg" | "sys"; text: string };
type NarrationLine = { t: string; text: string };

const stamp = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

export const DemoRunner = () => {
  const [task, setTask] = useState<(typeof TASKS)[number]["id"]>("access-review");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [chat, setChat] = useState<ChatLine[]>([]);
  const [narration, setNarration] = useState<NarrationLine[]>([]);
  const [replyMs, setReplyMs] = useState<number | null>(null);

  const say = (line: ChatLine) => setChat((c) => [...c, line]);
  const narrate = (text: string) =>
    setNarration((n) => [...n, { t: stamp(), text }]);

  const run = async () => {
    setRunning(true);
    setDone(false);
    setChat([]);
    setNarration([]);
    setReplyMs(null);

    try {
      narrate(
        "Sending the request. Note what leaves the browser: an identity KEY "
          + "(demo-user) and a task id — never an email address. The address "
          + "lives in a server-side directory this page cannot edit.",
      );
      const t0 = performance.now();
      const r = await fetch(CHAT_START_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ identity: "demo-user", task }),
      });
      const started = await r.json().catch(() => ({}));
      if (r.status === 429) {
        narrate(
          "The rate limiter said no — each run spends real model tokens, so "
            + "the endpoint is capped per visitor and per day. Try again later.",
        );
        setRunning(false);
        return;
      }
      if (!r.ok) {
        narrate(
          `The endpoint refused (${started.error || r.status}). That refusal `
            + "is the product working — it does not echo what you sent or "
            + "hint at what would have been accepted.",
        );
        setRunning(false);
        return;
      }

      narrate(
        "Amazon Connect accepted the contact and issued a participant token. "
          + "The contact flow has NOT run yet — it only starts when a "
          + "participant actually joins the websocket.",
      );

      const region = started.region || "us-east-1";
      const cr = await fetch(
        `https://participant.connect.${region}.amazonaws.com/participant/connection`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-Amz-Bearer": started.participantToken,
          },
          body: JSON.stringify({ Type: ["WEBSOCKET", "CONNECTION_CREDENTIALS"] }),
        },
      );
      const conn = await cr.json();
      if (!cr.ok) throw new Error("participant connection failed");

      const ws = new WebSocket(conn.Websocket.Url);
      let gotReply = false;

      ws.onopen = () => {
        ws.send(
          JSON.stringify({ topic: "aws/subscribe", content: { topics: ["aws/chat"] } }),
        );
        say({ kind: "sys", text: "Connected — the flow is running." });
        narrate(
          "Joined the websocket. The flow is now handing the verified "
            + "identity and task to the dispatcher Lambda, which fires the "
            + "agent asynchronously and returns a reference immediately — "
            + "the caller never waits on the AI.",
        );
      };
      ws.onerror = () => {
        say({ kind: "sys", text: "Connection error." });
        setRunning(false);
      };
      ws.onclose = () => {
        setRunning(false);
        setDone(true);
        narrate(
          "Chat closed — but the work has not stopped. The Claude agent on "
            + "Bedrock AgentCore is still running: it diagnoses against live "
            + "data in the demo tenant and writes its findings to the ticket "
            + "in the demo desk, with the audit trail written by platform "
            + "code rather than by the model.",
        );
      };
      ws.onmessage = (evt) => {
        let frame;
        try {
          frame = JSON.parse(evt.data);
        } catch {
          return;
        }
        if (frame.topic !== "aws/chat" || !frame.content) return;
        let item;
        try {
          item = JSON.parse(frame.content);
        } catch {
          return;
        }
        if (item.Type === "MESSAGE" && item.Content) {
          say({ kind: "msg", text: item.Content });
          if (!gotReply) {
            gotReply = true;
            const ms = Math.round(performance.now() - t0);
            setReplyMs(ms);
            narrate(
              `The flow answered ${ms}ms after the request left this page — `
                + "measured here, on this run, not quoted from a deck. The "
                + "seconds of real agent work happen behind that answer.",
            );
          }
        }
        if (item.Type === "EVENT" && item.ContentType?.endsWith("chat.ended")) {
          say({ kind: "sys", text: "Flow finished." });
        }
      };
    } catch {
      narrate("Something went wrong on the network path — try again.");
      setRunning(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="grid gap-3 sm:grid-cols-3 flex-1">
          {TASKS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTask(t.id)}
              disabled={running}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                task === t.id
                  ? "border-cyan-400/60 bg-cyan-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <p className="font-semibold">{t.label}</p>
              <p className="mt-1 text-sm text-gray-400">{t.blurb}</p>
            </button>
          ))}
        </div>
        <button
          onClick={run}
          disabled={running}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-60"
        >
          {running ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Running…
            </>
          ) : (
            <>
              <Play size={20} /> Start the real thing
            </>
          )}
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <MessageSquare size={16} className="text-cyan-400" />
            <p className="text-sm font-semibold">What the caller sees</p>
            {replyMs !== null && (
              <span className="ml-auto rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                first reply {replyMs}ms
              </span>
            )}
          </div>
          <div className="min-h-56 space-y-2 p-5">
            {chat.length === 0 && (
              <p className="text-sm text-gray-400">
                Pick a task and press start — this opens a genuine Connect chat
                as <span className="font-mono text-gray-300">demo-user</span>, a
                synthetic identity in the demo tenant.
              </p>
            )}
            {chat.map((l, i) =>
              l.kind === "msg" ? (
                <div key={i} className="rounded-xl bg-slate-800/70 px-4 py-2.5 text-sm">
                  {l.text}
                </div>
              ) : (
                <p key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <CircleDot size={12} /> {l.text}
                </p>
              ),
            )}
            {done && (
              <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                <Bot size={16} className="mb-1" />
                The chat is over; the agent isn&apos;t. Its diagnosis lands on
                the demo-desk ticket in the next minute or so — that async
                split is the design: the caller gets an instant answer, the
                real work happens behind it.
              </div>
            )}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <Terminal size={16} className="text-cyan-400" />
            <p className="text-sm font-semibold">What is actually happening</p>
          </div>
          <div className="min-h-56 p-5">
            {narration.length === 0 && (
              <p className="text-sm text-gray-400">
                The glass box. Every step of the real path gets narrated here as
                it happens — no payloads, no identifiers, just what the system
                is doing and why it is built that way.
              </p>
            )}
            <div className="space-y-3">
              {narration.map((n, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs text-gray-500">{n.t}</span>
                  <p className="text-sm leading-relaxed text-gray-200">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
