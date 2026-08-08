import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle2,
  Cloud,
  FileText,
  Handshake,
  Headset,
  Lock,
  MapPin,
  ShieldCheck,
  ShieldX,
  Timer,
  Waypoints,
  Wrench,
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

/** Positioning per the business source of truth: early to Connect's second
 *  act; the crowd competing over the old stack is not the competition. */
const CLAIMS = [
  {
    icon: Waypoints,
    accent: "blue",
    title: "Early, not late",
    body: "Amazon re-platformed Connect in 2026 — Nova Sonic speech-to-speech "
      + "voice, agentic flows, Bedrock AgentCore. Most delivery expertise in "
      + "the market was built for the previous stack. We built agentic "
      + "delivery before it was native in Connect, and have a real build on "
      + "the new stack. grantedison is not late to Connect; it is early to "
      + "Connect's second act.",
  },
  {
    icon: ShieldCheck,
    accent: "violet",
    title: "Gates outside the model",
    body: "Callers are verified deterministically — never by the LLM — and "
      + "every action re-checks its own authority at execution time. The "
      + "deny paths are covered by an automated test suite that runs on "
      + "every change, and the two-layer refusal is demonstrable live.",
  },
  {
    icon: Cloud,
    accent: "emerald",
    title: "Your account, your IP",
    body: "Everything is built in your own AWS account: agents on Bedrock "
      + "AgentCore, tools as single-purpose Lambdas behind an MCP gateway. "
      + "Fixed price, phased payments — and you own all code and IP at "
      + "handover.",
  },
] as const;

const LAYERS = [
  {
    icon: Headset,
    accent: "blue",
    title: "AI contact centres",
    kicker: "The entry point",
    body: "Amazon Connect + Nova Sonic real-time voice + Bedrock agents. "
      + "Answers with no queue, verifies the caller server-side — the agent "
      + "cannot act on an unverified caller — resolves L1 requests "
      + "end-to-end, and escalates to a human with the transcript and "
      + "context already loaded. Runs alongside your existing phone system: "
      + "no rip-and-replace.",
  },
  {
    icon: Wrench,
    accent: "emerald",
    title: "Autonomous ticket resolution",
    kicker: "The queue itself",
    body: "Agents that work the service-desk queue — triage, diagnose, "
      + "resolve, update — against live systems, not a knowledge base, with "
      + "every action written back to the ticket as an audit trail.",
  },
  {
    icon: FileText,
    accent: "violet",
    title: "Internal agent layers",
    kicker: "The relationship",
    body: "Longer-running agents for bids, presales and back-office "
      + "operations. The contact centre is the way in; the agentic platform "
      + "is the relationship.",
  },
] as const;

const ENGAGEMENT = [
  {
    n: "01",
    title: "Discovery and foundation",
    body: "In your own AWS account from day one — identity, integrations and "
      + "the authorisation model come first, not last.",
  },
  {
    n: "02",
    title: "Production workflows",
    body: "Integrations to your PSA, Microsoft 365 and CRM. Write actions "
      + "ship disabled and in dry-run; turning one on takes an explicit "
      + "confirmation that states its blast radius.",
  },
  {
    n: "03",
    title: "Human handoff and agent workspace",
    body: "Warm transfer with the transcript, customer profile and ticket "
      + "context already loaded — nobody starts from zero.",
  },
  {
    n: "04",
    title: "Documentation, runbooks, handover",
    body: "Fixed price, phased payments. You own all code and IP.",
  },
] as const;

/** Every figure traces to marketing/FACTS.md in the platform repo. No prices
 *  (unsettled), no uptime/SLA/accuracy (unmeasured), no client names. */
