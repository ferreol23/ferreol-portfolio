/**
 * Projects shown on the home page: the first three in "Recent work" (under the hero),
 * all of them in "Selected work". Clicking a project opens its detail window
 * (big screenshots + the full description).
 *
 * Real work only. Screenshots go in /public/projects/<slug>/ (desktop ones in 1600×1000).
 */
export type ProjectImage = {
  src: string;
  /** What the screenshot shows, for screen readers and search engines. */
  alt: string;
  /** true for a phone screenshot (tall): shown whole, centered. */
  mobile?: boolean;
};

export type Project = {
  /** Short id, also the name of the screenshots folder. Lowercase, no spaces. */
  slug: string;
  title: string;
  /** Small label above the title, e.g. "Online shop · Fashion". */
  category: string;
  /** One or two sentences, shown on the project cards. */
  description: string;
  /** The longer story, one paragraph per line, shown in the detail window. */
  details: string[];
  /** What the site can do, shown as a list in the detail window. */
  features: string[];
  tags: string[];
  /** Live site. Leave "" to hide the link. */
  link: string;
  /** Screenshots; the FIRST one is the cover. */
  images: ProjectImage[];
  /** Honest note about sample content (template version, AI images…). Leave "" to hide. */
  note: string;
};

export const projects: Project[] = [
  {
    slug: "monteur-video",
    title: "Video Editor Portfolio",
    category: "Portfolio site · Video editing",
    description:
      "A cinematic one-page portfolio I built for a video editor friend: projects, showreel, services and a clear way to get hired.",
    details: [
      "I designed and built this site for a friend who works as a freelance video editor. He needed more than a list of links: a place that feels like his work, where potential clients understand his style in a few seconds and know exactly how to hire him.",
      "The page opens like a film, with a recording timecode, a huge title and a spinning “Watch the reel” badge. Then it walks visitors through his projects, his services, his way of working and the questions clients usually ask before booking.",
      "Are you a video editor, a photographer, a motion designer or another creative? Take a look at the live site. If you like it, we can build yours together, with your own work, colors and words.",
    ],
    features: [
      "Animated intro with a live recording timecode",
      "Project list that switches between list and grid views, with a preview on hover",
      "Showreel section with a chapter-by-chapter breakdown",
      "Services, a 4-step process and an FAQ, so clients get answers before they write",
      "Designed for every screen, from large monitors to phones",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://ferreol23.github.io/portfolio-monteur-video/",
    images: [
      {
        src: "/projects/monteur-video/hero.webp",
        alt: "Home screen: the name Alex Mercier in huge letters over a blurred orange and teal background, with a spinning “Watch the reel” badge.",
      },
      {
        src: "/projects/monteur-video/travaux.webp",
        alt: "Projects list with category, role and year, and a preview appearing on hover.",
      },
      {
        src: "/projects/monteur-video/services.webp",
        alt: "Services section: editing, color grading, motion design and sound.",
      },
      {
        src: "/projects/monteur-video/methode.webp",
        alt: "“How we work together” section with four steps: brief, sorting the footage, editing, delivery.",
      },
      {
        src: "/projects/monteur-video/faq.webp",
        alt: "Frequently asked questions and a scrolling “Available for new projects” banner.",
      },
      {
        src: "/projects/monteur-video/mobile.webp",
        alt: "The home screen on a phone.",
        mobile: true,
      },
    ],
    note: "Template version: the name, projects and testimonials are sample content, ready to be replaced.",
  },
  {
    slug: "laiterie-douce",
    title: "La Laiterie Douce",
    category: "Online shop · Food",
    description:
      "An online shop for a small artisan yogurt maker: browse the flavors, fill a cart pot by pot and order in a few taps.",
    details: [
      "I built this shop for a friend who makes farm-style yogurts in small batches. The goal was simple: let customers see every flavor, build their order pot by pot and send it without friction, with delivery or pick-up.",
      "At the client's request, her real shop isn't shown here: what you see is a template version of it. The layout, the cart and the filters work exactly like on the real shop.",
      "Do you sell food, drinks or handmade products? This shop can be adapted to your products, your prices and your colors.",
    ],
    features: [
      "Product catalog with filters by category (classics, fruit, Greek, plant-based…)",
      "Cart drawer with quantities, totals and a free-delivery progress bar",
      "Gift box section to highlight a special offer",
      "The making process told in three simple steps",
      "Sticky cart bar on phones, FAQ and WhatsApp contact",
      "Smooth animations (GSAP)",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    link: "https://ferreol23.github.io/la-laiterie-douce-ferreol_portfolio/",
    images: [
      {
        src: "/projects/laiterie-douce/hero.webp",
        alt: "Home screen: “Le yaourt, comme à la ferme.” next to glass jars of yogurt with fruit pieces.",
      },
      {
        src: "/projects/laiterie-douce/yaourts.webp",
        alt: "Yogurt catalog with category filters, prices and “Add” buttons.",
      },
      {
        src: "/projects/laiterie-douce/cart.webp",
        alt: "Open cart showing two yogurts, quantities, delivery cost, total and a free-delivery progress bar.",
      },
      {
        src: "/projects/laiterie-douce/coffret.webp",
        alt: "Discovery gift box: six jars in a wooden crate, with its price and an “Add” button.",
      },
      {
        src: "/projects/laiterie-douce/fabrication.webp",
        alt: "“From the farm to the jar” section with a photo of milk being poured.",
      },
      {
        src: "/projects/laiterie-douce/mobile.webp",
        alt: "The shop's home screen on a phone.",
        mobile: true,
      },
    ],
    note: "Template version: the brand, testimonials and product photos (AI-generated) are placeholders.",
  },
  {
    slug: "maison-atelier",
    title: "Maison Atelier",
    category: "Online shop · Fashion",
    description:
      "A fashion e-shop with an editorial look: new arrivals, a filterable collection of 34 pieces, wishlist and cart.",
    details: [
      "I built this clothing shop for a friend launching her own brand. The brief was a Parisian, magazine-like look, with black and white photography, elegant type and lots of space, without making shopping any harder.",
      "At the client's request, her real shop isn't shown here: what you see is a template version of it, with the same features as the real shop.",
      "Launching a clothing, shoes or accessories brand? This shop can become yours, with your collection, your prices and your style.",
    ],
    features: [
      "Full-screen editorial home page and a short brand manifesto",
      "New arrivals carousel with “quick add” buttons",
      "Collection of 34 items with category filters and sorting by price or name",
      "Wishlist, search and cart",
      "Sale badges and color swatches on every product",
      "Newsletter sign-up and size advice on WhatsApp",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    link: "https://ferreol23.github.io/maison-atelier-boutique/",
    images: [
      {
        src: "/projects/maison-atelier/hero.webp",
        alt: "Home screen: black and white photo of a woman in a trench coat on a Paris street, titled “L'allure parisienne”.",
      },
      {
        src: "/projects/maison-atelier/collection.webp",
        alt: "The collection: category filters, sorting menu, 34 items with prices, sale badges and color swatches.",
      },
      {
        src: "/projects/maison-atelier/news.webp",
        alt: "New arrivals carousel with a trench coat, shirts and a sweater, and a “quick add” button.",
      },
      {
        src: "/projects/maison-atelier/manifesto.webp",
        alt: "Brand manifesto in an elegant serif font above a row of photos.",
      },
      {
        src: "/projects/maison-atelier/footer.webp",
        alt: "Newsletter sign-up and footer with the Maison Atelier logo in large letters.",
      },
      {
        src: "/projects/maison-atelier/mobile.webp",
        alt: "The shop's home screen on a phone.",
        mobile: true,
      },
    ],
    note: "Template version: the brand and products are fictional; photos are AI-generated or from Unsplash.",
  },
];
