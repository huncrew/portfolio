import type { Metadata } from "next";
import {
  Fingerprint,
  ListChecks,
  ShieldCheck,
  Timer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  AccentCard,
  ACCENTS,
  GRID,
  HeroNav,
  SiteFooter,
} from "@/components/site";
import { DemoRunner } from "./demo-client";
import { QaChat } from "./qa-chat";

export const metadata: Metadata = {
  title: "Live demo — a real agent, in your browser | grantedison",
  description:
    "Start a real Amazon Connect chat that dispatches to a Claude agent on "
    + "Bedrock AgentCore — sandboxed, gated, and narrated so you can see "
    + "what the AI is actually doing.",
};

/** How the demo stays safe — each of these is enforced server-side. */
const RAILS = [
  {
    icon: Fingerprint,
    accent: "violet",
    title: "Identity keys, not emails",
    body: "The browser sends an identity key. The email address it maps to "
      + "lives in a server-side directory the page cannot edit — so nobody "
      + "can type someone else's address and borrow their authority.",
  },
  {
    icon: ListChecks,
    accent: "blue",
    title: "An allow-list, not a prompt",
    body: "You pick a task id from a fixed list. There is no free-text way "
      + "to talk the agent into arbitrary work — the flow chooses what runs, "
      + "not the visitor.",
  },
  {
    icon: ShieldCheck,
    accent: "emerald",
    title: "Gates outside the model",
    body: "Every action the agent can reach re-checks its own authority at "
      + "execution time, in the action itself. The demo desk is a sandbox "
      + "with synthetic identities — not a customer environment.",
  },
  {
    icon: Timer,
    accent: "amber",
    title: "Rate-limited sandbox",
    body: "Each run costs real model spend (roughly $0.03 per gated "
      + "scenario), so the endpoint is rate-limited per visitor and per "
      + "day. If it says it's busy, that's the limiter doing its job.",
  },
] as const;

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#12233b] via-[#1F4E79] to-[#2f6ea8] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: GRID }}
          aria-hidden
        />
        <HeroNav />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-8">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-4 border-white/30 bg-white/10 text-[11px] tracking-wide text-white"
            >
              Live demo — real systems, sandboxed
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              This page drives a real agent.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              The button below starts a genuine Amazon Connect chat. The flow
              hands a verified identity to a dispatcher Lambda, answers you in
              under a second, and a Claude agent on Bedrock AgentCore keeps
              working after the chat ends — writing its findings to a ticket
              in a sandboxed demo desk. The right-hand panel narrates what is
              actually happening.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Same stack we deploy for clients — not a mock
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- the runner ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <DemoRunner />
      </section>

      {/* ---------- WhatsApp-style Q&A ---------- */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Talk to a grounded Q&amp;A agent
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                The same conversation a WhatsApp number carries: Amazon Connect
                chat in front, a Claude agent on Bedrock AgentCore behind it,
                answering only from an operator-edited answer set. Ask a
                question sideways and it still finds the approved answer; ask
                something off-list and it hands you to a human rather than
                improvising — on a public channel, an invented answer about
                payments or legal duties is worse than none.
              </p>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                The answer set here is a fictional licensing service, seeded as
                demo data. Point the same flow at a WhatsApp Business number
                and this exact conversation happens in WhatsApp.
              </p>
            </div>
            <QaChat />
          </div>
        </div>
      </section>

      {/* ---------- rails ---------- */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Why we can put this on the open internet
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The interesting part isn&apos;t that it works — it&apos;s what it
            refuses. These rails are enforced server-side; the page cannot
            loosen them.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {RAILS.map((r) => {
              const a = ACCENTS[r.accent];
              return (
                <AccentCard key={r.title} accent={r.accent}>
                  <div className={`inline-flex rounded-xl p-2.5 ${a.tile}`}>
                    <r.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mt-4 text-lg font-semibold ${a.text}`}>
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </AccentCard>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            The same architecture on the voice path adds deterministic OTP
            verification before the flow ever runs — verification is not
            authorisation, and the platform treats them as different jobs.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
