"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  Camera, 
  PenTool, 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageSquare,
  Search,
  X
} from 'lucide-react';

// Updated Portfolio Data with Titles and Categories
const PORTFOLIO_ITEMS = [
  { 
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    title: "Corporate Redesign",
    category: "Website"
  },
  { 
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    title: "Analytics Dashboard",
    category: "Website"
  },
  { 
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    title: "Tech Startup Identity",
    category: "Branding"
  },
  { 
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    title: "Team Lifestyle Shoot",
    category: "Photography"
  },
  { 
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    title: "Product Launch Campaign",
    category: "Social Media"
  },
  { 
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
    title: "Local SEO Strategy",
    category: "Google Presence"
  }
];

export default function DayOneAgencyPage() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen text-[#222] font-sans overflow-x-hidden selection:bg-purple-200 pb-24">

      {/* ========================================== */}
      {/* GLOBAL BACKGROUND                          */}
      {/* ========================================== */}
      <div className="fixed inset-0 z-[-1]">
        <Image 
          src="/purple-bg.png" 
          alt="Day One Background"
          fill
          unoptimized
          className="object-cover object-center opacity-100" 
          priority
        />
        {/* Soft white overlay to ensure high readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>
      </div>

      {/* ========================================== */}
      {/* STICKY HEADER                              */}
      {/* ========================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between max-w-[1200px]">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 tracking-tight">
            Day One
          </div>
          <a 
            href="#mockup" 
            className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-[0_4px_14px_rgb(109,40,217,0.3)] transition-all transform hover:-translate-y-0.5"
          >
            Get a free mockup
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-32 lg:pt-40 flex flex-col gap-16 lg:gap-24 max-w-[1200px]">

        {/* ========================================== */}
        {/* 1. HERO SECTION                            */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/80 p-10 lg:p-20 relative z-10 overflow-hidden">
          {/* Subtle stronger background visual specifically for Hero */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* Left Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[40px] md:text-5xl lg:text-[64px] font-bold text-[#222] leading-[1.1] mb-6 tracking-tight">
                Everything your business needs online.
              </h1>
              <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-md leading-relaxed">
                Websites, social media, branding, and content creation — all in one place.
              </p>
              <p className="text-purple-700 font-medium text-lg md:text-xl mb-10 max-w-md">
                Start small. Grow when you're ready.
              </p>
              
              <div className="flex flex-col items-start gap-3">
                <a 
                  href="#mockup" 
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_6px_20px_rgb(109,40,217,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  Get a free mockup
                </a>
                <p className="text-sm text-gray-500 font-medium pl-2">
                  We’ll contact you to discuss your project and prepare a free preview.
                </p>
              </div>
            </div>

            {/* Right Abstract Visual */}
            <div className="w-full lg:w-1/2 relative h-[350px] lg:h-[450px] flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-purple-100 to-purple-50 blur-[2px] flex items-center justify-center border border-purple-100/50 shadow-inner">
                 <Image 
                   src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                   alt="Digital Presence" 
                   fill
                   unoptimized
                   className="object-cover rounded-full p-6 opacity-95 mix-blend-multiply"
                 />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 2. SERVICES SECTION                        */}
        {/* ========================================== */}
        {/* Subtle variation: Slightly more transparent background */}
        <section className="bg-white/70 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-white/50 p-10 lg:p-20 relative z-10">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-16 text-center tracking-tight">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard icon={<Monitor />} title="Website Development" desc="Modern, fast, and mobile-ready websites built to convert." />
            <ServiceCard icon={<Smartphone />} title="Social Media Management" desc="Engaging content and strategy to grow your audience." />
            <ServiceCard icon={<Globe />} title="Google Presence" desc="Optimize your profile so local customers can find you easily." />
            <ServiceCard icon={<Camera />} title="Photography & Editing" desc="Professional visuals that make your brand stand out." />
            <ServiceCard icon={<PenTool />} title="Brand Strategy" desc="Logo design and identity that builds trust instantly." />
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. FREE MOCKUP SECTION (Highlight)         */}
        {/* ========================================== */}
        <section id="mockup" className="bg-purple-50/95 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.05)] border border-purple-100 p-10 lg:p-24 relative z-10 overflow-hidden text-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-[32px] md:text-[44px] font-bold text-purple-900 mb-6 tracking-tight leading-tight">
              See your website before you pay.
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-12 leading-relaxed">
              We design a preview of your website and brand style so you can see exactly how it will look before development begins. No risk, no commitment.
            </p>
            <a 
              href="#contact" 
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-[0_6px_20px_rgb(109,40,217,0.35)] transition-all transform hover:-translate-y-0.5"
            >
              Request your free mockup
            </a>
          </div>
          {/* Enhanced background glows for the highlight section */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
        </section>

        {/* ========================================== */}
        {/* 4. PORTFOLIO SECTION                       */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/80 p-10 lg:p-20 relative z-10">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-16 text-center tracking-tight">
            Our Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {PORTFOLIO_ITEMS.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4 group cursor-pointer" onClick={() => setModalImage(item.src)}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_4px_14px_rgb(0,0,0,0.06)] border border-gray-100">
                   <Image 
                     src={item.src} 
                     alt={item.title} 
                     fill 
                     unoptimized 
                     className="object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-colors flex items-center justify-center">
                      <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" size={32} />
                   </div>
                </div>
                <div className="px-1">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#222]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. HOW WE WORK SECTION                     */}
        {/* ========================================== */}
        <section className="bg-white/70 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-white/50 p-10 lg:p-20 relative z-10">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-20 text-center tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-purple-200/60 -z-10"></div>
            
            <ProcessStep num="1" title="Understand your business" desc="We discuss your goals, target audience, and current digital footprint." />
            <ProcessStep num="2" title="Design your presence" desc="We create your free mockup, followed by full development and setup." />
            <ProcessStep num="3" title="Launch and support" desc="Your business goes live, and we stay on board to manage and grow it." />
          </div>
        </section>

        {/* ========================================== */}
        {/* 6. PRICING SECTION                         */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/80 p-10 lg:p-20 relative z-10 text-center">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-16 tracking-tight">
            Flexible pricing
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 mb-12 max-w-4xl mx-auto">
             <div className="text-center">
               <h3 className="text-xl font-bold text-[#222] mb-3">Website projects</h3>
               <p className="text-gray-600 text-lg">Starting from <span className="font-bold text-purple-700">€250</span></p>
             </div>
             
             <div className="hidden md:block w-px h-20 bg-gray-200"></div>
             
             <div className="text-center">
               <h3 className="text-xl font-bold text-[#222] mb-3">Consultation</h3>
               <p className="text-gray-600 text-lg">Starting from <span className="font-bold text-purple-700">€250</span></p>
             </div>

             <div className="hidden md:block w-px h-20 bg-gray-200"></div>

             <div className="text-center">
               <h3 className="text-xl font-bold text-[#222] mb-3">Monthly retainers</h3>
               <p className="text-gray-600 text-lg">Available upon request</p>
             </div>
          </div>
          
          <div className="max-w-lg mx-auto bg-gray-50/80 border border-gray-100 rounded-xl p-5">
            <p className="text-sm md:text-base text-gray-700 font-medium">
              Every project is different. Final pricing is confirmed after a short consultation.
            </p>
          </div>
        </section>

        {/* ========================================== */}
        {/* 7. ABOUT SECTION                           */}
        {/* ========================================== */}
        <section className="bg-white/70 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-white/50 p-10 lg:p-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-10 tracking-tight">
              About Day One
            </h2>
            <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6">
              <p>
                We are a dedicated team of digital creators focused on helping businesses establish a professional online presence without the usual stress or high upfront costs.
              </p>
              <p>
                Our philosophy is simple: we handle the technical and creative work—websites, branding, and social media—so you can focus entirely on running your business. Clients trust us because we act as a single, reliable point of contact for everything digital, starting small and scaling up exactly when you are ready.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 8. CONTACT SECTION                         */}
        {/* ========================================== */}
        <section id="contact" className="bg-white/85 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/80 p-10 lg:p-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-4 tracking-tight">
              Let’s talk about your project
            </h2>
            <p className="text-gray-600 text-lg">
              We usually respond within 24 hours.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 max-w-5xl mx-auto">
            
            {/* Contact Form */}
            <div className="w-full lg:w-3/5">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                  <input type="text" className="w-full border border-gray-200 bg-white p-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition shadow-[0_2px_10px_rgb(0,0,0,0.02)]" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                  <input type="email" className="w-full border border-gray-200 bg-white p-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition shadow-[0_2px_10px_rgb(0,0,0,0.02)]" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                  <textarea rows={4} className="w-full border border-gray-200 bg-white p-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition resize-none shadow-[0_2px_10px_rgb(0,0,0,0.02)]" required></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgb(109,40,217,0.3)] transition-all transform hover:-translate-y-0.5 text-base">
                  Send Message
                </button>
              </form>
            </div>

            {/* Direct Contact Info */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center gap-10 lg:pl-10 lg:border-l border-gray-200/60">
              <div className="flex items-center gap-5">
                <div className="bg-purple-100 p-4 rounded-2xl text-purple-700">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Call us</p>
                  <a href="tel:+1234567890" className="text-xl font-bold text-[#222] hover:text-purple-700 transition">+1 (234) 567-890</a>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="bg-purple-100 p-4 rounded-2xl text-purple-700">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Email us</p>
                  <a href="mailto:hello@dayone.agency" className="text-xl font-bold text-[#222] hover:text-purple-700 transition">hello@dayone.agency</a>
                </div>
              </div>

              {/* Optional WhatsApp Button */}
              <a href="https://wa.me/1234567890" className="mt-4 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_4px_14px_rgb(37,211,102,0.3)] transform hover:-translate-y-0.5">
                <MessageSquare size={20} />
                Chat on WhatsApp
              </a>
            </div>
            
          </div>
        </section>

        {/* ========================================== */}
        {/* FOOTER                                     */}
        {/* ========================================== */}
        <footer className="py-10 text-center border-t border-gray-300/40">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 tracking-tight mb-3">
            Day One
          </div>
          <p className="text-gray-600 text-sm mb-6">Everything your business needs online.</p>
          <div className="flex justify-center gap-8 text-sm font-semibold text-gray-600">
            <a href="mailto:hello@dayone.agency" className="hover:text-purple-700 transition">hello@dayone.agency</a>
            <a href="tel:+1234567890" className="hover:text-purple-700 transition">+1 (234) 567-890</a>
          </div>
        </footer>

      </div>

      {/* ========================================== */}
      {/* PORTFOLIO MODAL (Interaction)              */}
      {/* ========================================== */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-default border border-white/10" onClick={e => e.stopPropagation()}>
            <Image src={modalImage} alt="Portfolio Enlarge" fill unoptimized className="object-contain" />
            <button 
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-3 rounded-full text-white transition-colors"
              onClick={() => setModalImage(null)}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
      <div className="w-14 h-14 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-700 group-hover:text-white transition-colors duration-300 shadow-sm">
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold text-[#222] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-base">{desc}</p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10 bg-white/50 md:bg-transparent p-8 md:p-0 rounded-3xl">
      <div className="w-20 h-20 bg-white border border-gray-100 shadow-[0_4px_14px_rgb(0,0,0,0.04)] rounded-full flex items-center justify-center text-2xl font-bold text-purple-700 mb-8">
        {num}
      </div>
      <h3 className="text-xl font-bold text-[#222] mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-base max-w-xs">{desc}</p>
    </div>
  );
}