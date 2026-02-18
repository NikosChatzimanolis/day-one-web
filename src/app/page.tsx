"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  Camera, 
  PenTool, 
  Search,
  X,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);

  // Smart sticky header scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-[#222] font-inter font-normal overflow-x-hidden selection:bg-purple-200 pb-24">

      {/* ========================================== */}
      {/* GLOBAL BACKGROUND (Behind hero mostly)     */}
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
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      </div>

      {/* ========================================== */}
      {/* SMART STICKY HEADER                        */}
      {/* ========================================== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between max-w-[1200px]">
          
          {/* Logo Area */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/logo.png" 
                alt="Day One Logo" 
                fill 
                unoptimized
                className="object-contain" 
              />
            </div>
            <div className="text-xl md:text-2xl font-poppins font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-600 tracking-tight">
              Day One
            </div>
          </a>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
            <a href="#services" className="text-sm font-inter font-medium text-gray-700 hover:text-purple-700 transition-colors">Services</a>
            <a href="#work" className="text-sm font-inter font-medium text-gray-700 hover:text-purple-700 transition-colors">Work</a>
            <a href="#contact" className="text-sm font-inter font-medium text-gray-700 hover:text-purple-700 transition-colors">Contact</a>
          </nav>

          {/* Single Primary CTA Header */}
          <a 
            href="#mockup" 
            className="bg-gradient-to-r from-purple-700 to-purple-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-[10px] font-poppins font-semibold text-sm shadow-[0_2px_10px_rgba(109,40,217,0.1)] hover:shadow-[0_4px_15px_rgba(109,40,217,0.25)] hover:brightness-110 hover:-translate-y-[2px] transition-all duration-200 ease-in-out whitespace-nowrap"
          >
            Get a free mockup
          </a>
        </div>
      </header>

      {/* ========================================== */}
      {/* 1. HERO SECTION (Gradient Background)      */}
      {/* ========================================== */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-28 bg-gradient-to-br from-purple-50/90 via-white/80 to-purple-100/90">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[36px] md:text-[56px] lg:text-[64px] font-poppins font-semibold text-[#222] leading-[1.1] mb-6 tracking-tight">
                Everything your business needs online.
              </h1>
              <p className="text-gray-700 font-inter text-[18px] mb-8 max-w-lg leading-[1.6]">
                Websites, social media, branding, and content creation — all in one place. Start small. Grow when you're ready.
              </p>
              
              <div className="flex flex-col items-start gap-3">
                <a 
                  href="#mockup" 
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-700 to-purple-600 text-white px-7 py-3.5 rounded-[12px] font-poppins font-semibold text-[16px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.25)] hover:brightness-110 hover:-translate-y-[2px] transition-all duration-200 ease-in-out"
                >
                  Request a free mockup
                </a>
                <p className="text-[14px] text-gray-500 font-inter font-medium pl-1">
                  We’ll contact you to discuss your project and prepare a free preview.
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className="w-full lg:w-1/2 relative h-[350px] lg:h-[450px] flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-purple-100/50 flex items-center justify-center overflow-hidden">
                 <Image 
                   src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                   alt="Digital Presence" 
                   fill
                   unoptimized
                   className="object-cover opacity-90 p-4 rounded-full"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. SERVICES SECTION (White Background)     */}
      {/* ========================================== */}
      <section id="services" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-12 lg:mb-16 text-center tracking-tight">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <ServiceCard icon={<Monitor />} title="Website Development" desc="Modern, fast, and mobile-ready websites built to convert." />
            <ServiceCard icon={<Smartphone />} title="Social Media Management" desc="Engaging content and strategy to grow your audience." />
            <ServiceCard icon={<Globe />} title="Google Presence" desc="Optimize your profile so local customers can find you easily." />
            <ServiceCard icon={<Camera />} title="Photography & Editing" desc="Professional visuals that make your brand stand out." />
            <ServiceCard icon={<PenTool />} title="Brand Strategy" desc="Logo design and identity that builds trust instantly." />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. FREE MOCKUP SECTION (Soft Tint)         */}
      {/* ========================================== */}
      <section id="mockup" className="py-20 md:py-28 bg-[rgba(124,58,237,0.03)] border-y border-purple-50 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-[1200px] text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-purple-900 mb-6 tracking-tight">
              See your website before you pay.
            </h2>
            <p className="text-gray-700 font-inter text-[18px] mb-10 leading-[1.6]">
              We design a preview of your website and brand style so you can see exactly how it will look before development begins. No risk, no commitment.
            </p>
            <a 
              href="#contact" 
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-purple-700 to-purple-600 text-white px-8 py-4 rounded-[12px] font-poppins font-semibold text-[16px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.25)] hover:brightness-110 hover:-translate-y-[2px] transition-all duration-200 ease-in-out"
            >
              Request your free mockup
            </a>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. PORTFOLIO SECTION (White Background)    */}
      {/* ========================================== */}
      <section id="work" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-12 lg:mb-16 text-center tracking-tight">
            Our Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col gap-4 group cursor-pointer" 
                onClick={() => setModalImage(item.src)}
              >
                <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:-translate-y-1 transition-all duration-200 ease-in-out">
                   <Image 
                     src={item.src} 
                     alt={item.title} 
                     fill 
                     unoptimized 
                     className="object-cover" 
                   />
                   <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/10 transition-colors duration-200 flex items-center justify-center">
                      <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200" size={28} />
                   </div>
                </div>
                <div className="px-1">
                  <span className="text-[12px] font-inter font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-[16px] md:text-[18px] font-poppins font-semibold text-[#222]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. HOW WE WORK SECTION (Light Gray)        */}
      {/* ========================================== */}
      <section className="py-20 md:py-28 bg-[#f7f7f9]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-16 text-center tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            <ProcessStep num="1" title="Understand your business" desc="We discuss your goals, target audience, and current digital footprint." />
            <ProcessStep num="2" title="Design your presence" desc="We create your free mockup, followed by full development and setup." />
            <ProcessStep num="3" title="Launch and support" desc="Your business goes live, and we stay on board to manage and grow it." />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 6. PRICING SECTION (White Background)      */}
      {/* ========================================== */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-12 lg:mb-16 tracking-tight">
            Flexible pricing
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-8 max-w-4xl mx-auto">
             <div className="text-center">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">Website projects</h3>
               <p className="text-gray-600 font-inter text-[16px]">Starting from <span className="font-semibold text-purple-700">€250</span></p>
             </div>
             
             <div className="hidden md:block w-px h-12 bg-gray-200"></div>
             
             <div className="text-center">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">Consultation</h3>
               <p className="text-gray-600 font-inter text-[16px]">Starting from <span className="font-semibold text-purple-700">€250</span></p>
             </div>

             <div className="hidden md:block w-px h-12 bg-gray-200"></div>

             <div className="text-center">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">Monthly retainers</h3>
               <p className="text-gray-600 font-inter text-[16px]">Available upon request</p>
             </div>
          </div>
          
          <p className="text-[14px] font-inter text-gray-500 mt-8">
            Every project is different. Final pricing is confirmed after a short consultation.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* 7. ABOUT SECTION (White Background)        */}
      {/* ========================================== */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-8 tracking-tight">
              About Day One
            </h2>
            <div className="text-gray-700 font-inter text-[16px] md:text-[18px] leading-[1.6] space-y-6">
              <p>
                We are a dedicated team of digital creators focused on helping businesses establish a professional online presence without the usual stress or high upfront costs.
              </p>
              <p>
                Our philosophy is simple: we handle the technical and creative work—websites, branding, and social media—so you can focus entirely on running your business. Clients trust us because we act as a single, reliable point of contact for everything digital, starting small and scaling up exactly when you are ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. CONTACT SECTION (Light Gray)            */}
      {/* ========================================== */}
      <section id="contact" className="py-20 md:py-28 bg-[#f7f7f9] scroll-mt-20">
        <div className="container mx-auto px-6 max-w-[1200px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Side: Text & Reassurance */}
            <div>
              <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-4 tracking-tight">
                Let’s talk about your project
              </h2>
              <p className="text-gray-700 font-inter text-[16px] md:text-[18px] leading-[1.6] mb-8">
                Tell us what you need and we’ll prepare a free mockup so you can see how your website will look before anything begins.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-[#222] font-inter font-medium text-[16px]">
                  <CheckCircle2 className="text-purple-600" size={20} /> Free mockup
                </li>
                <li className="flex items-center gap-3 text-[#222] font-inter font-medium text-[16px]">
                  <CheckCircle2 className="text-purple-600" size={20} /> No obligation
                </li>
                <li className="flex items-center gap-3 text-[#222] font-inter font-medium text-[16px]">
                  <CheckCircle2 className="text-purple-600" size={20} /> Fast response
                </li>
              </ul>
              
              <div className="hidden lg:flex items-center gap-4 mt-12">
                 <div className="bg-purple-100 p-3 rounded-full text-purple-700"><Phone size={20} /></div>
                 <a href="tel:+35796254148" className="text-[16px] font-inter font-semibold text-[#222] hover:text-purple-700 transition">+357 96254148</a>
              </div>
            </div>

            {/* Right Side: Form & WhatsApp */}
            <div className="flex flex-col gap-6">
              
              {/* Form Card */}
              <div className="bg-white p-6 md:p-8 rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-gray-100">
                <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }} className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">Name</label>
                    <input type="text" className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[10px] focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">Email</label>
                    <input type="email" className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[10px] focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">Message</label>
                    <textarea rows={4} className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[10px] focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition resize-none" required></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-700 to-purple-600 text-white font-poppins font-semibold py-3.5 rounded-[12px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.25)] hover:brightness-110 hover:-translate-y-[2px] transition-all duration-200 ease-in-out text-[16px] mt-2">
                    Request a free mockup
                  </button>
                  <p className="text-[14px] font-inter text-gray-500 mt-4 text-center">
                    We usually respond within 24 hours.
                  </p>
                </form>
              </div>

              {/* WhatsApp Secondary CTA */}
              <div className="text-center mt-2 lg:text-right">
                <p className="text-[14px] font-inter text-gray-500 mb-3 lg:mr-2">Or prefer quick messaging?</p>
                <a href="https://wa.me/35796254148" className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-[12px] font-poppins font-semibold shadow-[0_4px_14px_rgba(37,211,102,0.15)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200 ease-in-out">
                  <MessageSquare size={20} />
                  Chat on WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* FOOTER                                     */}
      {/* ========================================== */}
      <footer className="py-12 bg-white text-center border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative w-7 h-7">
              <Image 
                src="/logo.png" 
                alt="Day One Logo" 
                fill 
                unoptimized
                className="object-contain" 
              />
            </div>
            <div className="text-[20px] font-poppins font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 tracking-tight">
              Day One
            </div>
          </div>
          <p className="text-gray-500 font-inter text-[14px] mb-6">Everything your business needs online.</p>
          <div className="flex justify-center gap-8 text-[14px] font-inter font-semibold text-gray-600">
            <a href="mailto:hello@dayone.agency" className="hover:text-purple-700 transition">hello@dayone.agency</a>
            <a href="tel:+35796254148" className="hover:text-purple-700 transition">+357 96254148</a>
          </div>
        </div>
      </footer>

      {/* ========================================== */}
      {/* PORTFOLIO MODAL (Interaction)              */}
      {/* ========================================== */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-[16px] overflow-hidden shadow-2xl cursor-default bg-white" onClick={e => e.stopPropagation()}>
            <Image src={modalImage} alt="Portfolio Enlarge" fill unoptimized className="object-contain" />
            <button 
              className="absolute top-4 right-4 bg-gray-900/50 hover:bg-gray-900 p-2 rounded-full text-white transition-colors duration-200"
              onClick={() => setModalImage(null)}
            >
              <X size={20} />
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
    <div className="bg-white rounded-[16px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out">
      <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-[10px] flex items-center justify-center mb-6">
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 24 })}
      </div>
      <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-3">{title}</h3>
      <p className="text-gray-600 font-inter leading-[1.6] text-[16px]">{desc}</p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] rounded-full flex items-center justify-center text-[20px] font-poppins font-bold text-purple-700 mb-6">
        {num}
      </div>
      <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-3">{title}</h3>
      <p className="text-gray-600 font-inter leading-[1.6] text-[16px] max-w-xs">{desc}</p>
    </div>
  );
}