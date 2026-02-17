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
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageSquare,
  Search,
  X
} from 'lucide-react';

const PORTFOLIO_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
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
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-12 lg:pt-20 flex flex-col gap-12 lg:gap-16 max-w-[1200px]">

        {/* ========================================== */}
        {/* HEADER / NAVIGATION                        */}
        {/* ========================================== */}
        <header className="flex items-center justify-between px-2 mb-4">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 tracking-tight">
            Day One
          </div>
          <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-purple-700 transition-colors hidden md:block">
            Let's Talk
          </a>
        </header>

        {/* ========================================== */}
        {/* 1. HERO SECTION                            */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[32px] md:text-5xl lg:text-[64px] font-bold text-[#222] leading-[1.1] mb-6 tracking-tight">
                Everything your business needs online.
              </h1>
              <p className="text-gray-700 text-lg mb-4 max-w-md leading-relaxed">
                Websites, social media, branding, and content creation — all in one place.
              </p>
              <p className="text-purple-700 font-medium text-lg mb-10 max-w-md">
                Start small. Grow when you're ready.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#mockup" className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_4px_14px_rgb(109,40,217,0.3)] transition-all transform hover:-translate-y-0.5">
                  Get a free mockup
                </a>
                <a href="#contact" className="w-full sm:w-auto text-center bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-sm">
                  Book a consultation
                </a>
              </div>
            </div>

            {/* Right Abstract Visual */}
            <div className="w-full lg:w-1/2 relative h-[350px] lg:h-[450px] flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-purple-100 to-purple-50 blur-sm flex items-center justify-center border border-purple-100/50 shadow-inner">
                 <Image 
                   src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                   alt="Digital Presence" 
                   fill
                   unoptimized
                   className="object-cover rounded-full p-8 opacity-90 mix-blend-multiply"
                 />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 2. SERVICES SECTION                        */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#222] mb-12 text-center tracking-tight">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <section id="mockup" className="bg-purple-50/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100 p-8 lg:p-16 relative z-10 overflow-hidden text-center">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-[28px] md:text-[36px] font-bold text-purple-900 mb-6 tracking-tight">
              See your website before you pay.
            </h2>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              We design a preview of your website and brand style so you can see exactly how it will look before development begins. No risk, no commitment.
            </p>
            <a href="#contact" className="inline-block w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-10 py-4 rounded-xl font-bold text-base shadow-[0_4px_14px_rgb(109,40,217,0.4)] transition-all transform hover:-translate-y-0.5">
              Request your free mockup
            </a>
          </div>
          {/* Subtle background glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </section>

        {/* ========================================== */}
        {/* 4. PORTFOLIO SECTION                       */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#222] mb-12 text-center tracking-tight">
            Our Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PORTFOLIO_IMAGES.map((src, idx) => (
              <div 
                key={idx} 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                onClick={() => setModalImage(src)}
              >
                 <Image src={src} alt={`Portfolio ${idx + 1}`} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-colors flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" size={32} />
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. HOW WE WORK SECTION                     */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#222] mb-16 text-center tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gray-200 -z-10"></div>
            
            <ProcessStep num="1" title="Understand your business" desc="We discuss your goals, target audience, and current digital footprint." />
            <ProcessStep num="2" title="Design your presence" desc="We create your free mockup, followed by full development and setup." />
            <ProcessStep num="3" title="Launch and support" desc="Your business goes live, and we stay on board to manage and grow it." />
          </div>
        </section>

        {/* ========================================== */}
        {/* 6. PRICING SECTION                         */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10 text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#222] mb-12 tracking-tight">
            Flexible pricing
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-8 max-w-3xl mx-auto">
             <div className="text-center">
               <h3 className="text-lg font-bold text-[#222] mb-2">Website projects</h3>
               <p className="text-gray-600">Starting from <span className="font-bold text-purple-700">€250</span></p>
             </div>
             
             <div className="hidden md:block w-px h-16 bg-gray-200"></div>
             
             <div className="text-center">
               <h3 className="text-lg font-bold text-[#222] mb-2">Consultation</h3>
               <p className="text-gray-600">Starting from <span className="font-bold text-purple-700">€250</span></p>
             </div>

             <div className="hidden md:block w-px h-16 bg-gray-200"></div>

             <div className="text-center">
               <h3 className="text-lg font-bold text-[#222] mb-2">Monthly retainers</h3>
               <p className="text-gray-600">Available upon request</p>
             </div>
          </div>
          
          <p className="text-sm text-gray-500 italic mt-8">
            * Final pricing depends on specific project scope and requirements.
          </p>
        </section>

        {/* ========================================== */}
        {/* 7. ABOUT SECTION                           */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#222] mb-8 tracking-tight">
              About Day One
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed space-y-6">
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
        <section id="contact" className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#222] mb-12 text-center tracking-tight">
            Let’s talk about your project
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
            
            {/* Contact Form */}
            <div className="w-full lg:w-3/5">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                  <input type="text" className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition shadow-sm" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                  <input type="email" className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition shadow-sm" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                  <textarea rows={4} className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition resize-none shadow-sm" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgb(109,40,217,0.3)] transition-colors text-base">
                  Send Message
                </button>
              </form>
            </div>

            {/* Direct Contact Info */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center gap-8 lg:pl-8 lg:border-l border-gray-200">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3.5 rounded-2xl text-purple-700">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Call us</p>
                  <a href="tel:+1234567890" className="text-lg font-bold text-[#222] hover:text-purple-700 transition">+1 (234) 567-890</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3.5 rounded-2xl text-purple-700">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email us</p>
                  <a href="mailto:hello@dayone.agency" className="text-lg font-bold text-[#222] hover:text-purple-700 transition">hello@dayone.agency</a>
                </div>
              </div>

              {/* Optional WhatsApp Button */}
              <a href="https://wa.me/1234567890" className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-bold transition-colors shadow-sm">
                <MessageSquare size={20} />
                Chat on WhatsApp
              </a>
            </div>
            
          </div>
        </section>

        {/* ========================================== */}
        {/* FOOTER                                     */}
        {/* ========================================== */}
        <footer className="py-8 text-center border-t border-gray-300/50">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 tracking-tight mb-2">
            Day One
          </div>
          <p className="text-gray-600 text-sm mb-4">Everything your business needs online.</p>
          <div className="flex justify-center gap-6 text-sm font-medium text-gray-500">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-default" onClick={e => e.stopPropagation()}>
            <Image src={modalImage} alt="Portfolio Enlarge" fill unoptimized className="object-contain" />
            <button 
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full text-white transition-colors"
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
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] transition-all duration-300 group">
      <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-700 group-hover:text-white transition-colors duration-300">
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 24 })}
      </div>
      <h3 className="text-lg font-bold text-[#222] mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10 bg-white/50 md:bg-transparent p-6 md:p-0 rounded-2xl">
      <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-xl font-bold text-purple-700 mb-6">
        {num}
      </div>
      <h3 className="text-lg font-bold text-[#222] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm max-w-xs">{desc}</p>
    </div>
  );
}