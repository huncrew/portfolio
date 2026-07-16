"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Headset,
  KeyRound,
  UserX,
  FolderSearch,
  Ticket,
  SearchCheck,
  Users,
  BadgePercent,
  BellRing,
  FileText,
  UserPlus,
  ListChecks,
  ShieldCheck,
  Wrench,
  Route,
  ScrollText,
  PhoneCall,
  Fingerprint,
  BrainCircuit,
  Plug,
  ClipboardList,
} from "lucide-react";
import {
  AnimatedBackground,
  GlassCard,
  SiteNav,
  SiteFooter,
} from "@/components/site";

const howItWorks = [
  {
    icon: ShieldCheck,
    title: "Verify",
    description:
      "The caller is verified once at intake — SMS one-time passcode on voice, single sign-on on chat. Verification is decoupled from execution, so every downstream action knows exactly who asked.",
  },
  {
    icon: Wrench,
    title: "Resolve",
    description:
      "Governed tools execute the request against Microsoft 365 with scoped, per-tenant credentials — no shared admin accounts, no credentials in prompts. Destructive actions are approval-gated.",
  },
  {
    icon: Route,
    title: "Route",
    description:
      "Anything the AI shouldn't handle is warm-transferred to your engineers with the verified identity, a conversation summary, and the full tool history — no 'can you repeat all that?'",
  },
  {
    icon: ScrollText,
    title: "Audit",
    description:
      "Every action — who requested it, what was done, in which tenant — is written back to the PSA ticket. The automation leaves the same paper trail your engineers do.",
  },
];

const serviceDeskCapabilities = [
  {
    icon: KeyRound,
    title: "Password, MFA & lockout resolution",
    description:
      "Verified caller → reset executed via Microsoft Graph → confirmed on the call → ticket logged. The highest-volume L1 contacts, handled end-to-end.",
  },
  {
    icon: UserX,
    title: "User offboarding",
    description:
      "Account disablement and access revocation, gated behind a verified request from an authorised approver before anything destructive runs.",
  },
  {
    icon: FolderSearch,
    title: "File recovery",
    description:
      "Locates and restores missing files across OneDrive and SharePoint, escalating to a human when standard search and restore don't find it.",
  },
  {
    icon: SearchCheck,
    title: "Access troubleshooting",
    description:
      "\"I can't access X\" gets a live diagnosis: the agent gathers user, group, and licence facts in parallel, reasons over them, and asks clarifying questions when the request is vague.",
  },
  {
    icon: Users,
    title: "Permissions & provisioning",
    description:
      "Mailbox and shared-mailbox permissions, distribution list and security group membership, and joiner-mover-leaver flows like new-starter onboarding.",
  },
  {
    icon: Ticket,
    title: "Ticket status & routing",
    description:
      "Callers get live status from your PSA without holding for an engineer, and everything else routes to the right queue with full context attached.",
  },
  {
    icon: BadgePercent,
    title: "Licence intelligence",
    description:
      "Reads each client's Microsoft 365 licence estate to surface unused and under-used seats for reclaim — a recurring saving hiding in plain sight.",
  },
  {
    icon: BellRing,
    title: "Alert summarisation",
    description:
      "NOC and RMM alert tickets arrive summarised with suggested fix steps from your runbooks, so engineers act instead of triaging.",
  },
];

const internalCapabilities = [
  {
    icon: FileText,
    title: "Bids & pre-sales",
    description:
      "Agents draft SOWs and proposals grounded in your own CRM, past proposals, and pricing history. Senior staff review instead of authoring from scratch.",
  },
  {
    icon: UserPlus,
    title: "Staff onboarding",
    description:
      "Internal joiner workflows run under staff identity — a separate trust boundary from client data — so new hires are productive on day one.",
  },
  {
    icon: ListChecks,
    title: "Ticket-queue agents",
    description:
      "Event-driven agents watch the queue, attempt resolution, run status checks, and post updates back to tickets automatically.",
  },
];

