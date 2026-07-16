"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  ChevronDown,
  Cpu,
  Workflow,
  Database,
  Cloud,
  Bot,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
} from "lucide-react";

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-500" />
  </div>
);

// Floating particles
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
        initial={{
          x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
        }}
        animate={{
          y: [null, -20, 20],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Glass card component
const GlassCard = ({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <motion.div
    whileHover={hover ? { scale: 1.02, y: -4 } : {}}
    className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// Client logos (using text for now, can be replaced with actual logos)
const clients = [
  { name: "Formula 1", abbrev: "F1" },
  { name: "Vodafone", abbrev: "Vodafone" },
  { name: "L'Oréal", abbrev: "L'Oréal" },
  { name: "World Economic Forum", abbrev: "WEF" },
  { name: "Accenture", abbrev: "Accenture" },
  { name: "UK Government", abbrev: "Gov.UK" },
];

// Expertise areas
const expertise = [
  {
    icon: Bot,
    title: "Agentic AI Systems",
    description:
      "Multi-agent orchestration with LangGraph, Bedrock, and custom frameworks for autonomous decision-making",
  },
  {
    icon: Workflow,
    title: "Real-time Pipelines",
    description:
      "Low-latency streaming, live transcription/translation, and event-driven architectures at scale",
  },
  {
    icon: Database,
    title: "RAG & Vector Search",
    description:
      "Semantic search, knowledge bases, and retrieval-augmented generation with FAISS, LlamaIndex",
  },
  {
    icon: Cloud,
    title: "AWS Architecture",
    description:
      "Serverless, event-driven systems using Lambda, Bedrock, SageMaker, Connect, and CDK",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Security-first design for regulated industries, government contracts, and compliance requirements",
  },
  {
    icon: Zap,
    title: "ML Operations",
    description:
      "Model training, fine-tuning, distillation, and production deployment with SageMaker",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Particles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Grant Edison
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Expertise", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started <ArrowRight size={16} />
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
              <Cpu size={16} />
              AI Systems Architecture & Development
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Enterprise AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              That Delivers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We build{" "}
            <span className="text-white font-medium">agentic AI systems</span>,{" "}
            <span className="text-white font-medium">
              real-time ML pipelines
            </span>
            , and{" "}
            <span className="text-white font-medium">
              production-grade cloud architectures
            </span>{" "}
            for enterprises that need AI to work, not just exist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#services"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Our Services
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-lg hover:bg-white/5 transition-colors"
            >
              <Mail size={20} />
              Book a Call
            </a>
          </motion.div>

          {/* Client logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-white/10"
          >
            <p className="text-sm text-gray-500 mb-6">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <span className="text-lg font-semibold tracking-wide">
                    {client.abbrev}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="text-gray-500 hover:text-white transition-colors">
            <ChevronDown size={32} className="animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Technical Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialized in building AI-powered systems that operate at
              enterprise scale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <item.icon className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                What We Build
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Production AI systems that transform how your business operates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "Agentic AI Development",
                description:
                  "Design and build multi-agent systems using LangGraph, Bedrock, and custom orchestration frameworks. From autonomous customer service to CloudOps automation.",
                cta: "Build AI Agents",
              },
              {
                icon: MessageSquare,
                title: "Contact Centre AI",
                description:
                  "Enterprise voice agents, real-time transcription, sentiment analysis, and knowledge-base integration using AWS Connect, Lex, and Bedrock.",
                cta: "Modernize Support",
              },
              {
                icon: BarChart3,
                title: "RAG & Analytics",
                description:
                  "Semantic search, document intelligence, and retrieval-augmented generation systems for finance, compliance, and enterprise knowledge management.",
                cta: "Unlock Your Data",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-6">
                    <service.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {service.cta} <ArrowRight size={16} />
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Let&apos;s Build Together
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to transform your business with production-grade AI?
              Tell us about your project and let&apos;s explore what&apos;s possible.
            </p>

            <GlassCard className="p-8 md:p-12 max-w-2xl mx-auto" hover={false}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company / Project"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="mailto:dale@grantedison.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  dale@grantedison.com
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Grant Edison
            </span>
            <span className="text-gray-500 text-sm">| AI Systems Architecture</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Grant Edison Ltd. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
