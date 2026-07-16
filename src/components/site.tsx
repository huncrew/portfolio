"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Animated background component
export const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-500" />
  </div>
);

// Glass card component
export const GlassCard = ({
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

export type NavLink = { label: string; href: string };

export const SiteNav = ({ links, cta }: { links: NavLink[]; cta: string }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Grant Edison
        </motion.a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href={cta}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get Started <ArrowRight size={16} />
        </a>
      </div>
    </motion.nav>
  );
};

export const SiteFooter = () => (
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
);
