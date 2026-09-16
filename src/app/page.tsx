import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Handshake,
  Headset,
  Lock,
  MapPin,
  Presentation,
  ShieldCheck,
  ShieldX,
  Timer,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import {
  AccentCard,
  ACCENTS,
  CONTACT,
  GRID,
  HeroNav,
  SiteFooter,
} from "@/components/site";

/** Three ways to engage — deliberately broad. The practice is AI across
 *  AWS; contact centres are one deep specialism, not the whole identity. */
const OFFERS = [
  {
    icon: BrainCircuit,
    accent: "blue",
    title: "AI solutions architecture",
    kicker: "Design and build",
    body: "Agentic systems that make it to production: Claude Agent SDK on "
      + "Bedrock AgentCore, MCP tool layers with authorisation enforced in "
      + "code, RAG and knowledge systems, real-time pipelines, and the AWS "
      + "landing zone underneath. Hands-on where it counts — the "
      + "architecture is written by someone who ships it.",
  },
  {
    icon: Presentation,
    accent: "emerald",
    title: "Pre-sales and solution design",
    kicker: "Win the work",
    body: "Discovery that finds the real problem, demos built in days rather "
      + "than decks, proofs of concept scoped to answer the buyer's actual "
      + "question, and proposals a delivery team can stand behind. Comfortable "
      + "in front of a CIO, a risk committee or an engineer.",
  },
  {
    icon: Headset,
    accent: "violet",
    title: "Contact centres and Amazon Connect",
    kicker: "Deep specialism",
    body: "The new Connect stack — Nova Sonic voice, agentic flows, Q in "
      + "Connect, Bedrock behind it. AI front doors that verify callers, act "
      + "on real systems and hand off to humans with full context. Migrations "
      + "from legacy estates, and the AI layer on estates already on Connect.",
    href: "/msp",
  },
] as const;

const HOW = [
  {
    n: "01",
    title: "As an associate in your team",
    body: "Pre-sales, solutions architecture or hands-on build, embedded with "
      + "an AWS partner, SI, vendor or end client. Day-rate or fixed "
      + "workstream, on your paper, under your brand.",
  },
  {
    n: "02",
    title: "As a fixed-price workstream",
    body: "A scoped deliverable — a proof of concept, an agent, an integration, "
      + "a migration phase — priced and owned end to end, with handover "
      + "documentation as part of the price.",
  },
  {
    n: "03",
    title: "Never around you",
    body: "Partner work runs under NDA and non-solicitation as standard. We do "
      + "not approach a partner's clients, and we say so in writing before "
      + "the first day.",
  },
] as const;

/** Every figure traces to a dated run on real systems (marketing/FACTS.md
 *  in the platform repo). No client names, no uptime/SLA/accuracy claims. */
