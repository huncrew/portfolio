"use client";
import { useState } from "react";

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  // Controls the mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Services, Projects, Blog Posts data...
  // (unchanged from your last version, omitted here for brevity)
  
  // Example:
  const services = [
    /* ... */
  ];
  const projects = [
    /* ... */
  ];
  const blogPosts = [
    /* ... */
  ];

  // Modal handlers
  const openProjectModal = (id: number) => setSelectedProjectId(id);
  const closeProjectModal = () => setSelectedProjectId(null);

  const openBlogModal = (id: number) => setSelectedBlogId(id);
  const closeBlogModal = () => setSelectedBlogId(null);

  return (
    <div className="bg-[#0C1B2A] text-white min-h-screen w-full flex flex-col">
      {/* HEADER */}
      <header className="w-full py-4 px-8 bg-[#0C1B2A] flex items-center justify-between">
        {/* LEFT SIDE: Could be a logo or title if desired */}
        <div className="text-xl font-semibold hidden sm:block">
          {/* If you want a brand name or logo, uncomment or customize:
             <span>My AWS Portfolio</span> 
          */}
        </div>

        {/* DESKTOP NAV: hidden on mobile */}
        <nav className="hidden sm:flex gap-6">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#portfolio" className="hover:underline">Work</a>
          <a href="#blog" className="hover:underline">Insights</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>

        {/* SOCIAL LINKS on Desktop */}
        <div className="hidden sm:flex gap-4">
          <a
            href="https://github.com/huncrew"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dalebgrant"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            LinkedIn
          </a>
        </div>

        {/* HAMBURGER (mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white focus:outline-none"
        >
          {/* Simple "Hamburger" icon, can be replaced with an SVG or react-icon */}
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </header>

      {/* MOBILE MENU OVERLAY (only visible if menuOpen = true) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col items-center gap-6 mt-8">
            <a
              href="#home"
              className="hover:underline text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#services"
              className="hover:underline text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:underline text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#blog"
              className="hover:underline text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              Insights
            </a>
            <a
              href="#contact"
              className="hover:underline text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </nav>

          {/* Social Links in Mobile Menu */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <a
              href="https://github.com/huncrew"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 text-xl"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/dalebgrant"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 text-xl"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="home" className="px-8 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Serverless AWS Architect
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Helping startups build scalable, cost-effective infrastructure with AWS CDK
            and AI-powered development. Trusted by top organizations such as WEF,
            Vodafone, and L'Oréal.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#services"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition-colors flex items-center"
            >
              <span className="mr-2">🏗️</span> View Services
            </a>
            <a
              href="#contact"
              className="border border-blue-500 text-blue-300 hover:bg-blue-900/20 py-3 px-8 rounded-full transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-8 py-16 bg-[#0F2233]">
        {/* ...same as your previous code */}
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="px-8 py-16 bg-[#0C1B2A]">
        {/* ...same as your previous code */}
      </section>

      {/* BLOG */}
      <section id="blog" className="px-8 py-16 bg-[#0F2233]">
        {/* ...same as your previous code */}
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-8 py-16 bg-[#0F2233]">
        {/* ...same as your previous code */}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0C1B2A] py-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} My Serverless & AI Portfolio. All rights reserved.
        </p>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProjectId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          {/* ...same modal code for projects */}
        </div>
      )}

      {/* BLOG MODAL */}
      {selectedBlogId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          {/* ...same modal code for blog posts */}
        </div>
      )}
    </div>
  );
}
