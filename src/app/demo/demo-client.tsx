"use client";
import { useRef, useState } from "react";
import {
  Bot,
  CircleDot,
  Loader2,
  MessageSquare,
  Play,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/** gepdemo chat-start Function URL — accepts an identity KEY and a task id
 *  from a server-side allow-list; rate-limited. See the rails section. */
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

const stamp = () =>
  new Date().toLocaleTimeString("en-GB", { hour12: false }) as string;

export const DemoRunner = () => {
  const [task, setTask] = useState<(typeof TASKS)[number]["id"]>(
    "access-review",
  );
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [chat, setChat] = useState<ChatLine[]>([]);
  const [narration, setNarration] = useState<NarrationLine[]>([]);
  const [replyMs, setReplyMs] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

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
            + "the endpoint is capped per visitor and per day. Try again "
            + "later, or ask for a walkthrough instead.",
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
          body: JSON.stringify({
            Type: ["WEBSOCKET", "CONNECTION_CREDENTIALS"],
          }),
        },
      );
      const conn = await cr.json();
      if (!cr.ok) throw new Error("participant connection failed");

      const ws = new WebSocket(conn.Websocket.Url);
      wsRef.current = ws;
      let gotReply = false;

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            topic: "aws/subscribe",
            content: { topics: ["aws/chat"] },
          }),
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
        if (
          item.Type === "EVENT"
          && item.ContentType
          && item.ContentType.endsWith("chat.ended")
        ) {
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
      {/* task picker */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="grid gap-2 sm:grid-cols-3">
          {TASKS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTask(t.id)}
              disabled={running}
              className={`rounded-xl border p-4 text-left transition-colors ${
                task === t.id
                  ? "border-[#1F4E79] bg-blue-50/60 shadow-sm"
                  : "bg-card hover:bg-muted"
              }`}
            >
              <p className="text-sm font-semibold">{t.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.blurb}</p>
            </button>
          ))}
        </div>
        <Button
          size="lg"
          onClick={run}
          disabled={running}
          className="bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
        >
          {running ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running…
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start the real thing
            </>
          )}
        </Button>
      </div>

      {/* split screen: chat | narration */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-5 py-3">
            <MessageSquare className="h-4 w-4 text-[#1F4E79]" />
            <p className="text-sm font-semibold">What the caller sees</p>
            {replyMs !== null && (
              <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                first reply {replyMs}ms
              </span>
            )}
          </div>
          <div className="min-h-56 space-y-2 p-5">
            {chat.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Pick a task and press start — this opens a genuine Connect
                chat as <span className="font-mono">demo-user</span>, a
                synthetic identity in the demo tenant.
              </p>
            )}
            {chat.map((l, i) =>
              l.kind === "msg" ? (
                <div
                  key={i}
                  className="rounded-xl bg-muted px-4 py-2.5 text-sm"
                >
                  {l.text}
                </div>
              ) : (
                <p
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <CircleDot className="h-3 w-3" /> {l.text}
                </p>
              ),
            )}
            {done && (
              <div className="mt-3 rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 text-sm text-emerald-900">
                <Bot className="mb-1 h-4 w-4" />
                The chat is over; the agent isn&apos;t. Its diagnosis lands on
                the demo-desk ticket in the next minute or so — that async
                split is the design: the caller gets an instant answer, the
                real work happens behind it.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-5 py-3">
            <Terminal className="h-4 w-4 text-[#1F4E79]" />
            <p className="text-sm font-semibold">What is actually happening</p>
          </div>
          <div className="min-h-56 p-5">
            {narration.length === 0 && (
              <p className="text-sm text-muted-foreground">
                The glass box. Every step of the real path gets narrated here
                as it happens — no payloads, no identifiers, just what the
                system is doing and why it is built that way.
              </p>
            )}
            <div className="space-y-3">
              {narration.map((n, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {n.t}
                  </span>
                  <p className="text-sm leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
