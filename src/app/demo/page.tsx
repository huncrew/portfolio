import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Fingerprint,
  ListChecks,
  ShieldCheck,
  Timer,
} from "lucide-react";

import { DemoRunner } from "./demo-client";
import { QaChat } from "./qa-chat";

export const metadata: Metadata = {
  title: "Live demo — a real agent, in your browser | Dale Grant",
  description:
    "Start a real Amazon Connect chat that dispatches to a Claude agent on "
    + "Bedrock AgentCore — sandboxed, gated, and narrated so you can see "
    + "what the AI is actually doing.",
};

/** How the demo stays safe — each of these is enforced server-side. */
const RAILS = [
  {
    icon: Fingerprint,
    title: "Identity keys, not emails",
    body: "The browser sends an identity key. The email address it maps to "
      + "lives in a server-side directory the page cannot edit — so nobody "
      + "can type someone else's address and borrow their authority.",
  },
  {
    icon: ListChecks,
    title: "An allow-list, not a prompt",
    body: "You pick a task id from a fixed list. There is no free-text way "
      + "to talk the agent into arbitrary work — the flow chooses what runs, "
      + "not the visitor.",
  },
  {
    icon: ShieldCheck,
    title: "Gates outside the model",
    body: "Every action the agent can reach re-checks its own authority at "
      + "execution time, in the action itself. The demo desk is a sandbox "
      + "with synthetic identities — not a customer environment.",
  },
  {
    icon: Timer,
    title: "Rate-limited sandbox",
    body: "Each run costs real model spend (roughly $0.03 per gated "
      + "scenario), so the endpoint is rate-limited per visitor and per "
      + "day. If it says it's busy, that's the limiter doing its job.",
  },
] as const;

export default function DemoPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Dale Grant
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-10">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live demo — real systems, sandboxed
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              This page drives a real agent.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            The button below starts a genuine Amazon Connect chat. The flow
            hands a verified identity to a dispatcher Lambda, answers you in
            seconds, and a Claude agent on Bedrock AgentCore keeps working
            after the chat ends — writing its findings to a ticket in a
            sandboxed demo desk. The right-hand panel narrates what is actually
            happening. Same stack I deploy for clients — not a mock.
          </p>
        </div>
      </section>

      {/* Runner */}
      <section className="relative px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <DemoRunner />
        </div>
      </section>

      {/* Q&A */}
      <section className="relative px-6 py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Talk to a grounded Q&amp;A agent
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              The same conversation a WhatsApp number carries: Amazon Connect
              chat in front, a Claude agent on Bedrock AgentCore behind it,
              answering only from an operator-edited answer set. Ask a question
              sideways and it still finds the approved answer; ask something
              off-list and it hands you to a human rather than improvising — on
              a public channel, an invented answer about payments or legal
              duties is worse than none.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              The answer set here is a fictional licensing service, seeded as
              demo data. Point the same flow at a WhatsApp Business number and
              this exact conversation happens in WhatsApp.
            </p>
          </div>
          <QaChat />
        </div>
      </section>

      {/* Rails */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Why this can sit on the open internet
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mb-10">
            The interesting part isn&apos;t that it works — it&apos;s what it
            refuses. These rails are enforced server-side; the page cannot
            loosen them.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {RAILS.map((r) => (
              <div
                key={r.title}
                className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <r.icon className="text-cyan-400" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-500 max-w-3xl">
            The same architecture on the voice path adds deterministic OTP
            verification before the flow ever runs — verification is not
            authorisation, and the platform treats them as different jobs.
          </p>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Dale Grant. All rights reserved.
      </footer>
    </div>
  );
}
