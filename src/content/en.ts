/**
 * ALL visible text on the site, in English.
 * To add French later: copy this file to fr.ts and translate the values
 * (keep the keys on the left exactly the same).
 *
 * {name} is replaced automatically with your name from src/config/site.ts.
 */
export const en = {
  nav: {
    home: "Home",
    work: "Work",
    services: "Services",
    process: "Process",
    reviews: "Reviews",
    contact: "Contact",
    hireMe: "Hire me",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainLabel: "Main",
    mobileLabel: "Mobile menu",
  },
  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },
  common: {
    opensInNewTab: "(opens in a new tab)",
    socialLabel: "Find me online",
  },
  hero: {
    available: "Available for new projects",
    intro: "Hi, I'm {name}, a full-stack developer.",
    headline: "Websites and apps that help your business grow.",
    subtitle:
      "For two years I've been building websites, web apps and mobile apps for businesses and entrepreneurs worldwide. Clean, fast, responsive code, clear communication, and support after delivery.",
    hireOnFiverr: "Hire me on Fiverr",
    contactMe: "Contact me",
    // The presentation video's player buttons (read by screen readers).
    video: {
      label: "30-second presentation video: who I am, three sites I built, and what you get",
      play: "Play the video",
      pause: "Pause the video",
      sound: "Sound",
      captions: "Captions",
      fullscreen: "Watch full screen, with sound",
    },
    // Text that circles around the rotating badge next to the video.
    badge: "Web & app developer • Freelance • Let's build • ",
  },
  marquee: [
    "Business websites",
    "Web applications",
    "Mobile apps",
    "Bug fixing",
    "Redesigns",
    "Mobile-first design",
    "Support after launch",
  ],
  about: {
    heading: "About me",
    lead: "I'm {name}. For the past two years I've helped small businesses, startups and entrepreneurs get a professional online presence, without the headaches.",
    body: "I take your idea and turn it into something real: a clean business website, a web application, a mobile app, or a fix for a project that isn't working the way it should. I focus on results you can actually see: fast loading, a layout that looks great on phone and desktop, and an experience that's simple for your customers.",
    stackTitle: "Tools I work with",
    facts: {
      basedIn: "Based in",
      languages: "Languages",
      responseTime: "Usual reply time",
    },
  },
  benefits: {
    heading: "What you can expect",
    intro: "Two years of building apps taught me that the best results come from listening first.",
    items: [
      {
        title: "Honest advice",
        body: "If something isn't a good idea, I'll tell you, and suggest what will work better for your business.",
      },
      {
        title: "Clear communication",
        body: "Simple words, without jargon. You always know where your project stands and what comes next.",
      },
      {
        title: "Your deadline and budget, respected",
        body: "We agree on a delivery time and a fixed price before I start, and I stick to them.",
      },
      {
        title: "Support after delivery",
        body: "Not just “goodbye”: I stay available for questions and fixes after your project goes live.",
      },
    ],
  },
  faq: {
    heading: "Questions clients often ask",
    intro: "Can't find your answer? Send me a message.",
    contactLink: "Ask a question",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on what you need. After a short brief, I reply with a clear plan and a fixed price before any work starts. You can also see my packages on Fiverr.",
      },
      {
        question: "How long does it take?",
        answer:
          "It depends on the size of the project. After a short brief, you get a clear timeline together with the proposal, before any work starts. And during the project, I usually reply within 1–2 hours.",
      },
      {
        question: "Can you fix or improve my existing website?",
        answer:
          "Yes. Send me the link and a short description of the problem, and I'll tell you what I can do and what it would cost.",
      },
      {
        question: "Do I need my text and images ready?",
        answer: "It helps, but it's not required. We can start with placeholders and fill them in together as the project moves forward.",
      },
      {
        question: "What happens after delivery?",
        answer:
          "I show you how everything works and stay available for fixes and questions. Ongoing support can be added if you need it.",
      },
      {
        question: "How do I pay?",
        answer: "You can order and pay securely through Fiverr. For other options, send me a message.",
      },
    ],
  },
  services: {
    heading: "What I can build for you",
    intro: "Pick what you need. Not sure? Describe your problem and I'll suggest the right option.",
    // Read by screen readers on each service row, e.g. "Ask about Business websites".
    ask: "Ask about",
    items: [
      {
        title: "Business websites",
        body: "A fast, professional site that shows what you do and makes it easy for customers to contact you.",
      },
      {
        title: "Web applications",
        body: "Custom tools that run in the browser: booking systems, dashboards, client portals and more.",
      },
      {
        title: "Mobile apps",
        body: "Apps for iPhone and Android that put your service in your customers' pocket.",
      },
      {
        title: "Bug fixing & improvements",
        body: "Something broken or slow? I find the cause, fix it, and explain what changed.",
      },
    ],
  },
  process: {
    heading: "How I work",
    intro: "Four clear steps, so you always know what happens next.",
    stepLabel: "Step",
    steps: [
      {
        title: "Brief",
        body: "You tell me what you need, who it's for, and what you like. I ask questions until everything is clear.",
      },
      {
        title: "Proposal & price",
        body: "I reply with a clear plan, a delivery time and a fixed price. No surprises.",
      },
      {
        title: "Build with updates",
        body: "You get regular updates while I build, and you can give feedback along the way.",
      },
      {
        title: "Delivery & support",
        body: "I hand everything over clearly and stay available for questions and fixes.",
      },
    ],
  },
  featured: {
    // Small section right under the hero, with your first three projects.
    label: "Recent work",
    heading: "See what I build",
    seeAll: "See all projects",
  },
  videos: {
    // Section with the short videos (list in src/config/videos.ts).
    eyebrow: "Videos",
    heading: "Watch before you hire",
    intro: "Short, no-jargon videos about websites for small businesses: quick checks you can do yourself, and exactly how I work. Tap one to watch it with sound.",
    newBadge: "New",
    // Read by screen readers on each video.
    label: "Video: {title}",
    follow: "Follow for more on",
    scrollHint: "Swipe for more",
  },
  portfolio: {
    heading: "Selected work",
    intro: "Sites I've built for clients. Each one can be the starting point of yours.",
    // Opens the detail window (big screenshots + full description).
    viewDetails: "View details",
    liveSite: "Visit the live site",
    // Opens the contact form with "I'd like something similar to <project>" already written.
    similar: "I want something similar",
    screenshotPlaceholder: "[PROJECT SCREENSHOT]",
    // Detail window
    close: "Close",
    features: "What's inside",
    builtWith: "Built with",
    screenshots: "Screenshots",
    // e.g. "Screenshot 2 of 6"
    screenshotOf: "Screenshot {current} of {total}",
    previous: "Previous screenshot",
    next: "Next screenshot",
  },
  cta: {
    heading: "Let's build your project.",
    body: "Order through Fiverr for secure payment and a clear delivery date. Prefer to talk first? Send me a message.",
    hireOnFiverr: "Hire me on Fiverr",
    sendMessage: "Send me a message",
  },
  reviewsPage: {
    metaTitle: "Reviews",
    metaDescription: "What clients say about working with {name}, and a form to leave your own review.",
    heading: "Client reviews",
    intro: "Honest feedback from people I've worked with. Every review is read and approved by hand before it appears here.",
    listHeading: "What clients say",
    loading: "Loading reviews…",
    emptyTitle: "No reviews yet.",
    emptyBody: "Worked with me? Be the first to share how it went.",
    errorTitle: "Reviews couldn't be loaded.",
    errorBody: "Please refresh the page or try again in a few minutes.",
    // e.g. "Rated 4 out of 5"
    ratingLabel: "Rated {rating} out of 5",
    formHeading: "Leave a review",
    formIntro: "Your review appears on this page once it's approved.",
    nameLabel: "Your name",
    ratingLegend: "Your rating",
    starLabel: "{count} out of 5 stars",
    commentLabel: "Your review",
    commentHint: "What did we work on, and how did it go?",
    submit: "Send review",
    submitting: "Sending…",
    success: "Thank you! Your review will appear after approval.",
  },
  contactPage: {
    metaTitle: "Contact",
    metaDescription: "Contact {name}, freelance web & app developer: send a message, write an email or hire me on Fiverr.",
    heading: "Let's talk",
    intro: "Send me a message with your project and I'll reply with a clear plan and a fixed price. I usually answer within 1–2 hours.",
    directHeading: "Reach me directly",
    emailLabel: "Email",
    formHeading: "Send a message",
    // Optional choices above the form. Keep the keys on the left; they're used in links (e.g. /contact?type=mobile).
    projectTypeLegend: "What do you need?",
    projectTypes: {
      website: "Business website",
      webapp: "Web application",
      mobile: "Mobile app",
      fix: "Bug fixing",
      unsure: "Not sure yet",
    },
    timelineLegend: "When do you need it?",
    timelines: {
      urgent: "As soon as possible",
      month: "Within a month",
      quarter: "In 2–3 months",
      flexible: "Flexible",
    },
    optional: "optional",
    // Added at the top of the message you receive, e.g. "Project: Mobile app · Timeline: Within a month".
    projectLine: "Project",
    timelineLine: "Timeline",
    // Pre-filled message when a visitor clicks "I want something similar" on a project.
    similarMessage: "Hi {name}, I'd like something similar to {project}. ",
    nameLabel: "Your name",
    emailFieldLabel: "Your email",
    messageLabel: "Your message",
    messageHint: "A few words about your project: what it's for, and any site you like.",
    submit: "Send message",
    submitting: "Sending…",
    success: "Thanks! Your message has been sent. I'll get back to you soon.",
  },
  forms: {
    required: "required",
    // Shown after a field, e.g. "120 / 1000"
    counter: "{count} / {max}",
    cooldown: "Please wait {seconds}s before sending again.",
    sendError: "Your message couldn't be sent. Check your connection and try again in a moment.",
    errors: {
      nameRequired: "Please enter your name.",
      nameTooLong: "Name must be {max} characters or fewer.",
      ratingRequired: "Please choose a rating from 1 to 5.",
      commentRequired: "Please write a short review.",
      commentTooLong: "Review must be {max} characters or fewer.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address, like name@example.com.",
      emailTooLong: "Email must be {max} characters or fewer.",
      messageRequired: "Please write a message.",
      messageTooLong: "Message must be {max} characters or fewer.",
    },
    // Hidden anti-spam field: real visitors never see or fill it.
    honeypotLabel: "Leave this field empty",
  },
  whatsapp: {
    // Message already written when someone opens WhatsApp from the site (they can edit it before sending).
    hello: "Hi {name}, I found you on your website. I have a project: ",
    // Link under each project (the message is contactPage.similarMessage).
    ask: "Ask on WhatsApp",
  },
  consent: {
    label: "Privacy choice",
    title: "Can I count your visit?",
    body: "With your OK, I only record which pages are opened and when. No cookies, no ads, nothing that identifies you. It helps me improve the site.",
    accept: "Accept",
    decline: "No thanks",
    // Footer link that brings the banner back.
    settings: "Privacy settings",
    // Link in the banner to the privacy page.
    learnMore: "Privacy policy",
  },
  privacyPage: {
    metaTitle: "Privacy policy",
    metaDescription: "What data {name}'s website collects, why, where it is stored and how to have it deleted.",
    heading: "Privacy policy",
    intro: "Short and plain: what this site collects, why, and what you can do about it.",
    // Change this date every time you edit the policy.
    updated: "Last updated: October 31, 2026",
    contactPrefix: "Questions, or want your data deleted? Write to",
    sections: [
      {
        title: "Who is responsible",
        paragraphs: [
          "This website belongs to {name}, freelance web and app developer. I am the only person who handles the data described here.",
        ],
      },
      {
        title: "What I collect and why",
        items: [
          "Contact form: your name, your email, your message, and the project type and timeline if you pick them. I use them only to answer you and talk about your project.",
          "Review form: your name, your rating and your review. I read every review by hand. If I approve it, your name, rating and review are shown on the Reviews page.",
          "Visit counting, only if you click “Accept” in the privacy box: the address of each page you open and the time. Nothing that identifies you.",
        ],
        paragraphs: [
          "No cookies, no ads, no tracking tools. I never sell or share your data.",
        ],
      },
      {
        title: "Where it is stored",
        paragraphs: [
          "Messages, reviews and visit counts are stored in a Supabase database on servers in the European Union (Ireland).",
          "The site itself is hosted by GitHub Pages. Like any web host, GitHub may record technical data such as your IP address to keep its service secure.",
        ],
      },
      {
        title: "Saved in your browser",
        paragraphs: [
          "A few settings are kept in your browser's local storage (not cookies), and never leave your device: your light or dark theme, your answer to the privacy box, and a short waiting time after you send a form (it stops spam). You can clear them at any time in your browser settings.",
        ],
      },
      {
        title: "How long I keep it",
        paragraphs: [
          "Messages are kept as long as needed to answer you and follow up on your project. Reviews stay online as long as the site exists. Both are deleted as soon as you ask.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete your data at any time, by email. You can change your answer about visit counting whenever you want with “Privacy settings” at the bottom of every page. If you think your data is misused, you can also complain to the data protection authority of your country.",
        ],
      },
      {
        title: "Other websites",
        paragraphs: [
          "Links to Fiverr, WhatsApp, LinkedIn, Instagram, TikTok, YouTube and Facebook open their own websites, which have their own privacy policies. The videos on this page are played from this site, without any tracking.",
        ],
      },
    ],
  },
  notFound: {
    metaTitle: "Page not found",
    code: "404",
    heading: "This page doesn't exist",
    body: "The link may be broken, or the page may have moved. Let's get you back on track.",
    home: "Back to home",
    contact: "Contact me",
  },
  footer: {
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    // Link text under "WhatsApp" (your number itself is not shown).
    whatsappLink: "Send me a message",
    rights: "All rights reserved.",
    navLabel: "Footer",
    backToTop: "Back to top",
    privacy: "Privacy policy",
  },
};

export type Dictionary = typeof en;

/** Replaces {name}-style tokens in a text with real values. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