const architecture = [
  {
    icon: PhoneCall,
    title: "Omnichannel front door",
    description:
      "Amazon Connect replaces the legacy PBX as the single intake point. Voice runs on Amazon Nova Sonic speech-to-speech; chat and email converge on the same routing.",
  },
  {
    icon: Fingerprint,
    title: "Identity spine",
    description:
      "Microsoft Entra is the identity fabric across client tenants; your PSA is the system of record that maps identity to client, authorisation level, and audit trail.",
  },
  {
    icon: BrainCircuit,
    title: "Reasoning agents",
    description:
      "Claude-based agents built on the Claude Agent SDK run on Amazon Bedrock AgentCore — inside your own AWS account, grounded on your knowledge base and live PSA state.",
  },
  {
    icon: Plug,
    title: "Portable tool layer",
    description:
      "Every action flows through MCP tools on AgentCore Gateway — single-purpose functions with authorisation re-checked at execution time. Integrations plug in behind this boundary; Microsoft Graph, PSA, RMM, and documentation tools slot in without touching the agents.",
  },
  {
    icon: ClipboardList,
    title: "Audit & observability",
    description:
      "Every automated action lands on the PSA ticket, with end-to-end tracing. Deflection rate, handle time, and first-contact resolution are measured from day one.",
  },
];

const valueProps = [
  {
    title: "Deflect the repetitive majority",
    description:
      "Password resets, MFA issues, and lockouts are the bulk of L1 volume. Every contact resolved without a human returns desk capacity to work that actually needs an engineer.",
  },
  {
    title: "Engineers start with context",
    description:
      "Routed contacts arrive with verified identity, a summary, and the actions already attempted — handle times drop because nobody starts from zero.",
  },
  {
    title: "Multi-tenant by design",
    description:
      "One platform serves your whole client base. Onboarding a new client is configuration — tenant consent and mapping — not a rebuild.",
  },
  {
    title: "Your cloud, your data",
    description:
      "The entire stack runs in your own AWS account. Models don't train on your data, and workloads can be pinned to your region for residency.",
  },
];

export default function MspPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <AnimatedBackground />

      <SiteNav
        links={[
          { label: "How It Works", href: "#how-it-works" },
          { label: "Capabilities", href: "#capabilities" },
          { label: "Architecture", href: "#architecture" },
          { label: "Contact", href: "/#contact" },
        ]}
        cta="/#contact"
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-28 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
              <Headset size={16} />
              AI Automation for Managed Service Providers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Your Service Desk,
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Answered by Agents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            An AI front door for your support desk that{" "}
            <span className="text-white font-medium">verifies the caller</span>,{" "}
            <span className="text-white font-medium">
              resolves routine Microsoft 365 requests end-to-end
            </span>
            , and routes everything else to your engineers with full context —
            every action written back to your PSA as an audit trail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/#contact"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              Book a Call
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#capabilities"
              className="flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-lg hover:bg-white/5 transition-colors"
            >
              See What It Automates
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-500 pt-8 border-t border-white/10 max-w-2xl mx-auto"
          >
            Built in production for a UK Microsoft-focused MSP, replacing a
            legacy on-premises PBX with Amazon Connect and AI triage.
          </motion.p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Verify. Resolve. Route. Audit.
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every contact follows the same governed path — whether it&apos;s
              handled by an agent or a human
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                      <step.icon className="text-emerald-400" size={24} />
                    </div>
                    <span className="text-sm text-gray-500 font-mono">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                What It Automates
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The high-volume, repetitive work — resolved end-to-end, not just
              deflected to a chatbot
            </p>
          </motion.div>

          <h3 className="text-2xl font-bold mb-8 text-center text-gray-200">
            Customer service desk
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {serviceDeskCapabilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.08 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <item.icon className="text-emerald-400" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center text-gray-200">
            Internal operations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internalCapabilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <item.icon className="text-purple-400" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="relative py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                How It&apos;s Built
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Five layers, front to back — the same tool-use loop that powers
              Claude Code, running inside your own AWS on Amazon Bedrock
              AgentCore, not a third-party black box
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {architecture.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6" hover={false}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                      <layer.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {layer.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-sm mt-10 max-w-3xl mx-auto"
          >
            Model usage is tiered — fast models classify and route, stronger
            models reason over the hard cases — so cost scales with the work
            actually done, not with call volume.
          </motion.p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Why MSPs Choose This
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full">
                  <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {prop.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-sm mt-10 max-w-3xl mx-auto"
          >
            Delivery is phased and scope-gated — identity foundation first,
            then live self-service on Microsoft 365, then reasoning agents and
            internal automation. No big-bang cutover.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                See It on Your Own Desk
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Tell us about your contact volume and ticket mix, and we&apos;ll
              show you what the automation would handle — starting with a
              working demo, not a slide deck.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                Get in Touch
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="mailto:dale@grantedison.com"
                className="flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-lg hover:bg-white/5 transition-colors"
              >
                <Mail size={20} />
                dale@grantedison.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
