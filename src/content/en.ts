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
    photoAlt: "Portrait of {name}",
    photoPlaceholder: "[YOUR PHOTO]",
    // Text that circles around the rotating badge next to the photo.
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
          "[YOUR TIMEFRAME] A simple business website usually takes [X] to [Y] weeks. Web and mobile apps take longer. You get a timeline together with the proposal.",
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
  portfolio: {
    heading: "Selected work",
    intro: "A few projects I've built.",
    viewProject: "View project",
    // Labels of the mini case study under each project.
    problem: "The problem",
    built: "What I built",
    result: "The result",
    // Opens the contact form with "I'd like something similar to <project>" already written.
    similar: "I want something similar",
    screenshotPlaceholder: "[PROJECT SCREENSHOT]",
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
    rights: "All rights reserved.",
    navLabel: "Footer",
    backToTop: "Back to top",
  },
};

export type Dictionary = typeof en;

/** Replaces {name}-style tokens in a text with real values. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
