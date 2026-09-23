// ── lib/copy/en.ts ──
// English source dictionary for every string introduced by the 2026-09
// redesign (homepage, /partner, /products, /astrala, contact intent, About
// team block, Work stubs, nav, footer, CTA band). `el.ts` and `ru.ts` mirror
// this shape exactly (`satisfies Copy`), so a missing translation is a type
// error. Copy rules: no em-dashes, product and company names untranslated
// (Day One, CY-Construction, Astrala Advisory, Astrala Nexus).

export const en = {
  meta: {
    home: {
      title: 'Day One | Build, scale, maintain. One continuous relationship.',
      description:
        'We become your engineering team, or the team behind your agency. And we build products of our own. A small senior engineering team based in Cyprus, working globally.',
    },
    partner: {
      title: 'Partner with us',
      description:
        'Embedded development teams, white-label engineering for agencies and dev shops, referral and revenue-share partnerships, monthly retainers. A small senior engineering team in Cyprus.',
    },
    products: {
      title: 'Products',
      description:
        'Ready software we license and support: CY-Construction, an attendance and leave platform, and a document signing service. Built, maintained and improved by the same team.',
    },
    cyConstruction: {
      title: 'CY-Construction',
      description:
        'Construction operations software. Project managers see every site in under a minute. Workers see their tasks in under a minute. Web and mobile, in English, Greek and Bulgarian.',
    },
    attendance: {
      title: 'Attendance and leave platform',
      description:
        'Location and office Wi-Fi validated clock-ins, leave balances and manager reports. Installs as a phone app.',
    },
    documentSigning: {
      title: 'Document signing service',
      description:
        'Legally timestamped e-signatures, embeddable in any workflow. Generated from your templates, verified, and delivered onward.',
    },
    astrala: {
      title: 'Astrala Advisory partnership',
      description:
        'Day One engineers the Astrala Advisory recruitment SaaS platform and white-label deployments for their clients. Security and GDPR built in.',
    },
  },

  nav: {
    partner: 'Partner',
    products: 'Products',
    work: 'Work',
    astrala: 'Astrala',
    security: 'Security',
    about: 'About',
    contact: 'Contact',
    bookCall: 'Book a call',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    home: 'Day One, home',
  },

  footer: {
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    location: 'Cyprus',
    privacy: 'Privacy',
    copyright: '© {year} Day One Web Studio',
    tagline: 'Built for what’s next.',
  },

  cta: {
    line1: 'Build, scale, maintain.',
    line2: 'Let’s start with a call.',
    timeline: { build: 'Build', scale: 'Scale', maintain: 'Maintain' },
    bookCall: 'Book a call',
    enquiry: 'Or send a project enquiry',
  },

  common: {
    learnMore: 'Learn more',
    requestDemo: 'Request a demo',
    viewLive: 'View live',
  },

  home: {
    hero: {
      eyebrow: 'A technical partner',
      title1: 'Build, scale, maintain.',
      title2: 'One continuous relationship.',
      sub: 'We become your engineering team, or the team behind your agency. And we build products of our own.',
      cta: 'Book a call',
      secondary: 'See our work',
      note: 'A small senior engineering team. Based in Cyprus. Working globally.',
    },
    twoWays: {
      eyebrow: 'Two ways to work with us',
      partner: {
        title: 'Partner with us',
        lines: [
          'Embedded development teams.',
          'White-label engineering for agencies and dev shops.',
          'Referral and revenue-share partnerships.',
          'Monthly retainers.',
        ],
        link: 'Learn more',
      },
      products: {
        title: 'Our products',
        lines: [
          'Ready software we license and support.',
          'Built, maintained and improved by the same team.',
        ],
        link: 'Learn more',
      },
    },
    products: {
      eyebrow: 'Products',
      title: 'Software that does the work.',
      learnMore: 'Learn more',
    },
    strategic: {
      eyebrow: 'Strategic partner',
      title: 'In partnership with Astrala Advisory.',
      sub: 'We engineer their recruitment SaaS platform and white-label deployments for their clients.',
      chips: ['Security & GDPR built in', 'Cyber Essentials certified'],
      tagline: 'Talent builds tomorrow',
      visit: 'Visit astralaadvisory.eu.com',
    },
    selectedWork: {
      eyebrow: 'Selected work',
      featured: {
        name: 'Astrala Nexus',
        kind: 'Recruitment SaaS',
        body: 'A recruitment platform engineered for Astrala Advisory, with white-label deployments for their clients.',
        link: 'Explore the project',
      },
      strip: [
        { name: 'CY-Construction', kind: 'Construction operations' },
        { name: 'Forex platform & CRM', kind: 'Confidential client' },
        { name: 'Delbeteris transfers', kind: 'Transfers' },
        { name: 'Taxi Xanthi', kind: 'Transportation' },
        { name: 'Sun Seals Divers', kind: 'Diving' },
      ],
    },
    howWeWork: {
      eyebrow: 'How we work',
      items: [
        'Custom builds, no templates.',
        'Same team from day one.',
        'No handoff.',
        'We stay after launch.',
      ],
    },
    securityBar: {
      title: 'Security & GDPR review',
      body: 'A two-week technical review for teams handling customer, financial or health data.',
      link: 'See the security review',
    },
  },

  products: {
    index: {
      eyebrow: 'Products',
      title: 'Software that does the work.',
      lead: 'Ready software we license and support. Built, maintained and improved by the same team that builds for our partners.',
    },
    common: {
      featuresTitle: 'What it does',
      whoForTitle: 'Who it is for',
      demoEyebrow: 'Demo',
      demoTitle: 'See it in action.',
      demoBody: 'A short walkthrough, then a plain conversation about whether it fits how you work.',
      requestDemo: 'Request a demo',
    },
    cyConstruction: {
      name: 'CY-Construction',
      tagline:
        'Project managers see every site in under a minute. Workers see their tasks in under a minute.',
      meta: 'Web + mobile · English, Greek, Bulgarian',
      lead: 'Construction operations software for companies running several sites at once. One place for projects, stages, tasks, daily reports, safety, materials and finance, with a phone-first view for the people on site.',
      features: [
        {
          title: 'Every site on one timeline',
          body: 'One row per active project with a health signal and the reason behind it. Delays show as delays, not as a green tick.',
        },
        {
          title: 'Tasks that reach the site',
          body: 'Workers open their phone and see their day. Site managers assign, reschedule and close tasks from the same place.',
        },
        {
          title: 'Daily reports, safety and issues',
          body: 'Daily site reports, a quick safety report from a phone, and a defects list, all tied to the project they belong to.',
        },
        {
          title: 'Materials and finance',
          body: 'Central stock, budgets, expenses, change orders and invoices, so the numbers live next to the work.',
        },
        {
          title: 'Roles, not user types',
          body: 'Owners, admins, project managers, site managers, workers and clients each see exactly what they can act on.',
        },
      ],
      whoFor: [
        'Construction companies running several sites at once',
        'Project managers who want the portfolio view without chasing calls',
        'Site teams who need their tasks on a phone, in their language',
      ],
    },
    attendance: {
      name: 'Attendance and leave platform',
      tagline: 'Location and office Wi-Fi validated clock-ins. Leave balances and manager reports.',
      meta: 'Installs as a phone app.',
      lead: 'Attendance for offices that need a reliable record without a terminal at the door. Staff clock in from their phone, only when they are actually at the office.',
      features: [
        {
          title: 'Validated clock-ins',
          body: 'A clock-in counts only when the phone is inside the office location or on the office Wi-Fi. No badge, no terminal.',
        },
        {
          title: 'Who is in, right now',
          body: 'Managers see the live picture of the office and can correct entries, with every change kept in an audit trail.',
        },
        {
          title: 'Leave, handled',
          body: 'Requests, approvals and running balances in the same place as attendance.',
        },
        {
          title: 'Monthly reports',
          body: 'Exports for payroll and management at the end of each month.',
        },
        {
          title: 'Privacy by design',
          body: 'Location is read only at the moment of the tap, never tracked in the background, and kept only as long as needed.',
        },
      ],
      whoFor: [
        'Offices and practices with staff who work on site',
        'Managers who currently reconcile attendance by hand',
        'Teams that want a phone app without an app store rollout',
      ],
    },
    documentSigning: {
      name: 'Document signing service',
      tagline: 'Legally timestamped e-signatures, embeddable in any workflow.',
      meta: '',
      lead: 'A signing service your own software calls. Documents are generated from your templates, sent for signature, verified and stored with their evidence, and passed on to the systems that need them.',
      features: [
        {
          title: 'Generated from your templates',
          body: 'Documents are rendered from your own templates with the data your system already holds.',
        },
        {
          title: 'Signed in the browser',
          body: 'Signers confirm their identity and sign in the browser. The signature is stamped onto the document itself.',
        },
        {
          title: 'Timestamped and verifiable',
          body: 'Every signed document is timestamped and checksum-verified, with the evidence kept alongside it.',
        },
        {
          title: 'Embedded in your workflow',
          body: 'An API and webhooks, so signing happens inside your product or process, not in a separate tool.',
        },
        {
          title: 'Onward to your systems',
          body: 'Signed documents flow on to the people and systems that need them.',
        },
      ],
      whoFor: [
        'Products that need signatures inside their own flow',
        'Operations teams replacing paper and email sign-offs',
        'Businesses that need a legally timestamped record of who signed what, and when',
      ],
    },
  },

  partner: {
    hero: {
      eyebrow: 'Partner',
      title: 'Your engineering team. Or the team behind yours.',
      lead: 'Four ways to work with Day One. Pick the one that fits, or start with a call and we will tell you which one we would choose for you.',
    },
    modelsEyebrow: 'Partnership models',
    models: [
      {
        title: 'Embedded team',
        line1: 'A monthly retainer. Your backlog, our engineers.',
        line2: 'We join your team with a fixed monthly capacity and work your backlog in your tools, with the same people every month.',
      },
      {
        title: 'White-label',
        line1: 'We build under your brand. You own the client.',
        line2: 'Overflow builds and features for agencies and dev shops, delivered under your name. We never contact your clients.',
      },
      {
        title: 'Referral',
        line1: '12% for an introduction, 20% for a closed deal.',
        line2: 'Paid on invoiced revenue.',
      },
      {
        title: 'Revenue share',
        line1: 'For products we co-build.',
        line2: 'We build and maintain the product together with you, and share in the revenue it earns.',
      },
    ],
    stepsEyebrow: 'How an engagement starts',
    steps: [
      { title: 'Call', body: 'Thirty minutes on what you need and whether we are the right fit.' },
      { title: 'Scope', body: 'A written scope, a team and a monthly figure. No surprises later.' },
      {
        title: 'Pilot month',
        body: 'One month of real work at the agreed rate. You judge the code, the communication and the speed.',
      },
      { title: 'Retainer', body: 'Ongoing capacity, the same people, month after month.' },
    ],
    rule: {
      eyebrow: 'The rule we never break',
      title: 'We never contact your clients.',
      body: 'Not during the project, not after. NDA is standard on every engagement, and every deliverable ships under your brand. Your client relationship is the asset, and it stays yours.',
    },
    process: {
      eyebrow: 'How working with us feels',
      title: 'Pull requests, not zip files.',
      body: 'We work inside your process, your project management tool, your repositories, your review flow. We communicate daily in writing and are available for standups when it matters. Based in Cyprus, EET, one hour ahead of CET, so collaboration happens same-day, not overnight.',
    },
    stackEyebrow: 'Stack',
    stack: ['TypeScript', 'Next.js', 'React Native', 'Python', 'PostgreSQL / Supabase', 'Azure', 'Vercel'],
    ctaLine2: 'Let’s find the model that fits.',
  },

  astrala: {
    hero: {
      eyebrow: 'Strategic partner',
      title: 'In partnership with Astrala Advisory.',
      lead: 'We engineer their recruitment SaaS platform and white-label deployments for their clients.',
    },
    build: {
      eyebrow: 'What we build for them',
      title: 'Astrala Nexus',
      body: 'A recruitment platform engineered for Astrala Advisory. Built and maintained by the same Day One team, from the first release onward.',
    },
    whiteLabel: {
      eyebrow: 'White-label deployments',
      title: 'Their platform, under their clients’ brands.',
      body: 'Astrala offers the platform to its own clients as a white-label deployment. Each deployment runs on the same engineering base, delivered and supported by Day One.',
    },
    security: {
      eyebrow: 'Security posture',
      title: 'Security & GDPR built in.',
      body: 'Security and GDPR are built in from the start rather than reviewed at the end.',
      chips: ['Security & GDPR built in', 'Cyber Essentials certified'],
    },
    referral: {
      eyebrow: 'Referral structure',
      title: 'Introductions are rewarded.',
      body: 'Partners who introduce companies to Day One earn 12% of invoiced revenue for an introduction and 20% for a closed deal.',
      link: 'See the partnership models',
    },
    visit: 'Visit astralaadvisory.eu.com',
    ctaLine2: 'Let’s talk about your platform.',
  },

  contact: {
    intentLabel: 'What is this about?',
    intents: {
      partnership: 'Partnership',
      demo: 'Product demo',
      project: 'Project',
      security: 'Security review',
    },
  },

  about: {
    team: {
      eyebrow: 'Team',
      title: 'The people you will work with.',
      founderName: '{{FOUNDER_NAME}}',
      founderRole: 'Lead Developer',
    },
  },

  work: {
    more: {
      eyebrow: 'More work',
      title: 'Also built by Day One.',
      note: 'Details on request.',
      seeProduct: 'See the product',
    },
    stubs: [
      { name: 'CY-Construction', kind: 'Construction operations' },
      { name: 'Forex platform & CRM', kind: 'Confidential client' },
      { name: 'Taxi Xanthi', kind: 'Transportation' },
      { name: 'Sun Seals Divers', kind: 'Diving' },
    ],
  },
}

export type Copy = typeof en
export type ProductCopy = Copy['products']['cyConstruction']
