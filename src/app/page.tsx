"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  Camera, 
  PenTool, 
  Phone, 
  Mail, 
  MessageSquare,
  Search,
  X,
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function DayOneAgencyPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Smart sticky header scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setFormStatus('idle'), 5000); // Reset button after 5s
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="relative min-h-screen text-[#222] font-inter font-normal overflow-x-hidden selection:bg-purple-200 pb-12">
      
      {/* GLOBAL SMOOTH SCROLLING INJECTION */}
      <style dangerouslySetInnerHTML={{ __html: `html { scroll-behavior: smooth; }` }} />

      {/* ========================================== */}
      {/* GLOBAL BACKGROUND (Repeating Pattern)      */}
      {/* ========================================== */}
      <div 
        className="absolute inset-0 z-[-1] bg-[url('/bg.webp')] bg-repeat bg-auto opacity-100"
      ></div>

      {/* ========================================== */}
      {/* FULL WIDTH SMART HEADER (Half Size)        */}
      {/* ========================================== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-xl border-b border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] py-1.5 md:py-2" 
            : "bg-transparent border-transparent shadow-none py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between max-w-[1200px]">
          
          {/* Logo Area (Always Visible) */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-7 h-7 group-hover:scale-105 transition-transform duration-300 ease-out">
              <Image 
                src="/logo.webp" 
                alt="Logo" 
                fill 
                unoptimized
                className="object-contain" 
              />
            </div>
          </a>

          {/* Nav & CTA Area (Visible ONLY on scroll) */}
          <div 
            className={`flex items-center transition-all duration-500 ease-out ${
              isScrolled 
                ? "opacity-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-4 mr-4">
              <a href="#services" className="text-xs font-inter font-medium text-gray-700 hover:text-purple-700 transition-colors duration-300 ease-out">Services</a>
              <a href="#work" className="text-xs font-inter font-medium text-gray-700 hover:text-purple-700 transition-colors duration-300 ease-out">Work</a>
              <a href="#contact" className="text-xs font-inter font-medium text-gray-700 hover:text-purple-700 transition-colors duration-300 ease-out">Contact</a>
            </nav>

            {/* Single Primary CTA */}
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-purple-700 to-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-poppins font-semibold text-xs shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.25)] hover:brightness-110 hover:-translate-y-[1px] transition-all duration-300 ease-out whitespace-nowrap"
            >
              Get a free mockup
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-24 lg:pt-32 flex flex-col gap-12 lg:gap-16 max-w-[1200px]">

        {/* ========================================== */}
        {/* 1. HERO SECTION                            */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[32px] md:text-5xl lg:text-[64px] font-poppins font-semibold text-[#222] leading-[1.1] mb-6 tracking-tight">
                Everything your business needs online.
              </h1>
              <p className="text-gray-700 text-lg mb-4 max-w-md leading-relaxed font-inter font-normal">
                Websites, social media, branding, and content creation — all in one place.
              </p>
              <p className="text-purple-700 font-inter font-medium text-lg mb-10 max-w-md">
                Start small. Grow when you're ready.
              </p>
              
              <div className="flex flex-col items-start gap-3">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-700 to-purple-600 text-white px-8 py-4 rounded-[12px] font-poppins font-semibold text-[16px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.25)] hover:brightness-110 hover:-translate-y-[2px] transition-all duration-300 ease-out"
                >
                  Request a free mockup
                </a>
                <p className="text-[14px] text-gray-500 font-inter font-medium pl-1 mt-1">
                  We’ll contact you to discuss your project and prepare a free preview.
                </p>
              </div>
            </div>

            {/* Right Hero Image - Shifted slightly to the right */}
            <div className="w-full lg:w-1/2 relative h-[350px] lg:h-[450px] flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-[6px] border-white/80 bg-white lg:translate-x-4">
                 <Image 
                   src="/hero.webp" 
                   alt="Digital Presence" 
                   fill
                   unoptimized
                   className="object-cover"
                 />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 2. SERVICES SECTION                        */}
        {/* ========================================== */}
        <section id="services" className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10 scroll-mt-24">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-12 text-center tracking-tight">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Monitor />} 
              title="Website Development" 
              desc="Modern, high-performance websites built to convert and grow with your business." 
            />
            <ServiceCard 
              icon={<Smartphone />} 
              title="Social Media Management" 
              desc="Strategic content and management to grow your audience and strengthen your presence." 
            />
            <ServiceCard 
              icon={<Globe />} 
              title="Google Presence" 
              desc="Optimization to improve local visibility and attract the right customers." 
            />
            <ServiceCard 
              icon={<Camera />} 
              title="Photography & Editing" 
              desc="Our in-house photographer provides professional visuals and editing tailored to your brand." 
            />
            <ServiceCard 
              icon={<PenTool />} 
              title="Brand Strategy" 
              desc="Clear positioning and brand identity built for long-term impact." 
            />
            <ServiceCard 
              icon={<Sparkles />} 
              title="Designed for Your Brand" 
              desc="We take the time to understand your business and shape every detail around your goals. The result is a polished, professional presence that feels premium and built specifically for you." 
              highlight={true}
            />
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. PORTFOLIO SECTION                       */}
        {/* ========================================== */}
        <section id="work" className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-2 tracking-tight">
              Current projects
            </h2>
            <p className="text-gray-500 font-inter font-normal text-[15px] italic">
              (showcased with the permission of the client)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Project 1 */}
            <div className="flex flex-col gap-5 group cursor-pointer" onClick={() => setModalImage('/1.webp')}>
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-gray-100 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                 <Image 
                   src="/1.webp" 
                   alt="Project 1" 
                   fill 
                   unoptimized 
                   className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/10 transition-colors duration-500 ease-out flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 ease-out" size={28} />
                 </div>
              </div>
              <div className="px-1 text-center md:text-left">
                <span className="text-[12px] font-inter font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Website
                </span>
                <h3 className="text-[18px] md:text-[20px] font-poppins font-semibold text-[#222] mb-2">
                  Project 1
                </h3>
                <p className="text-gray-600 font-inter font-normal text-[15px] leading-[1.6]">
                  A modern landing page presenting the client’s services, portfolio, and contact details, designed to showcase their work and make it easy for potential customers to get in touch.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col gap-5 group cursor-pointer" onClick={() => setModalImage('/2.webp')}>
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-gray-100 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                 <Image 
                   src="/2.webp" 
                   alt="Project 2" 
                   fill 
                   unoptimized 
                   className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/10 transition-colors duration-500 ease-out flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 ease-out" size={28} />
                 </div>
              </div>
              <div className="px-1 text-center md:text-left">
                <span className="text-[12px] font-inter font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Website & Branding
                </span>
                <h3 className="text-[18px] md:text-[20px] font-poppins font-semibold text-[#222] mb-2">
                  Project 2
                </h3>
                <p className="text-gray-600 font-inter font-normal text-[15px] leading-[1.6]">
                  A modern website presenting the client’s renovation services and completed work, combined with full social media and branding support to strengthen and elevate the business’s online presence.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* 4. HOW WE WORK SECTION                     */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-16 text-center tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gray-200 -z-10"></div>
            
            <ProcessStep num="1" title="Understand your business" desc="We discuss your goals, target audience, and current digital footprint." />
            <ProcessStep num="2" title="Design your presence" desc="We create your free mockup, followed by full development and setup." />
            <ProcessStep num="3" title="Launch and support" desc="Your business goes live, and we stay on board to manage and grow it." />
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. PRICING SECTION                         */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-12 text-center tracking-tight">
            Flexible pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 max-w-5xl mx-auto md:divide-x divide-gray-200 mb-8">
             
             <div className="flex flex-col items-center justify-start text-center px-4 md:px-8">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">Website projects</h3>
               <p className="text-gray-600 font-inter font-normal text-[15px]">Starting from <span className="font-inter font-semibold text-purple-700">€250</span></p>
             </div>
             
             <div className="flex flex-col items-center justify-start text-center px-4 md:px-8">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">Social media & branding</h3>
               <p className="text-gray-600 font-inter font-normal text-[15px]">Pricing provided after consultation</p>
             </div>

             <div className="flex flex-col items-center justify-start text-center px-4 md:px-8">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">Ongoing support / retainers</h3>
               <p className="text-gray-600 font-inter font-normal text-[15px]">Available upon request</p>
             </div>

          </div>
          
          <p className="text-[14px] font-inter font-normal text-gray-500 italic text-center">
            Every project is different. Final pricing is confirmed after a short consultation.
          </p>
        </section>

        {/* ========================================== */}
        {/* 6. ABOUT SECTION                           */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Highlighted text "pill" badge */}
            <div className="inline-flex items-center justify-center px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-100/80 to-purple-50/80 border border-purple-200/60 shadow-[0_2px_10px_rgba(109,40,217,0.05)] hover:scale-105 transition-transform duration-300 ease-out cursor-default">
              <span className="text-[13px] md:text-[14px] font-poppins font-semibold text-purple-800 tracking-wide">
                Turning ideas into real digital products.
              </span>
            </div>
            
            <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-10 tracking-tight">
              About Day One
            </h2>
            
            <div className="text-gray-700 font-inter font-normal text-[16px] md:text-[18px] leading-[1.7] space-y-6 text-left md:text-center">
              <p className="font-medium text-[#222]">
                Websites, branding, and social media — done for you.
              </p>
              <p>
                We help businesses build a professional online presence without the usual stress or high upfront costs. Whether you're starting from scratch or improving what you already have, we focus on solutions that deliver real, practical results.
              </p>
              <p>
                We don’t just design — we bring ideas to life. From rough concepts to a finished website or brand, we turn ideas into tools your business can actually use and grow with.
              </p>
              <p>
                Our approach is simple: we handle the technical and creative work, so you can focus on running your business. We aim to be a reliable, single point of contact for everything digital, starting small and scaling when you're ready.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 7. CONTACT SECTION                         */}
        {/* ========================================== */}
        <section id="contact" className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
            
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
              
              <div className="hidden lg:flex flex-col gap-6 mt-12">
                 <div className="flex items-center gap-4 group">
                   <div className="bg-purple-100 p-3.5 rounded-2xl text-purple-700 group-hover:scale-110 transition-transform duration-300 ease-out"><Phone size={20} /></div>
                   <div>
                     <p className="text-[14px] text-gray-500 font-medium mb-1">Call us</p>
                     <a href="tel:+35796254148" className="text-[18px] font-inter font-semibold text-[#222] hover:text-purple-700 transition-colors duration-300 ease-out">+357 96254148</a>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 group">
                   <div className="bg-purple-100 p-3.5 rounded-2xl text-purple-700 group-hover:scale-110 transition-transform duration-300 ease-out"><Mail size={20} /></div>
                   <div>
                     <p className="text-[14px] text-gray-500 font-medium mb-1">Email us</p>
                     <a href="mailto:hello@dayone.agency" className="text-[18px] font-inter font-semibold text-[#222] hover:text-purple-700 transition-colors duration-300 ease-out">hello@dayone.agency</a>
                   </div>
                 </div>
              </div>
            </div>

            {/* Right Side: Form & WhatsApp */}
            <div className="flex flex-col gap-6">
              
              {/* Form Card */}
              <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={formStatus === 'loading'}
                      className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[12px] focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all duration-300 ease-out disabled:opacity-50" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={formStatus === 'loading'}
                      className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[12px] focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all duration-300 ease-out disabled:opacity-50" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">Message</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      disabled={formStatus === 'loading'}
                      className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[12px] focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all duration-300 ease-out resize-none disabled:opacity-50" 
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className={`w-full text-white font-poppins font-semibold py-4 rounded-[12px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.25)] transition-all duration-300 ease-out text-[16px] mt-2 flex items-center justify-center gap-2
                      ${formStatus === 'success' ? 'bg-green-500 hover:bg-green-500' : 'bg-gradient-to-r from-purple-700 to-purple-600 hover:brightness-110 hover:-translate-y-[2px]'}
                      ${formStatus === 'error' ? 'bg-red-500 hover:bg-red-500 from-red-500 to-red-500' : ''}
                      ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed hover:-translate-y-0' : ''}
                    `}
                  >
                    {formStatus === 'idle' && 'Request a free mockup'}
                    {formStatus === 'loading' && <><Loader2 className="animate-spin" size={20} /> Sending...</>}
                    {formStatus === 'success' && <><CheckCircle2 size={20} /> Message Sent!</>}
                    {formStatus === 'error' && 'Error sending. Try again?'}
                  </button>
                  <p className="text-[14px] font-inter text-gray-500 mt-4 text-center">
                    We usually respond within 24 hours.
                  </p>
                </form>
              </div>

              {/* WhatsApp Secondary CTA */}
              <div className="text-center mt-2 lg:text-right">
                <p className="text-[14px] font-inter text-gray-500 mb-3 lg:mr-2">Or prefer quick messaging?</p>
                <a href="https://wa.me/35796254148" className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-[12px] font-poppins font-semibold shadow-[0_4px_14px_rgba(37,211,102,0.15)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:brightness-105 hover:-translate-y-[2px] transition-all duration-300 ease-out">
                  <MessageSquare size={20} />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Mobile Only Direct Contact */}
              <div className="lg:hidden flex flex-col gap-4 mt-6 border-t border-gray-200 pt-6">
                 <a href="tel:+35796254148" className="flex items-center gap-4 text-[16px] font-inter font-semibold text-[#222]">
                   <div className="bg-purple-100 p-2.5 rounded-full text-purple-700"><Phone size={18} /></div>
                   +357 96254148
                 </a>
                 <a href="mailto:hello@dayone.agency" className="flex items-center gap-4 text-[16px] font-inter font-semibold text-[#222]">
                   <div className="bg-purple-100 p-2.5 rounded-full text-purple-700"><Mail size={18} /></div>
                   hello@dayone.agency
                 </a>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SMALL FLOATING FOOTER                      */}
        {/* ========================================== */}
        <footer className="bg-white/85 backdrop-blur-xl rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/60 py-6 px-8 sm:px-12 relative z-10 text-center flex flex-col items-center max-w-fit mx-auto mt-4 mb-8 transition-transform duration-500 ease-out hover:-translate-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image 
                src="/logo.webp" 
                alt="Logo" 
                fill 
                unoptimized
                className="object-contain" 
              />
            </div>
          </div>
          <p className="text-gray-500 font-inter font-normal text-[13px] mb-1">Everything your business needs online.</p>
          <p className="text-gray-400 font-inter font-medium text-[12px] mb-4">Currently serving clients in Cyprus and Greece.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-[13px] font-inter font-semibold text-gray-700">
            <a href="mailto:hello@dayone.agency" className="hover:text-purple-700 transition-colors duration-300 ease-out">hello@dayone.agency</a>
            <a href="tel:+35796254148" className="hover:text-purple-700 transition-colors duration-300 ease-out">+357 96254148</a>
          </div>
        </footer>

      </div>

      {/* ========================================== */}
      {/* PORTFOLIO MODAL (Interaction)              */}
      {/* ========================================== */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-pointer transition-opacity duration-300 ease-out"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-[24px] overflow-hidden shadow-2xl cursor-default bg-white scale-100 transition-transform duration-300 ease-out" onClick={e => e.stopPropagation()}>
            <Image src={modalImage} alt="Portfolio Enlarge" fill unoptimized className="object-contain" />
            <button 
              className="absolute top-4 right-4 bg-gray-900/50 hover:bg-gray-900 p-2 rounded-full text-white transition-colors duration-300 ease-out"
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

function ServiceCard({ icon, title, desc, highlight = false }: { icon: React.ReactNode, title: string, desc: string, highlight?: boolean }) {
  return (
    <div className={`rounded-[20px] p-8 flex flex-col items-start transition-all duration-300 ease-out group ${
      highlight 
        ? "bg-gradient-to-br from-purple-50/90 to-[#f5f0ff]/90 border border-purple-200 shadow-[0_8px_30px_rgba(109,40,217,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_40px_rgba(109,40,217,0.22)] ring-1 ring-purple-100" 
        : "bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-[4px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
    }`}>
      <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 transition-colors duration-300 ease-out ${
        highlight
          ? "bg-gradient-to-br from-purple-600 to-purple-400 text-white shadow-inner"
          : "bg-purple-50 text-purple-700 group-hover:bg-purple-700 group-hover:text-white"
      }`}>
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 24 })}
      </div>
      <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">{title}</h3>
      <p className="text-gray-600 font-inter font-normal leading-[1.6] text-[15px]">{desc}</p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10 bg-white/50 md:bg-transparent p-6 md:p-0 rounded-[20px]">
      <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-xl font-poppins font-semibold text-purple-700 mb-6">
        {num}
      </div>
      <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-3">{title}</h3>
      <p className="text-gray-600 font-inter font-normal leading-[1.6] text-[15px] max-w-xs">{desc}</p>
    </div>
  );
}