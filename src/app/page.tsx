"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  Smartphone,
  Globe,
  Camera,
  PenTool,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Menu,
  X,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";

export default function DayOneLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-200 selection:text-purple-900 scroll-smooth">
      {/* --- Floating Action Buttons --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/1234567890"
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <MessageSquare size={24} />
        </a>
      </div>

      {/* --- Navigation --- */}
      <header className="fixed w-full top-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-400">
              Day One
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
            >
              Work
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
            >
              Process
            </a>
            <a
              href="#contact"
              className="bg-gray-900 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Get in Touch
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4">
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-800"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-800"
            >
              Work
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-800"
            >
              Pricing
            </a>
            <a
              href="#process"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-800"
            >
              Process
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-purple-700 text-white text-center py-3 rounded-lg font-medium mt-2"
            >
              Get in Touch
            </a>
          </div>
        )}
      </header>

      {/* --- 1. Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-indigo-50/60 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold tracking-wide">
            Everything your business needs online, in one place.
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1]">
            Everything your business needs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500">
              online.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            From websites and social media to photography and brand presence — we handle
            everything. Stop juggling freelancers and start growing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#mockup"
              className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group"
            >
              Get a free mockup
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
            >
              Book a consultation
            </a>
          </div>
        </div>
      </section>

      {/* --- 2. Services Section --- */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Digital Presence
            </h2>
            <p className="text-gray-600 text-lg">
              We provide end-to-end solutions so you can focus on running your business,
              not managing digital tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Monitor}
              title="Website Development"
              desc="Fast, modern, and mobile-optimized websites designed to convert visitors into customers."
            />
            <ServiceCard
              icon={Smartphone}
              title="Social Media Management"
              desc="Strategic content creation and community management across all major platforms."
            />
            <ServiceCard
              icon={Globe}
              title="Google Presence"
              desc="Setup and optimization of Google Business profiles to ensure local customers can find you."
            />
            <ServiceCard
              icon={Camera}
              title="Photography & Editing"
              desc="Professional photo shoots and editing to make your products and team look their best."
            />
            <ServiceCard
              icon={PenTool}
              title="Brand Strategy"
              desc="Logo design, brand guidelines, and visual identity that sets you apart from the competition."
            />

            {/* Filler card to keep grid balanced */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-purple-900 mb-2">
                Need a custom solution?
              </h3>
              <p className="text-purple-700/80 mb-4">
                We offer tailored consulting and strategy.
              </p>
              <a
                href="#contact"
                className="text-purple-700 font-bold hover:underline flex items-center gap-1"
              >
                Let's talk <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Free Mockup Section (High Conversion) --- */}
      <section id="mockup" className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900 to-gray-900 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 text-purple-400 font-semibold tracking-wide mb-4">
              <LayoutTemplate size={20} />
              <span>NO RISK. NO COMMITMENT.</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              See your brand&apos;s potential before you pay a dime.
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              We know it&apos;s hard to visualize the final product. That&apos;s why we
              offer a <strong>completely free mockup</strong> of your website and brand
              style before development even begins.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-purple-900/50"
            >
              Request your free mockup
              <ArrowRight size={20} />
            </a>
          </div>
          <div className="md:w-5/12 relative aspect-square w-full max-w-md mx-auto">
            {/* Abstract floating UI element representation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-3xl rotate-6 opacity-20 blur-xl"></div>
            <div className="absolute inset-0 bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              <div className="h-12 bg-gray-900 flex items-center px-4 gap-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="w-1/3 h-6 rounded bg-gray-700 animate-pulse"></div>
                <div className="w-full h-32 rounded-lg bg-gray-700 animate-pulse"></div>
                <div className="w-2/3 h-4 rounded bg-gray-700 animate-pulse"></div>
                <div className="w-1/2 h-4 rounded bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Portfolio / Work Section --- */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Recent Work
              </h2>
              <p className="text-gray-600 text-lg">
                A glimpse into the digital experiences and visual identities we&apos;ve
                crafted for our clients.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PortfolioCard
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              category="Web Design"
              title="Corporate Redesign"
            />
            <PortfolioCard
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
              category="Social Media"
              title="Instagram Grid Curation"
            />
            <PortfolioCard
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
              category="Brand Strategy"
              title="Tech Startup Identity"
            />
            <PortfolioCard
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              category="Photography"
              title="Team Lifestyle Shoot"
            />
            <PortfolioCard
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
              category="Web Development"
              title="E-commerce Platform"
            />
            <PortfolioCard
              src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=800"
              category="Google Presence"
              title="Local SEO Optimization"
            />
          </div>
        </div>
      </section>

      {/* --- 6. How We Work (Process) --- */}
      <section id="process" className="py-24 bg-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-gray-600 text-lg">
              A simple, transparent process designed to get you online quickly and
              effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-purple-200 z-0"></div>

            <ProcessStep
              num="01"
              title="We understand your business"
              desc="We start with a consultation to learn about your goals, target audience, and unique value proposition."
            />
            <ProcessStep
              num="02"
              title="We design your presence"
              desc="From your free initial mockup to final website development and social media strategy setup."
            />
            <ProcessStep
              num="03"
              title="We launch and support"
              desc="We go live and handle the ongoing management, so your digital presence continues to grow."
            />
          </div>
        </div>
      </section>

      {/* --- 5. Pricing Section --- */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-gray-600 text-lg">
              High-quality digital services tailored to your specific needs and scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-500">from</span>
                <span className="text-4xl font-black text-gray-900">€250</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Deep-dive
                  strategy session
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Digital
                  audit
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Actionable
                  roadmap
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border-2 border-purple-600 bg-white shadow-xl shadow-purple-100 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Website Projects</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-500">starting from</span>
                <span className="text-4xl font-black text-purple-700">€250</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Custom
                  design &amp; development
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Mobile
                  responsive
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> SEO basics
                  included
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Free initial
                  mockup
                </li>
              </ul>
              <a
                href="#contact"
                className="w-full block text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Get a Quote
              </a>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Retainers</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-500">Custom pricing</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Social media
                  management
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Website
                  maintenance
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="text-purple-600 shrink-0" size={20} /> Content
                  creation
                </li>
              </ul>
              <a
                href="#contact"
                className="w-full block text-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-lg transition-colors"
              >
                Discuss Needs
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            * Final pricing depends on project scope and specific requirements. Contact us
            for an accurate estimate.
          </p>
        </div>
      </section>

      {/* --- 7. About Day One --- */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                alt="Day One Team"
                fill
                unoptimized
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-600 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">We are Day One.</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                We believe that establishing a digital presence shouldn&apos;t be complicated.
                Our philosophy is simple: provide everything a modern business needs to
                succeed online, under one roof.
              </p>
              <p>
                Whether you are starting from scratch or looking to revamp your current
                identity, we act as your dedicated digital partners. We combine design,
                strategy, and technology to build trust with your audience.
              </p>
              <p className="font-semibold text-white">Make today Day One of your digital growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. Contact Section --- */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col lg:flex-row">
            {/* Contact Info Side */}
            <div className="p-10 lg:p-12 bg-purple-700 text-white lg:w-5/12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Let&apos;s build something great.</h2>
                <p className="mb-10 text-purple-100">
                  Ready for your free mockup? Or just have a question? Drop us a message
                  and we&apos;ll get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-4 hover:text-purple-200 transition group"
                  >
                    <div className="bg-purple-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <span className="font-medium text-lg">+1 (234) 567-890</span>
                  </a>
                  <a
                    href="mailto:hello@dayone.agency"
                    className="flex items-center gap-4 hover:text-purple-200 transition group"
                  >
                    <div className="bg-purple-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <span className="font-medium text-lg">hello@dayone.agency</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-10 lg:p-12 lg:w-7/12 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Form submitted! (Connect your API)");
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition resize-none"
                    placeholder="Tell us about your project or request a free mockup..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-400">
              Day One
            </span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-500">
            <a href="#services" className="hover:text-purple-700">
              Services
            </a>
            <a href="#portfolio" className="hover:text-purple-700">
              Work
            </a>
            <a href="#pricing" className="hover:text-purple-700">
              Pricing
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Day One Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* Helper Components */

function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 group">
      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function PortfolioCard({ src, category, title }: { src: string; category: string; title: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100">
        <Image
          src={src}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-300" />
      </div>
      <p className="text-purple-600 text-sm font-bold tracking-wide uppercase mb-1">{category}</p>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-white border-4 border-purple-100 rounded-full flex items-center justify-center text-xl font-black text-purple-700 mb-6 shadow-sm">
        {num}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}
