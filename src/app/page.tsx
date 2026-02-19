"use client";

import React, { useState } from 'react';
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

/* ========================================== */
/* TRANSLATION DICTIONARY                     */
/* ========================================== */
const t = {
  en: {
    nav: { services: "Services", work: "Work", contact: "Contact" },
    hero: {
      title1: "Everything your business needs ",
      titleHighlight: "online",
      title2: ".",
      desc: "Websites, social media, branding, and content creation — all in one place.",
      sub: "Start small. Grow when you're ready.",
      cta: "Request a free mockup",
      note: "We’ll contact you to discuss your project and prepare a free preview."
    },
    services: {
      sectionTitle: "What we do",
      s1: { title: "Website Development", desc: "Modern, high-performance websites built to convert and grow with your business." },
      s2: { title: "Social Media Management", desc: "Strategic content and management to grow your audience and strengthen your presence." },
      s3: { title: "Google Presence", desc: "Optimization to improve local visibility and attract the right customers." },
      s4: { title: "Photography & Editing", desc: "Our in-house photographer provides professional visuals and editing tailored to your brand." },
      s5: { title: "Brand Strategy", desc: "Clear positioning and brand identity built for long-term impact." },
      s6: { title: "Designed for Your Brand", desc: "We take the time to understand your business and shape every detail around your goals. The result is a polished, professional presence that feels premium and built specifically for you." }
    },
    work: {
      sectionTitle: "Current projects",
      note: "(showcased with the permission of the client)",
      p1: { tag: "Website", title: "Opostofantastikes.gr", desc: "A modern landing page presenting the client’s services, portfolio, and contact details, designed to showcase their work and make it easy for potential customers to get in touch." },
      p2: { tag: "Website & Branding", title: "Idees kai Luseis", desc: "A modern website presenting the client’s renovation services and completed work, combined with full social media and branding support to strengthen and elevate the business’s online presence." }
    },
    process: {
      sectionTitle: "How it works",
      p1: { title: "Deeply understand your vision", desc: "We take the time to understand your goals, audience, positioning, and long-term vision — building a clear foundation before any work begins." },
      p2: { title: "Develop a tailored strategy", desc: "We design a structured plan and digital presence tailored specifically to your business — aligning brand, messaging, and growth objectives." },
      p3: { title: "Build, launch, and grow with you", desc: "We bring your strategy to life with precision, launch confidently, and remain available for ongoing support and optimization." }
    },
    pricing: {
      sectionTitle: "Flexible pricing",
      p1: { title: "Website projects", desc: "Starting from " },
      p2: { title: "Social media & branding", desc: "Pricing provided after consultation" },
      p3: { title: "Ongoing support / retainers", desc: "Available upon request" },
      note: "Every project is different. Final pricing is confirmed after a short consultation."
    },
    about: {
      badge: "Turning ideas into real digital products.",
      title: "About Day One",
      p1: "Websites, branding, and social media — done for you.",
      p2: "We help businesses build a professional online presence without the usual stress or high upfront costs. Whether you're starting from scratch or improving what you already have, we focus on solutions that deliver real, practical results.",
      p3: "We don’t just design — we bring ideas to life. From rough concepts to a finished website or brand, we turn ideas into tools your business can actually use and grow with.",
      p4: "Our approach is simple: we handle the technical and creative work, so you can focus on running your business. We aim to be a reliable, single point of contact for everything digital, starting small and scaling when you're ready."
    },
    contact: {
      title: "Let’s talk about your project",
      desc: "Tell us what you need and we’ll prepare a free mockup so you can see how your website will look before anything begins.",
      l1: "Free mockup",
      l2: "No obligation",
      l3: "Fast response",
      call: "Call us",
      email: "Email us",
      formName: "Name",
      formEmail: "Email",
      formMsg: "Message",
      formCTA: "Request a free mockup",
      formSending: "Sending...",
      formSuccess: "Message Sent!",
      formError: "Error sending. Try again?",
      formNote: "We usually respond within 24 hours.",
      waTitle: "Or prefer quick messaging?",
      waCTA: "Chat on WhatsApp"
    },
    footer: {
      p1: "Everything your business needs online.",
      p2: "Currently serving clients in Cyprus and Greece."
    }
  },
  el: {
    nav: { services: "Υπηρεσίες", work: "Έργα", contact: "Επικοινωνία" },
    hero: {
      title1: "Όλα όσα χρειάζεται η επιχείρησή σας ",
      titleHighlight: "online",
      title2: ".",
      desc: "Ιστοσελίδες, social media, branding και δημιουργία περιεχομένου — όλα σε ένα μέρος.",
      sub: "Ξεκινήστε έξυπνα. Αναπτυχθείτε σταδιακά.",
      cta: "Ζητήστε δωρεάν προσχέδιο",
      note: "Θα επικοινωνήσουμε μαζί σας για να συζητήσουμε το έργο σας και να ετοιμάσουμε ένα δωρεάν προσχέδιο προσαρμοσμένο στις ανάγκες της επιχείρησής σας."
    },
    services: {
      sectionTitle: "Τι κάνουμε",
      s1: { title: "Κατασκευή Ιστοσελίδων", desc: "Σύγχρονες, γρήγορες και αποδοτικές ιστοσελίδες, σχεδιασμένες να φέρνουν αποτελέσματα και να εξελίσσονται μαζί με την επιχείρησή σας." },
      s2: { title: "Διαχείριση Social Media", desc: "Στρατηγικό περιεχόμενο και διαχείριση για να αυξήσετε το κοινό σας και να ενισχύσετε την παρουσία σας." },
      s3: { title: "Παρουσία στη Google", desc: "Βελτιστοποίηση για μεγαλύτερη τοπική προβολή και προσέλκυση των σωστών πελατών." },
      s4: { title: "Φωτογράφιση & Επεξεργασία", desc: "Επαγγελματικές φωτογραφίες και επεξεργασία προσαρμοσμένες στο brand σας." },
      s5: { title: "Στρατηγική Brand", desc: "Ξεκάθαρη τοποθέτηση και ταυτότητα σχεδιασμένη για μακροχρόνια ανάπτυξη." },
      s6: { title: "Σχεδιασμένο για την επιχείρησή σας", desc: "Αφιερώνουμε χρόνο για να κατανοήσουμε την επιχείρησή σας και διαμορφώνουμε κάθε λεπτομέρεια γύρω από τους στόχους σας. Το αποτέλεσμα είναι μια προσεγμένη, επαγγελματική παρουσία, σχεδιασμένη αποκλειστικά για εσάς." }
    },
    work: {
      sectionTitle: "Τρέχοντα έργα",
      note: "(παρουσιάζονται με την άδεια του πελάτη)",
      p1: { tag: "Ιστοσελίδα", title: "Opostofantastikes.gr", desc: "Μια σύγχρονη landing page που παρουσιάζει τις υπηρεσίες, το portfolio και τα στοιχεία επικοινωνίας του πελάτη, σχεδιασμένη ώστε να αναδεικνύει τη δουλειά του και να διευκολύνει την επικοινωνία με νέους πελάτες." },
      p2: { tag: "Ιστοσελίδα & Branding", title: "Idees kai Luseis", desc: "Σύγχρονη ιστοσελίδα για υπηρεσίες ανακαινίσεων και ολοκληρωμένα έργα, σε συνδυασμό με πλήρη υποστήριξη social media και branding, με στόχο την ενίσχυση και αναβάθμιση της online παρουσίας της επιχείρησης." }
    },
    process: {
      sectionTitle: "Πώς λειτουργεί",
      p1: { title: "Κατανοούμε σε βάθος το όραμά σας", desc: "Αφιερώνουμε χρόνο για να κατανοήσουμε τους στόχους, το κοινό και τη στρατηγική σας, δημιουργώντας μια σωστή βάση πριν ξεκινήσει οποιαδήποτε εργασία." },
      p2: { title: "Αναπτύσσουμε μια εξατομικευμένη στρατηγική", desc: "Σχεδιάζουμε ένα ολοκληρωμένο πλάνο και μια ψηφιακή παρουσία προσαρμοσμένη αποκλειστικά στη δική σας επιχείρηση." },
      p3: { title: "Δημιουργούμε, λανσάρουμε και εξελισσόμαστε μαζί σας", desc: "Υλοποιούμε τη στρατηγική με ακρίβεια, προχωράμε σε λανσάρισμα με αυτοπεποίθηση και παραμένουμε δίπλα σας για συνεχή υποστήριξη και βελτιστοποίηση." }
    },
    pricing: {
      sectionTitle: "Ευέλικτη τιμολόγηση",
      p1: { title: "Κατασκευή ιστοσελίδας", desc: "Από " },
      p2: { title: "Social media & branding", desc: "Τιμή κατόπιν συνεννόησης" },
      p3: { title: "Συνεχής υποστήριξη / συνεργασίες", desc: "Διαθέσιμα κατόπιν αιτήματος" },
      note: "Κάθε έργο είναι διαφορετικό. Η τελική τιμή επιβεβαιώνεται μετά από μια σύντομη συζήτηση."
    },
    about: {
      badge: "Μετατρέπουμε ιδέες σε πραγματικά ψηφιακά προϊόντα.",
      title: "Σχετικά με το Day One",
      p1: "Ιστοσελίδες, branding και social media — αναλαμβάνονται από εμάς.",
      p2: "Βοηθάμε επιχειρήσεις να δημιουργήσουν μια επαγγελματική online παρουσία χωρίς περιττό άγχος ή υψηλό αρχικό κόστος. Είτε ξεκινάτε από την αρχή είτε αναβαθμίζετε ό,τι ήδη έχετε, εστιάζουμε σε λύσεις που φέρνουν ουσιαστικά και πρακτικά αποτελέσματα.",
      p3: "Δεν σχεδιάζουμε απλώς — δίνουμε ζωή στις ιδέες. Από ένα αρχικό concept μέχρι ένα ολοκληρωμένο website ή brand, μετατρέπουμε τις ιδέες σε εργαλεία που η επιχείρησή σας μπορεί να αξιοποιήσει και να εξελίξει.",
      p4: "Η προσέγγισή μας είναι απλή: αναλαμβάνουμε το τεχνικό και δημιουργικό κομμάτι, ώστε εσείς να επικεντρώνεστε στην ανάπτυξη της επιχείρησής σας. Στόχος μας είναι να αποτελούμε ένα αξιόπιστο, ενιαίο σημείο αναφοράς για οτιδήποτε αφορά την ψηφιακή σας παρουσία."
    },
    contact: {
      title: "Ας μιλήσουμε για το έργο σας",
      desc: "Πείτε μας τι χρειάζεστε και θα σας παρουσιάσουμε πώς μπορεί να είναι η νέα σας ψηφιακή παρουσία — πριν ξεκινήσει οτιδήποτε.",
      l1: "Δωρεάν προσχέδιο",
      l2: "Χωρίς καμία υποχρέωση",
      l3: "Γρήγορη και άμεση ανταπόκριση",
      call: "Καλέστε μας",
      email: "Στείλτε μας email",
      formName: "Όνομα",
      formEmail: "Email",
      formMsg: "Μήνυμα",
      formCTA: "Ζητήστε δωρεάν προσχέδιο",
      formSending: "Αποστολή...",
      formSuccess: "Εστάλη επιτυχώς!",
      formError: "Σφάλμα αποστολής. Δοκιμάστε ξανά;",
      formNote: "Θα επικοινωνήσουμε μαζί σας για να κατανοήσουμε τις ανάγκες σας και να ετοιμάσουμε ένα δωρεάν προσχέδιο, προσαρμοσμένο αποκλειστικά στην επιχείρησή σας. Συνήθως απαντάμε εντός 24 ωρών.",
      waTitle: "Προτιμάτε άμεση επικοινωνία;",
      waCTA: "Συνομιλήστε μαζί μας στο WhatsApp"
    },
    footer: {
      p1: "Όλα όσα χρειάζεται η επιχείρησή σας online.",
      p2: "Εξυπηρετούμε πελάτες σε Κύπρο και Ελλάδα."
    }
  }
};