const PROOF = [
  {
    icon: Timer,
    accent: "blue",
    value: "~1m51s",
    label: "to onboard a client",
    note: "Tenant, app consent, users, PSA join key and verified agent "
      + "access — one CLI run from one config file, and re-runs are "
      + "idempotent.",
  },
  {
    icon: Zap,
    accent: "emerald",
    value: "~75s",
    label: "cloud-side stack deploy",
    note: "The full client stack — MCP gateway, gated action tools, "
      + "container runtime, roles — from one config file. Torn down again "
      + "to verified zero residue.",
  },
  {
    icon: ShieldX,
    accent: "amber",
    value: "12 attacks",
    label: "every one refused",
    note: "A social-engineering and prompt-injection suite runs against the "
      + "live agent — impersonation, authority spoofing, urgency, "
      + "instruction override — as a regression check on every change.",
  },
  {
    icon: Lock,
    accent: "violet",
    value: "17 checks",
    label: "negative authorisation",
    note: "A suite proving every gate denies — verified caller, PSA "
      + "contact, same client, that client's tenant only — from the first "
      + "UK MSP deployment.",
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
                Agentic Amazon Connect — UK delivery
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                The UK specialists in
                <br className="hidden sm:block" /> agentic Amazon Connect.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/80">
                Connect&apos;s second act is here — Nova Sonic voice, agentic
                flows, Bedrock AgentCore. We design, build and hand over AI
                contact centres that{" "}
                <span className="font-medium text-white">
                  verify callers, act on real systems, and prove every
                  authorisation
                </span>{" "}
                — delivered in your own AWS account.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
                >
                  <Link href="#contact">
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

      {/* ---------- the position ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Plenty of firms do Amazon Connect. The new stack is a different job.
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three things we&apos;d rather demonstrate on your systems than assert
          on a slide.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CLAIMS.map((c) => {
            const a = ACCENTS[c.accent];
            return (
              <AccentCard key={c.title} accent={c.accent}>
                <div className={`inline-flex rounded-xl p-2.5 ${a.tile}`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className={`mt-4 text-lg font-semibold ${a.text}`}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </AccentCard>
            );
          })}
        </div>
      </section>

      {/* ---------- what we deliver ---------- */}
      <section id="delivery" className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">What we deliver</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Three expanding layers — for Connect estates, legacy contact-centre
            migrations, MSPs and public sector.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {LAYERS.map((l) => {
              const a = ACCENTS[l.accent];
              return (
                <AccentCard key={l.title} accent={l.accent}>
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex rounded-xl p-2.5 ${a.tile}`}>
                      <l.icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {l.kicker}
                    </p>
                  </div>
                  <h3 className={`mt-4 text-lg font-semibold ${a.text}`}>
                    {l.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {l.body}
                  </p>
                </AccentCard>
              );
            })}
          </div>

          <h3 className="mt-14 text-xl font-bold tracking-tight">
            How an engagement runs
          </h3>
          <div className="mt-6 divide-y rounded-xl border bg-card">
            {ENGAGEMENT.map((s) => (
              <div key={s.n} className="flex gap-5 p-6">
                <span className="font-mono text-sm font-semibold text-[#1F4E79]">
                  {s.n}
                </span>
                <div>
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2.5 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            Nothing changes state because a model decided it should. The
            authorisation gates live in the actions, not in the prompt — a
            model cannot argue its way past them, because the model is not the
            thing doing the checking.
          </p>
        </div>
      </section>

      {/* ---------- proof ---------- */}
      <section id="proof" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Proof, not promises
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Each of these happened on a dated run against real systems — in
          sandbox and on a first UK MSP deployment.
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
                Don&apos;t take a slide&apos;s word for it.
              </h2>
              <p className="mt-3 text-white/80">
                A real agent runs behind this site: an Amazon Connect chat that
                dispatches to a Claude agent on Bedrock AgentCore and writes
                its findings back to a ticket in a sandboxed demo desk. Start
                it from your browser and watch what it does — and what it
                refuses.
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

      {/* ---------- partners ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
          <div className="flex items-start gap-5">
            <div className="hidden rounded-xl bg-blue-100 p-2.5 text-[#1F4E79] sm:inline-flex">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1F4E79]">
                Delivery capacity for partners and primes
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
                If you resell Connect or prime CX programmes and need agentic
                delivery capacity, grantedison delivers workstreams — not
                bodies. Fixed-price or T&amp;M, under your brand or alongside
                your team, with one accountable point of delivery: SC-cleared
                and UK-based.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link href="#contact">
                  Talk about capacity <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- honesty panel ---------- */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-xl border bg-gradient-to-r from-amber-50 to-orange-50 p-7">
            <h2 className="text-xl font-semibold text-amber-900">
              Where this honestly is
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-amber-900/85">
              grantedison is a specialist consultancy in build-out. The
              platform work is proven live in sandbox and on a first UK MSP
              deployment — no one is in production on it yet. You will not
              find an uptime figure, an SLA, an accuracy percentage or a logo
              wall on this page: the numbers above trace to dated runs, and
              clients are named only with written approval. What we will do is
              demonstrate every claim on your systems.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-amber-900/85">
              Built and delivered personally by Dale Grant — AWS Certified
              Solutions Architect Professional, SC cleared.
            </p>
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
              A Connect estate you want the AI layer on, a legacy
              Avaya/Genesys/Mitel migration, a ticketed service desk, or a
              programme that needs delivery capacity — tell me what you&apos;re
              looking at and I&apos;ll come back with something concrete.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                Demos always ready — the live demo on this site is the real
                stack, and a deeper walkthrough takes one call.
              </p>
              <p className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                Direct or via your existing partner — both work.
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
