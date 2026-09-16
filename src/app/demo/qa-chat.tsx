"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";

/** Same gepdemo chat-start Function URL as the task demo — one endpoint, one
 *  set of rails (origin allow-list + fail-closed rate limiter). `surface: "qa"`
 *  selects the Q&A flow server-side; the page can pick a surface, never an
 *  arbitrary flow. Anonymous by design: the Q&A agent answers only from an
 *  operator-approved set and holds no caller authority. */
const CHAT_START_URL =
  "https://4yxy2uoytzl2mqrixylj7vrmqa0gfpoo.lambda-url.us-east-1.on.aws/";

type Line = { kind: "me" | "agent" | "sys" | "typing"; text: string };

export function QaChat() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [starting, setStarting] = useState(false);
  const [live, setLive] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const tokenRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => () => wsRef.current?.close(), []);

  const push = (l: Line) =>
    setLines((prev) => [...prev.filter((p) => p.kind !== "typing"), l]);

  const start = async (firstMessage: string) => {
    setStarting(true);
    try {
      const r = await fetch(CHAT_START_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ surface: "qa" }),
      });
      const started = await r.json();
      if (!r.ok) {
        push({
          kind: "sys",
          text: started.message ?? "The demo is busy right now — try again in a few minutes.",
        });
        setStarting(false);
        return;
      }
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
      tokenRef.current = conn.ConnectionCredentials.ConnectionToken;

      const ws = new WebSocket(conn.Websocket.Url);
      wsRef.current = ws;
      ws.onopen = () => {
        ws.send(JSON.stringify({ topic: "aws/subscribe", content: { topics: ["aws/chat"] } }));
        setLive(true);
        setStarting(false);
        void sendToConnect(firstMessage);
      };
      ws.onclose = () => {
        setLive(false);
        push({ kind: "sys", text: "Chat ended — send a message to start a new one." });
      };
      ws.onerror = () => {
        setLive(false);
        setStarting(false);
      };
      ws.onmessage = (evt) => {
        let item;
        try {
          const frame = JSON.parse(evt.data);
          if (frame.topic !== "aws/chat" || !frame.content) return;
          item = JSON.parse(frame.content);
        } catch {
          return;
        }
        if (item.Type !== "MESSAGE" || !item.Content) return;
        if (item.ParticipantRole === "CUSTOMER") return; // our own echo
        if (item.Content.startsWith("One moment") || item.Content.startsWith("Still checking")) {
          setLines((prev) => [
            ...prev.filter((p) => p.kind !== "typing"),
            { kind: "typing", text: item.Content },
          ]);
          return;
        }
        push({ kind: "agent", text: item.Content });
      };
    } catch {
      push({ kind: "sys", text: "Network problem — try again." });
      setStarting(false);
    }
  };

  const sendToConnect = async (text: string) => {
    await fetch("https://participant.connect.us-east-1.amazonaws.com/participant/message", {
      method: "POST",
      headers: { "content-type": "application/json", "X-Amz-Bearer": tokenRef.current },
      body: JSON.stringify({ ContentType: "text/plain", Content: text }),
    });
  };

  const submit = async () => {
    const text = input.trim();
    if (!text || starting) return;
    setInput("");
    push({ kind: "me", text });
    if (live && wsRef.current?.readyState === WebSocket.OPEN) {
      void sendToConnect(text);
    } else {
      void start(text);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-emerald-500/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-emerald-400" />
          <p className="text-sm font-semibold text-emerald-200">
            Demo Licensing Support — WhatsApp-style Q&amp;A
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className={`h-2 w-2 rounded-full ${live ? "animate-pulse bg-emerald-400" : "bg-gray-600"}`} />
          {live ? "live" : "starts on first message"}
        </span>
      </div>

      <div ref={scrollRef} className="h-72 space-y-2 overflow-y-auto px-5 py-4">
        {lines.length === 0 && (
          <p className="text-sm text-gray-400">
            Ask it like a customer would — try{" "}
            <em>&ldquo;my gran is 80 and gets pension credit, does she have to pay?&rdquo;</em>{" "}
            Answers come only from an operator-approved set; anything off-list
            is handed to a human, never improvised.
          </p>
        )}
        {lines.map((l, i) =>
          l.kind === "sys" ? (
            <p key={i} className="text-center text-xs text-gray-500">{l.text}</p>
          ) : l.kind === "typing" ? (
            <p key={i} className="text-xs italic text-gray-500">{l.text}</p>
          ) : (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                l.kind === "me"
                  ? "ml-auto rounded-br-sm bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                  : "rounded-bl-sm bg-slate-800/70"
              }`}
            >
              {l.text}
            </div>
          ),
        )}
      </div>

      <form
        className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question about your licence…"
          className="h-10 flex-1 rounded-lg bg-slate-800/50 border border-white/10 px-3 text-sm outline-none focus:border-cyan-500/50"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={starting || !input.trim()}
          className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 disabled:opacity-50"
        >
          {starting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
}