const PROOF = [
  {
    icon: Timer,
    accent: "blue",
    value: "~1m51s",
    label: "to onboard a client tenant",
    note: "Tenant, app consent, users, join key and verified agent access — "
      + "one CLI run from one config file. Idempotent on re-run.",
  },
  {
    icon: Zap,
    accent: "emerald",
    value: "~75s",
    label: "cloud-side stack deploy",
    note: "Gateway, gated action tools, container runtime and roles from one "
      + "config file — then torn down to verified zero residue.",
  },
  {
    icon: ShieldX,
    accent: "amber",
    value: "12 attacks",
    label: "every one refused",
    note: "A social-engineering and prompt-injection suite runs against the "
      + "live agent as a regression check on every change.",
  },
  {
    icon: Lock,
    accent: "violet",
    value: "17 checks",
    label: "negative authorisation",
    note: "A suite proving every gate denies — verified caller, known "
      + "contact, same client, own tenant only.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* ---------- hero ---------- */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#12233b] via-[#1F4E79] to-[#2f6ea8] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: GRID }}
          aria-hidden
        />
        <HeroNav />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
          <div className="flex items-start gap-5">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl sm:flex">
              <Bot className="h-8 w-8" />
            </div>
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="mb-4 border-white/30 bg-white/10 text-[11px] tracking-wide text-white"
              >
                AI architecture · pre-sales · delivery — on AWS, UK
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                AI that makes it
                <br className="hidden sm:block" /> to production.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/80">
                An independent AI practice working with AWS partners, systems
                integrators and end clients — as{" "}
                <span className="font-medium text-white">
                  solutions architect, pre-sales lead or hands-on builder
                </span>
                . Agentic systems on Bedrock and AgentCore, with a deep
                specialism in the new Amazon Connect stack. Regulated
                environments welcome.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
                >
                  <Link href="#contact">
                    Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/20 text-white hover:bg-white/30 hover:text-white"
                >
                  <Link href="/demo">See a real agent work</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> SC cleared
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4" /> AWS Certified Solutions
                  Architect — Professional
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> UK-based
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  A live agent runs behind this site
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- what we do ---------- */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight">What we do</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three ways in. Most engagements use two of them.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {OFFERS.map((o) => {
            const a = ACCENTS[o.accent];
            return (
              <AccentCard key={o.title} accent={o.accent}>
                <div className="flex items-center justify-between">
                  <div className={`inline-flex rounded-xl p-2.5 ${a.tile}`}>
                    <o.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {o.kicker}
                  </p>
                </div>
                <h3 className={`mt-4 text-lg font-semibold ${a.text}`}>
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {o.body}
                </p>
                {"href" in o && (
                  <Link
                    href={o.href}
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${a.text} hover:underline`}
                  >
                    Service-desk automation <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </AccentCard>
            );
          })}
        </div>
      </section>

      {/* ---------- how we work ---------- */}
      <section id="how" className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-start gap-5">
            <div className="hidden rounded-xl bg-blue-100 p-2.5 text-[#1F4E79] sm:inline-flex">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                How we work with partners
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Most of our work is through AWS partners and integrators.
                That&apos;s by design, and we protect it.
              </p>
            </div>
          </div>
          <div className="mt-8 divide-y rounded-xl border bg-card">
            {HOW.map((s) => (
              <div key={s.n} className="flex gap-5 p-6">
                <span className="font-mono text-sm font-semibold text-[#1F4E79]">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2.5 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            Clients own all code and IP at handover. Write actions in anything
            we build ship disabled and in dry-run — going live is an explicit,
            documented step.
          </p>
        </div>
      </section>

      {/* ---------- proof ---------- */}
      <section id="proof" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Recent work, measured
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          From an agentic service-desk platform we built and run. Each figure
          is a dated run against real systems — no uptime, SLA or accuracy
          claims, because we don&apos;t make numbers up.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {PROOF.map((p) => {
            const a = ACCENTS[p.accent];
            return (
              <AccentCard key={p.label} accent={p.accent}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {p.label}
                  </p>
                  <p.icon className={`h-4 w-4 ${a.text}`} />
                </div>
                <p className={`mt-2 text-2xl font-bold ${a.text}`}>{p.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {p.note}
                </p>
              </AccentCard>
            );
          })}
        </div>
      </section>

      {/* ---------- live demo slab ---------- */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
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
                The demo is the CV.
              </h2>
              <p className="mt-3 text-white/80">
                A real agent runs behind this site: an Amazon Connect chat that
                dispatches to a Claude agent on Bedrock AgentCore and writes
                its findings back to a ticket in a sandboxed desk — with a
                panel narrating what the system is actually doing. Start it
                from your browser.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-7 bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
              >
                <Link href="/demo">
                  Run the live demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Start a conversation
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              A pre-sales seat to fill, an architecture that needs an owner, a
              proof of concept that has to land, or a Connect estate that
              wants the AI layer — tell us what you&apos;re looking at and
              we&apos;ll come back with something concrete.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                Available to partners and integrators as an associate — day
                rate or fixed workstream.
              </p>
              <p className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                grantedison is the practice of Dale Grant — AWS Certified
                Solutions Architect Professional, SC cleared.
              </p>
              <p className="mt-5">
                Prefer email?{" "}
                <a
                  className="font-medium text-[#1F4E79] hover:underline"
                  href={`mailto:${CONTACT}`}
                >
                  {CONTACT}
                </a>
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
