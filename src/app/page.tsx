"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
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
  Play,
  X,
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

// Portfolio project data
const portfolioProjects = [
  {
    id: "cloudops",
    title: "CloudOps Agent Studio",
    subtitle: "Agentic AWS Infrastructure Management",
    description:
      "Multi-agent platform orchestrating Well-Architected reviews, cost optimization, and AI workflow design. Features LangGraph + Bedrock orchestration with automated Terraform generation.",
    url: "https://ai.agents.dalegrant.dev",
    gradient: "from-cyan-500 to-emerald-500",
    features: [
      "Well-Architected Advisor",
      "Cost Strategist Agent",
      "AI Workflow Designer",
      "Automated IaC Generation",
    ],
    tech: ["AWS Bedrock", "LangGraph", "Lambda", "DynamoDB", "Terraform"],
  },
  {
    id: "finance",
    title: "MLOps Finance Platform",
    subtitle: "Regulatory Compliance RAG System",
    description:
      "Enterprise RAG platform for financial document intelligence. Automated compliance monitoring against Basel III, GDPR, SOX with real-time risk scoring and natural language queries.",
    url: "https://ai.finance.dalegrant.dev",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Document Intelligence",
      "Multi-Framework Compliance",
      "Knowledge Base RAG",
      "Real-time Monitoring",
    ],
    tech: ["AWS SageMaker", "Vector Stores", "FAISS", "LlamaIndex", "S3"],
  },
  {
    id: "marketing",
    title: "AI Marketing Automation",
    subtitle: "Intelligent Campaign Orchestration",
    description:
      "End-to-end marketing automation platform with AI-driven content generation, audience segmentation, and campaign optimization using real-time analytics and predictive modeling.",
    url: "https://ai.marketing.dalegrant.dev",
    gradient: "from-orange-500 to-red-500",
    features: [
      "AI Content Generation",
      "Audience Segmentation",
      "Campaign Optimization",
      "Predictive Analytics",
    ],
    tech: ["AWS Bedrock", "EventBridge", "Lambda", "DynamoDB", "OpenAI"],
  },
  {
    id: "oasify",
    title: "Oasify",
    subtitle: "AI Builder Platform",
    description:
      "No-code AI application builder enabling rapid deployment of custom AI workflows, chatbots, and automation systems with enterprise-grade security and scalability.",
    url: "https://oasify.com",
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "No-Code AI Builder",
      "Custom Workflows",
      "Enterprise Security",
      "Rapid Deployment",
    ],
    tech: ["React", "AWS", "Serverless", "AI/ML", "Real-time"],
  },
];

// Experience timeline data
const experience = [
  {
    period: "2025 - Present",
    title: "Principal AI Systems Architect",
    company: "Self-employed",
    type: "Independent Consultant",
    highlights: [
      "Real-time media analysis pipelines (live streaming, low-latency)",
      "Live transcription & translation systems (AWS Transcribe/Translate)",
      "ML model training & fine-tuning (SageMaker, distillation)",
      "Agent-based CloudOps & security automation",
      "RAG, semantic search, vector pipelines (FAISS, LlamaIndex)",
    ],
  },
  {
    period: "2024 - 2025",
    title: "Lead AI / GenAI Architect",
    company: "ROCK",
    type: "Contract",
    highlights: [
      "AI-powered contact centre for government customers",
      "Multi-tenant, low-latency architectures",
      "Voice agents & knowledge-base assistants",
      "Model fine-tuning & pre-training",
      "Regulated, security-sensitive environments",
    ],
  },
  {
    period: "2022 - 2024",
    title: "AI Systems Architect / AWS Architect",
    company: "Chakray Consulting",
    type: "Contract",
    highlights: [
      "AI-driven serverless platforms (finance & government)",
      "RAG pipelines & semantic search systems",
      "Real-time event-driven finance systems",
      "Government contract experience",
    ],
  },
  {
    period: "2021 - 2022",
    title: "AI Solutions Architect",
    company: "World Economic Forum",
    type: "Contract",
    highlights: [
      "AI-driven workflow automation",
      "Developer productivity tooling",
      "AI-assisted coding pipelines",
      "Architecture leadership",
    ],
  },
  {
    period: "2016 - 2021",
    title: "AI / AWS Architect",
    company: "Accenture",
    type: "Full-time",
    highlights: [
      "Customer-service AI agents for L'Oréal & Vodafone",
      "Voice-based AI agents & conversational workflows",
      "Logistics systems (routing, orchestration)",
      "E-commerce automation (Shopify integrations)",
    ],
  },
];

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
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedProject = portfolioProjects.find((p) => p.id === activeProject);

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
            Dale Grant
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {["Expertise", "Portfolio", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/huncrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/dalebgrant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Let&apos;s Talk <ArrowRight size={16} />
            </a>
          </div>
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
              Available for AI & Cloud Architecture Contracts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Principal AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Systems Architect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Building{" "}
            <span className="text-white font-medium">agentic AI systems</span>,{" "}
            <span className="text-white font-medium">
              real-time ML pipelines
            </span>
            , and{" "}
            <span className="text-white font-medium">
              production-grade AWS architectures
            </span>{" "}
            for enterprise clients across customer service, logistics, and
            finance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#portfolio"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              View Portfolio
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
              Get in Touch
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
          <a href="#expertise" className="text-gray-500 hover:text-white transition-colors">
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

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-32 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Production AI platforms demonstrating agentic workflows, RAG
              systems, and real-time automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden group">
                  {/* Preview header */}
                  <div
                    className={`h-48 bg-gradient-to-br ${project.gradient} p-6 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/80">{project.subtitle}</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setActiveProject(project.id);
                          setShowProjectModal(true);
                        }}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                      >
                        <Play size={16} />
                      </button>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">{project.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-gray-500 bg-slate-800/50 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A decade of building AI and cloud systems for global enterprises
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

            {experience.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-slate-950 border-2 border-cyan-400 rounded-full z-10" />

                {/* Content */}
                <div
                  className={`flex-1 pl-8 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-cyan-400 text-sm font-medium">
                        {exp.period}
                      </span>
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-gray-400 mb-4">{exp.company}</p>
                    <ul
                      className={`space-y-2 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-sm text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-cyan-400 mt-1 flex-shrink-0">
                            •
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / What I Do Section */}
      <section className="relative py-32 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                How I Can Help
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From architecture design to production deployment
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
                Let&apos;s Build Something
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Looking for an AI architect to design and deliver your next
              production system? Let&apos;s discuss how I can help transform
              your vision into reality.
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
                  href="mailto:dale@dalegrant.dev"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  dale@dalegrant.dev
                </a>
                <a
                  href="https://linkedin.com/in/dalebgrant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/huncrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                  GitHub
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dale Grant. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/huncrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/dalebgrant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Project Modal with iframe preview */}
      <AnimatePresence>
        {showProjectModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowProjectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-[80vh] bg-slate-900 rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-sm border-b border-white/10 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Open Live Site
                  </a>
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* iframe preview */}
              <div className="pt-20 h-full">
                <iframe
                  src={selectedProject.url}
                  className="w-full h-full border-0"
                  title={selectedProject.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