export default function DayOneAgencyPage() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  
  // Language State
  const [lang, setLang] = useState<'en' | 'el'>('en');
  const txt = t[lang]; // Active translation dictionary

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
      
      {/* GLOBAL SMOOTH SCROLLING & SWOOSH ANIMATION INJECTION */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        @keyframes swooshFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-swoosh {
          animation: swooshFade 0.3s ease-out 0.2s forwards;
          opacity: 0;
        }
      ` }} />

      {/* ========================================== */}
      {/* GLOBAL BACKGROUND (Faint Diagonal Gradient)  */}
      {/* ========================================== */}
      <div className="fixed inset-0 z-[-2] bg-gradient-to-br from-[#F7F7FA] to-[#EEE9FF]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>

      {/* ========================================== */}
      {/* STATIC HEADER                              */}
      {/* ========================================== */}
      <header className="w-full pt-6 pb-2 relative z-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between max-w-[1200px]">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 md:w-10 md:h-10 group-hover:scale-105 transition-transform duration-300 ease-out">
              <img 
                src="/logo.webp" 
                alt="Day One Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </a>

          {/* Navigation & Language Switcher */}
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-5 md:gap-8">
              <a href="#services" className="text-[14px] md:text-[15px] font-inter font-medium text-gray-600 hover:text-[#3b82f6] transition-colors duration-300 ease-out">{txt.nav.services}</a>
              <a href="#work" className="text-[14px] md:text-[15px] font-inter font-medium text-gray-600 hover:text-[#3b82f6] transition-colors duration-300 ease-out">{txt.nav.work}</a>
              <a href="#contact" className="text-[14px] md:text-[15px] font-inter font-medium text-gray-600 hover:text-[#3b82f6] transition-colors duration-300 ease-out">{txt.nav.contact}</a>
            </nav>
            
            {/* Language Switch */}
            <div className="flex items-center gap-2 text-[14px] font-inter font-semibold sm:border-l sm:border-gray-300 sm:pl-6">
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors duration-200 ${lang === 'en' ? 'text-[#3b82f6]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
              <span className="text-gray-300 font-normal">/</span>
              <button 
                onClick={() => setLang('el')} 
                className={`transition-colors duration-200 ${lang === 'el' ? 'text-[#3b82f6]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EL
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-6 lg:pt-10 flex flex-col gap-12 lg:gap-16 max-w-[1200px]">

        {/* ========================================== */}
        {/* 1. HERO SECTION                            */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-[32px] md:text-5xl lg:text-[64px] font-poppins font-semibold text-[#222] leading-[1.1] mb-6 tracking-tight">
                {txt.hero.title1}
                <span className="relative inline-block">
                  {txt.hero.titleHighlight}
                  {/* Subtle Gradient Swoosh Underline */}
                  <svg 
                    className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-[10px] md:h-[14px] animate-swoosh" 
                    viewBox="0 0 200 20" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="swooshGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#9333ea" /> {/* Purple */}
                        <stop offset="100%" stopColor="#3b82f6" /> {/* Secondary Blue */}
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 4 15 Q 100 2 196 15" 
                      fill="none" 
                      stroke="url(#swooshGradient)" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </span>{txt.hero.title2}
              </h1>
              <p className="text-gray-700 text-lg mb-4 max-w-md leading-relaxed font-inter font-normal">
                {txt.hero.desc}
              </p>
              <p className="text-purple-700 font-inter font-medium text-lg mb-10 max-w-md">
                {txt.hero.sub}
              </p>
              
              <div className="flex flex-col items-start gap-3">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-700 to-purple-600 text-white px-8 py-4 rounded-[12px] font-poppins font-semibold text-[16px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.25)] hover:from-purple-600 hover:to-[#3b82f6] hover:-translate-y-[2px] transition-all duration-300 ease-out"
                >
                  {txt.hero.cta}
                </a>
                <p className="text-[14px] text-gray-500 font-inter font-medium pl-1 mt-1">
                  {txt.hero.note}
                </p>
              </div>
            </div>

            {/* Right Hero Image - INCREASED SIZE */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0 lg:pl-10">
              {/* 👇 ADDED lg:translate-x-12 TO THIS LINE 👇 */}
              <div className="relative w-full max-w-[450px] sm:max-w-[550px] lg:max-w-[650px] lg:translate-x-12">
                 <img 
                   src="/hero.webp" 
                   alt="Digital Presence" 
                   className="w-full h-auto object-contain scale-110 md:scale-125 lg:scale-[1.7] lg:origin-right transition-transform duration-500"
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
            {txt.services.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard icon={<Monitor />} title={txt.services.s1.title} desc={txt.services.s1.desc} />
            <ServiceCard icon={<Smartphone />} title={txt.services.s2.title} desc={txt.services.s2.desc} />
            <ServiceCard icon={<Globe />} title={txt.services.s3.title} desc={txt.services.s3.desc} />
            <ServiceCard icon={<Camera />} title={txt.services.s4.title} desc={txt.services.s4.desc} />
            <ServiceCard icon={<PenTool />} title={txt.services.s5.title} desc={txt.services.s5.desc} />
            <ServiceCard icon={<Sparkles />} title={txt.services.s6.title} desc={txt.services.s6.desc} highlight={true} />
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. PORTFOLIO SECTION                       */}
        {/* ========================================== */}
        <section id="work" className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-2 tracking-tight">
              {txt.work.sectionTitle}
            </h2>
            <p className="text-gray-500 font-inter font-normal text-[15px] italic">
              {txt.work.note}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Project 1 */}
            <div className="flex flex-col gap-5 group cursor-pointer" onClick={() => setModalImage('/1.webp')}>
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-gray-100 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                 <img src="/1.webp" alt="Project 1" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                 <div className="absolute inset-0 bg-[#3b82f6]/0 group-hover:bg-[#3b82f6]/10 transition-colors duration-500 ease-out flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 ease-out" size={28} />
                 </div>
              </div>
              <div className="px-1 text-center md:text-left">
                <span className="text-[12px] font-inter font-semibold text-[#3b82f6] uppercase tracking-wide block mb-2">{txt.work.p1.tag || "Website"}</span>
                <h3 className="text-[18px] md:text-[20px] font-poppins font-semibold text-[#222] mb-2 group-hover:text-[#3b82f6] transition-colors duration-300">{txt.work.p1.title}</h3>
                <p className="text-gray-600 font-inter font-normal text-[15px] leading-[1.6]">{txt.work.p1.desc}</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col gap-5 group cursor-pointer" onClick={() => setModalImage('/2.webp')}>
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-gray-100 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                 <img src="/2.webp" alt="Project 2" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                 <div className="absolute inset-0 bg-[#3b82f6]/0 group-hover:bg-[#3b82f6]/10 transition-colors duration-500 ease-out flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 ease-out" size={28} />
                 </div>
              </div>
              <div className="px-1 text-center md:text-left">
                <span className="text-[12px] font-inter font-semibold text-[#3b82f6] uppercase tracking-wide block mb-2">{txt.work.p2.tag || "Website & Branding"}</span>
                <h3 className="text-[18px] md:text-[20px] font-poppins font-semibold text-[#222] mb-2 group-hover:text-[#3b82f6] transition-colors duration-300">{txt.work.p2.title}</h3>
                <p className="text-gray-600 font-inter font-normal text-[15px] leading-[1.6]">{txt.work.p2.desc}</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* 4. HOW WE WORK SECTION                     */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-16 text-center tracking-tight">
            {txt.process.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gray-200 -z-10"></div>
            <ProcessStep num="1" title={txt.process.p1.title} desc={txt.process.p1.desc} />
            <ProcessStep num="2" title={txt.process.p2.title} desc={txt.process.p2.desc} />
            <ProcessStep num="3" title={txt.process.p3.title} desc={txt.process.p3.desc} />
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. PRICING SECTION                         */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-12 text-center tracking-tight">
            {txt.pricing.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 max-w-5xl mx-auto md:divide-x divide-gray-200 mb-8">
             <div className="flex flex-col items-center justify-start text-center px-4 md:px-8">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">{txt.pricing.p1.title}</h3>
               <p className="text-gray-600 font-inter font-normal text-[15px]">{txt.pricing.p1.desc}<span className="font-inter font-semibold text-purple-700">€250</span></p>
             </div>
             <div className="flex flex-col items-center justify-start text-center px-4 md:px-8">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">{txt.pricing.p2.title}</h3>
               <p className="text-gray-600 font-inter font-normal text-[15px]">{txt.pricing.p2.desc}</p>
             </div>
             <div className="flex flex-col items-center justify-start text-center px-4 md:px-8">
               <h3 className="text-[18px] font-poppins font-semibold text-[#222] mb-2">{txt.pricing.p3.title}</h3>
               <p className="text-gray-600 font-inter font-normal text-[15px]">{txt.pricing.p3.desc}</p>
             </div>
          </div>
          <p className="text-[14px] font-inter font-normal text-gray-500 italic text-center">
            {txt.pricing.note}
          </p>
        </section>

        {/* ========================================== */}
        {/* 6. ABOUT SECTION                           */}
        {/* ========================================== */}
        <section className="bg-white/85 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 lg:p-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-100/80 to-purple-50/80 border border-purple-200/60 shadow-[0_2px_10px_rgba(109,40,217,0.05)] hover:scale-105 transition-transform duration-300 ease-out cursor-default">
              <span className="text-[13px] md:text-[14px] font-poppins font-semibold text-purple-800 tracking-wide">
                {txt.about.badge}
              </span>
            </div>
            
            <h2 className="text-[28px] md:text-[36px] font-poppins font-semibold text-[#222] mb-10 tracking-tight">
              {txt.about.title}
            </h2>
            
            <div className="text-gray-700 font-inter font-normal text-[16px] md:text-[18px] leading-[1.7] space-y-6 text-left md:text-center">
              <p className="font-medium text-[#222]">{txt.about.p1}</p>
              <p>{txt.about.p2}</p>
              <p>{txt.about.p3}</p>
              <p>{txt.about.p4}</p>
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
                {txt.contact.title}
              </h2>
              <p className="text-gray-700 font-inter text-[16px] md:text-[18px] leading-[1.6] mb-8">
                {txt.contact.desc}
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-[#222] font-inter font-medium text-[16px]"><CheckCircle2 className="text-purple-600" size={20} /> {txt.contact.l1}</li>
                <li className="flex items-center gap-3 text-[#222] font-inter font-medium text-[16px]"><CheckCircle2 className="text-purple-600" size={20} /> {txt.contact.l2}</li>
                <li className="flex items-center gap-3 text-[#222] font-inter font-medium text-[16px]"><CheckCircle2 className="text-purple-600" size={20} /> {txt.contact.l3}</li>
              </ul>
              
              <div className="hidden lg:flex flex-col gap-6 mt-12">
                 <div className="flex items-center gap-4 group cursor-pointer">
                   <div className="bg-purple-100 p-3.5 rounded-2xl text-purple-700 group-hover:text-[#3b82f6] group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300 ease-out"><Phone size={20} /></div>
                   <div>
                     <p className="text-[14px] text-gray-500 font-medium mb-1">{txt.contact.call}</p>
                     <a href="tel:+35796254148" className="text-[18px] font-inter font-semibold text-[#222] group-hover:text-[#3b82f6] transition-colors duration-300 ease-out">+357 96254148</a>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                   <div className="bg-purple-100 p-3.5 rounded-2xl text-purple-700 group-hover:text-[#3b82f6] group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300 ease-out"><Mail size={20} /></div>
                   <div>
                     <p className="text-[14px] text-gray-500 font-medium mb-1">{txt.contact.email}</p>
                     <a href="mailto:contact@dayone-web.com" className="text-[18px] font-inter font-semibold text-[#222] group-hover:text-[#3b82f6] transition-colors duration-300 ease-out">contact@dayone-web.com</a>
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
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">{txt.contact.formName}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={formStatus === 'loading'} className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[12px] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-all duration-300 ease-out disabled:opacity-50" required />
                  </div>
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">{txt.contact.formEmail}</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={formStatus === 'loading'} className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[12px] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-all duration-300 ease-out disabled:opacity-50" required />
                  </div>
                  <div>
                    <label className="block text-[14px] font-inter font-semibold mb-2 text-gray-700">{txt.contact.formMsg}</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} disabled={formStatus === 'loading'} className="w-full font-inter border border-gray-200 bg-gray-50 p-3.5 rounded-[12px] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-all duration-300 ease-out resize-none disabled:opacity-50" required></textarea>
                  </div>
                  
                  <button type="submit" disabled={formStatus === 'loading' || formStatus === 'success'} className={`w-full text-white font-poppins font-semibold py-4 rounded-[12px] shadow-[0_4px_14px_rgba(109,40,217,0.15)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.25)] transition-all duration-300 ease-out text-[16px] mt-2 flex items-center justify-center gap-2 ${formStatus === 'success' ? 'bg-green-500 hover:bg-green-500' : 'bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-[#3b82f6] hover:-translate-y-[2px]'} ${formStatus === 'error' ? 'bg-red-500 hover:bg-red-500 from-red-500 to-red-500' : ''} ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed hover:-translate-y-0' : ''}`}>
                    {formStatus === 'idle' && txt.contact.formCTA}
                    {formStatus === 'loading' && <><Loader2 className="animate-spin" size={20} /> {txt.contact.formSending}</>}
                    {formStatus === 'success' && <><CheckCircle2 size={20} /> {txt.contact.formSuccess}</>}
                    {formStatus === 'error' && txt.contact.formError}
                  </button>
                  <p className="text-[14px] font-inter text-gray-500 mt-4 text-center">
                    {txt.contact.formNote}
                  </p>
                </form>
              </div>

              {/* WhatsApp Secondary CTA */}
              <div className="text-center mt-2 lg:text-right">
                <p className="text-[14px] font-inter text-gray-500 mb-3 lg:mr-2">{txt.contact.waTitle}</p>
                <a href="https://wa.me/35796254148" className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-[12px] font-poppins font-semibold shadow-[0_4px_14px_rgba(37,211,102,0.15)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:brightness-105 hover:-translate-y-[2px] transition-all duration-300 ease-out">
                  <MessageSquare size={20} />
                  {txt.contact.waCTA}
                </a>
              </div>

              {/* Mobile Only Direct Contact */}
              <div className="lg:hidden flex flex-col gap-4 mt-6 border-t border-gray-200 pt-6">
                 <a href="tel:+35796254148" className="flex items-center gap-4 text-[16px] font-inter font-semibold text-[#222] hover:text-[#3b82f6] transition-colors duration-300 ease-out">
                   <div className="bg-purple-100 p-2.5 rounded-full text-purple-700"><Phone size={18} /></div>
                   +357 96254148
                 </a>
                 <a href="mailto:contact@dayone-web.com" className="flex items-center gap-4 text-[16px] font-inter font-semibold text-[#222] hover:text-[#3b82f6] transition-colors duration-300 ease-out">
                   <div className="bg-purple-100 p-2.5 rounded-full text-purple-700"><Mail size={18} /></div>
                   contact@dayone-web.com
                 </a>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SMALL FLOATING FOOTER                      */}
        {/* ========================================== */}
        <footer className="bg-white/85 backdrop-blur-xl rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/60 py-8 px-8 sm:px-12 relative z-10 text-center flex flex-col items-center max-w-fit mx-auto mt-4 mb-8 transition-transform duration-500 ease-out hover:-translate-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-12 h-12 md:w-30 md:h-14">
              <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <p className="text-gray-500 font-inter font-normal text-[15px] md:text-[16px] mb-2">{txt.footer.p1}</p>
          <p className="text-gray-400 font-inter font-medium text-[14px] md:text-[15px] mb-6">{txt.footer.p2}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 text-[15px] md:text-[16px] font-inter font-semibold text-gray-700">
            <a href="mailto:contact@dayone-web.com" className="hover:text-[#3b82f6] transition-colors duration-300 ease-out">contact@dayone-web.com</a>
            <a href="tel:+35796254148" className="hover:text-[#3b82f6] transition-colors duration-300 ease-out">+357 96254148</a>
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
            <img src={modalImage} alt="Portfolio Enlarge" className="w-full h-full object-contain" />
            <button 
              className="absolute top-4 right-4 bg-gray-900/50 hover:bg-[#3b82f6] p-2 rounded-full text-white transition-colors duration-300 ease-out"
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
        ? "bg-gradient-to-br from-purple-50/90 to-[#f5f0ff]/90 border border-purple-200 shadow-[0_8px_30px_rgba(109,40,217,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] ring-1 ring-purple-100" 
        : "bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-[4px] hover:shadow-[0_12px_32px_rgba(59,130,246,0.08)]"
    }`}>
      <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 transition-all duration-300 ease-out ${
        highlight
          ? "bg-gradient-to-br from-purple-600 to-[#3b82f6] text-white shadow-inner"
          : "bg-purple-50 text-purple-700 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-[#3b82f6] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.25)]"
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