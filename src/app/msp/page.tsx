import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  Headset,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AccentCard,
  ACCENTS,
  CONTACT,
  GRID,
  HeroNav,
  SiteFooter,
} from "@/components/site";

export const metadata: Metadata = {
  title: "Agentic AI for MSPs | grantedison",
  description:
    "AI contact centres, autonomous ticket resolution and internal agents "
    + "for MSPs and service businesses — built on AWS, in your own account, "
    + "with provable authorisation gates.",
};

const LAYERS = [
  {
    icon: Headset,
    accent: "blue",
    n: "01",
    title: "AI contact centre — the entry point",
    body: "Amazon Connect + Nova Sonic real-time voice + Bedrock agents. "
      + "Answers calls with no queue, authenticates the caller server-side "
      + "— the agent cannot act on an unverified caller — resolves L1 "
      + "requests autonomously (password resets via Microsoft Graph, access "
      + "diagnostics, ticket lookup), and escalates to a human with the "
      + "full transcript, customer profile and ticket context already "
      + "loaded. Runs alongside existing phone systems — no rip-and-replace.",
  },
  {
    icon: Wrench,
    accent: "emerald",
    n: "02",
    title: "Autonomous ticket resolution",
    body: "Agents that work the PSA queue itself — Halo and others — "
      + "triage, diagnose, resolve, update. Not just logging tickets from "
      + "calls: clearing L1 volume around the clock so senior technicians "
      + "stay on complex, billable work.",
  },
  {
    icon: FileText,
    accent: "violet",
    n: "03",
    title: "Expanding agentic layers",
    body: "Longer-running internal agents: bid writing, presales support, "
      + "back-office operations. The contact centre is the way in; the "
      + "agentic platform is the relationship.",
  },
] as const;

const FIT = [
  "MSPs with ticketed service desks (Halo / ConnectWise / Autotask)",
  "Telecoms and UC providers running fault and provisioning desks",
  "Organisations already on Amazon Connect wanting the AI layer",
  "Public sector — councils, NHS, government contact centres (SC cleared)",
] as const;

export default function MspPage() {
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
              For MSPs and service businesses
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Agentic AI for MSPs,
              <br className="hidden sm:block" /> built on AWS.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Three expanding layers — an AI front door for the desk, agents
              that work the ticket queue itself, and internal agents behind
              them. Delivered in{" "}
              <span className="font-medium text-white">your own AWS account</span>{" "}
              with authorisation gates that live in the actions, not the
              prompt. The reference delivery: an 8-week fixed-price engagement
              for a UK MSP, including HaloPSA and Microsoft 365 tenant
              integration.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
              >
                <Link href="/#contact">
                  Book a call <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/20 text-white hover:bg-white/30 hover:text-white"
              >
                <Link href="/demo">Watch a real agent work</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- the three layers ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Three layers, one platform
        </h2>
        <div className="mt-8 space-y-5">
          {LAYERS.map((l) => {
            const a = ACCENTS[l.accent];
            return (
              <AccentCard key={l.n} accent={l.accent}>
                <div className="flex gap-5">
                  <span className="font-mono text-sm font-semibold text-[#1F4E79]">
                    {l.n}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex rounded-xl p-2 ${a.tile}`}>
                        <l.icon className="h-4 w-4" />
                      </div>
                      <h3 className={`text-lg font-semibold ${a.text}`}>
                        {l.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {l.body}
                    </p>
                  </div>
                </div>
              </AccentCard>
            );
          })}
        </div>
      </section>

      {/* ---------- who it's for ---------- */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">Who it&apos;s for</h2>
          <div className="mt-6 divide-y rounded-xl border bg-card">
            {FIT.map((f) => (
              <p key={f} className="flex items-start gap-3 p-5 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {f}
              </p>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm text-muted-foreground">
            Engagements are fixed price with phased payments; the work lands in
            your own AWS account and you own all code and IP. Write actions
            ship disabled and in dry-run — going live is an explicit,
            documented step, not a default.
          </p>
        </div>
      </section>

      {/* ---------- the product ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12233b] via-[#1F4E79] to-[#2f6ea8] p-10 text-white">
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: GRID }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <div className="inline-flex rounded-xl border border-white/30 bg-white/20 p-2.5 backdrop-blur-xl">
              <Bot className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight">
              The productised version: oasify.ai
            </h2>
            <p className="mt-3 text-white/80">
              The same platform, productised — gated AI ticket-resolution
              agents for Halo-based service desks that execute the fix, not
              just the triage, deployed in your own cloud with an
              authorisation gate we can prove. If you run a HaloPSA desk, the
              first step is a read on your own last 90 days of tickets.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
            >
              <a href="https://oasify.ai">
                oasify.ai <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Or talk to us directly:{" "}
          <a
            className="font-medium text-[#1F4E79] hover:underline"
            href={`mailto:${CONTACT}`}
          >
            {CONTACT}
          </a>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
