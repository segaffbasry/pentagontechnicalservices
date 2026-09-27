/* All homepage copy, taken verbatim from https://www.pentagontechnicalservices.com/ (September 2026).
   Every link leaves for the real page on the live site; nothing here routes inside the demo. */

export const LIVE = "https://www.pentagontechnicalservices.com";
const u = (path: string) => `${LIVE}${path}`;

export const contact = {
  phone: "0800 669 6804",
  phoneHref: "tel:08006696804",
  email: "info@pentagontechnicalservices.com",
  linkedin: "https://www.linkedin.com/company/pentagon-technical-services",
  contactPage: u("/contact-us/"),
};

/* Main menu, in the live order. Sub-items are the live dropdowns (Projects and Case Studies are long,
   so the header lists their index pages and the footer carries the featured entries). */
export const nav = [
  { label: "About us", href: u("/about-us/") },
  { label: "Partners", href: u("/partners/") },
  { label: "News", href: u("/news/") },
  { label: "Services", href: u("/services/") },
  { label: "Projects", href: u("/projects/") },
  { label: "Case Studies", href: u("/case-studies/") },
  { label: "Vacancies", href: u("/vacancies/") },
];

export const sister = { label: "Filmtek Data Solutions", href: "https://www.filmtekdatasolutions.com/" };

export const hero = {
  title: "Global Critical Infrastructure Specialists",
  lead: "Global construction consultancy delivering high-performance project teams across mission-critical environments.",
  cta: { label: "Explore more projects", href: u("/projects") },
  /* The live hero also carries a "Project & Construction Management" box that repeats the first pillar below,
     so it is merged into that pillar (see README, Decisions). */
};

export const intro = {
  label: "What we do",
  statement: "We deliver specialist project teams supporting mission-critical facilities from early decision-making through construction, commissioning and handover.",
  body: "Our teams are embedded on site for the duration of delivery, providing continuity, accountability and certainty.",
  stat: { value: 300, suffix: "+", unit: "MW", text: "To date Pentagon Technical Services has supported clients to achieve a total of 300+ MW’s in delivered IT capacity." },
  cta: { label: "More about us", href: u("/about-us/") },
};

/* The four "landing links" cards. Technical Fit Out has an empty href on the live site, so it points at the
   Services index (see README, Decisions). */
export const pillars = [
  {
    title: "Project & Construction Management",
    body: "We provide embedded leadership and governance to manage complex projects from mobilisation through completion, ensuring safe delivery, programme certainty, and quality assurance across all disciplines.",
    href: u("/projects/"),
    image: "/media/banner.webp",
    alt: "Curved glass and steel facade seen from below",
  },
  {
    title: "Cost & Commercial Management",
    body: "We protect commercial outcomes through disciplined cost control, procurement strategy, and contract management, giving clients clarity and confidence from feasibility to close-out.",
    href: u("/cost-and-commercial-management/"),
    image: "/media/glass-tower.webp",
    alt: "Glass office towers",
  },
  {
    title: "Commissioning & Validation Management",
    body: "We ensure critical systems are tested, verified, and operationally ready, managing the commissioning process through to successful handover and live performance.",
    href: u("/commissioning/"),
    image: "/media/hall-corridor.webp",
    alt: "Lit corridor between server racks in a data hall",
  },
  {
    title: "Technical Fit Out",
    body: "We coordinate technical fit-out delivery in mission-critical environments, integrating white space systems with construction and commissioning requirements to support seamless operational readiness.",
    href: u("/services/"),
    image: "/media/hall-window.webp",
    alt: "Data hall with daylight at the end of the aisle",
  },
];

/* The Services dropdown, in the live order. */
export const services = {
  title: "Services",
  cta: { label: "All services", href: u("/services/") },
  items: [
    { label: "Pre-Contract & Construction Services", href: u("/pre-contract-construction-services/"), image: "/media/banner.webp" },
    { label: "Project Management", href: u("/project-management/"), image: "/media/glass-tower.webp" },
    { label: "Construction Management", href: u("/construction-management/"), image: "/media/canopy.webp" },
    { label: "Cost and Commercial Management", href: u("/cost-and-commercial-management/"), image: "/media/facade.webp" },
    { label: "HSE Site Management Services", href: u("/hse-site-management-services/"), image: "/media/hall-aisle.webp" },
    { label: "Technical Advisor Service", href: u("/technical-advisor-service/"), image: "/media/hall-blue.webp" },
    { label: "Commissioning", href: u("/commissioning/"), image: "/media/hall-corridor.webp" },
  ],
};

export const safeHands = ["Your Critical", "Infrastructure is in Safe", "Hands"];

/* The three featured projects on the live homepage, with their live images. */
export const projects = {
  title: "Projects",
  body: "Our business is dedicated to providing a full range of services solely dedicated to the business critical and technical environments.",
  cta: { label: "Explore more projects", href: u("/projects") },
  items: [
    { place: "Frankfurt, Germany", title: "Frankfurt 6 – Project Management & Construction Management Services", href: u("/projects/frankfurt-6-project-management-construction-management-services/"), image: "/media/glass-tower.webp" },
    { place: "Zurich", title: "Zurich 1 – Project Management & Construction Management Services", href: u("/projects/zurich-1/"), image: "/media/hall-blue.webp" },
    { place: "Berlin", title: "Berlin 4 – Project Management & Construction Management Services", href: u("/projects/berlin-4/"), image: "/media/hall-colour.webp" },
  ],
  /* Every project in the live Projects menu, for the index strip under the cards. */
  all: [
    ["London 1", "/projects/london-1-project-management-construction-management-services/"],
    ["Amsterdam 1", "/projects/amsterdam-1/"],
    ["Zurich 1", "/projects/zurich-1/"],
    ["Frankfurt 1", "/projects/frankfurt-1/"],
    ["Frankfurt 2", "/projects/frankfurt-2-project-management-construction-management-services/"],
    ["Frankfurt 3", "/projects/frankfurt-3-project-management-construction-management-services/"],
    ["Frankfurt 4", "/projects/frankfurt-4-project-management-construction-management-services/"],
    ["Frankfurt 5", "/projects/frankfurt-5-project-management-construction-management-services/"],
    ["Frankfurt 6", "/projects/frankfurt-6-project-management-construction-management-services/"],
    ["Frankfurt 7", "/projects/frankfurt-7-project-management-construction-management-services/"],
    ["Frankfurt 8", "/projects/frankfurt-6-project-management-construction-management-services-3/"],
    ["Berlin 1", "/projects/berlin-1/"],
    ["Berlin 2", "/projects/berlin-2/"],
    ["Berlin 3", "/projects/berlin-3/"],
    ["Berlin 4", "/projects/berlin-4/"],
    ["Berlin 5", "/projects/berlin5-white-space-fit-out/"],
    ["City Centre Mall", "/projects/city-centre-mall/"],
    ["The Opus", "/projects/the-opus/"],
    ["Marsa Al Seef", "/projects/marsa-al-seef/"],
    ["Neighbourhood One Residences", "/projects/neighbourhood-one-residences/"],
    ["Four Seasons Hotel", "/projects/four-seasons-hotel/"],
    ["Gate Village 11", "/projects/gate-village-11/"],
  ].map(([label, path]) => ({ label, href: u(path) })),
};

export const accreditations = {
  title: "Accreditations & Certifications",
  image: "/media/accreditations.webp",
  alt: "ISO 14001:2015, ISO 9001:2015 and ISO 45001:2018 (Peers Quality Assurance, UKAS 9940); CHAS Standard and CHAS Elite; Constructionline Bronze, Silver and Gold; Carbon Footprint Standard CO2e Assessed Organisation",
  note: "*ISO Certifications scope cover UK Head office only.",
};

export const values = {
  statement: "At Pentagon, we are building a positive, sustainable business that contributes towards our community by creating environmental and social value, as well as contributing to the societies in which we work.",
  points: [
    "For over 15 years Pentagon have built a reputation as an international construction specialist with a focus on mission critical buildings.",
    "From a Contractor background with a focus on professional services and continuous improvement.",
    "Proven track record in excellence with international experience specialising in high-specification, design and build, data centre, residential, commercial, retail and hospitality projects.",
    "Hand-picked senior management team with extensive local and international experience.",
    "Innovative technology solutions driving project labour and cost savings including value engineering and off-site delivery strategies.",
    "Mission critical experts in the field of MEP services including digital engineering and testing and commissioning services.",
    "Global experience in leadership and delivery of services across Europe, Asia and the Middle East.",
  ],
};

export const news = {
  label: "News",
  all: { label: "All news", href: u("/news/") },
  featured: {
    title: "PTS Expands into the USA",
    date: "Sep 22, 2025",
    href: u("/pts-expands-into-the-usa/"),
    image: "/media/news-usa.webp",
    body: [
      "Pentagon Technical Services is proud to announce the opening of its first United States office, a landmark move in the company’s growth strategy. This expansion strengthens PTS’s global presence and brings its mission-critical infrastructure capabilities closer to U.S. clients.",
      "With the new U.S. office PTS can accelerate service delivery, reduce response times and offer stronger local engagement for clients in America. The full range of PTS services – including PMC, QA/QC, commissioning, cost & commercial and CSA will now be available with local oversight and enhanced responsiveness.",
    ],
    cta: "More details",
  },
  items: [
    { title: "Recruiting now!", date: "Aug 26, 2025", href: u("/recruiting-now/"), image: "/media/news-recruiting.webp" },
    { title: "ISO Accreditations", date: "Jul 23, 2025", href: u("/iso-accreditations/"), image: "/media/news-accreditations.webp" },
    { title: "Datacloud Global Congress 2025", date: "May 17, 2025", href: u("/datacloud-global-congress-2025/"), image: "/media/news-datacloud.webp" },
    { title: "Mission-Ready Talent: How PTS is Training and Deploying the Future Workforce", date: "Feb 27, 2025", href: u("/mission-ready-talent-how-pts-is-training-and-deploying-the-future-workforce/"), image: "/media/news-talent.webp" },
  ],
};

/* Footer offices, verbatim. `city` is only used for the hero ticker and the footer index. */
export const offices = [
  { city: "Beaconsfield", entity: "Pentagon Technical Services Ltd", address: "McBride House, Penn Road, Beaconsfield, Buckinghamshire, HP9 2FY" },
  { city: "Berlin", entity: "Pentagon Technical Services GmbH", address: "Knesebeckstr. 62/63, Berlin, 10719" },
  { city: "Zurich", entity: "Pentagon Technical Services GmbH", address: "Talstrasse 20, 8001 Zurich" },
  { city: "Dubai", entity: "Perimeter Technical Services LLC", address: "Jafza Freezone, Dubai, UAE" },
  { city: "Jakarta", entity: "", address: "Lantai 11 Unit A, Jl. Jend. Sudirman No. Kav 86. Karet Tengsin Tanah Abang, Jakarta Pusat, DKI Jakarta" },
  { city: "Bergen", entity: "Pentagon Technical Services GmbH", address: "C/O Advokatfirmaet Magnus Legal AS Postboks 904, Sentrum 5808 Bergen" },
  { city: "Amsterdam", entity: "Pentagon Technical Services GmbH", address: "Rokin 92 -96, 1012 KX Amsterdam" },
  { city: "Landelies", entity: "Pentagon Technical Services GmbH", address: "Rue des Mulets 13 6111 Montigny-le-Tilleul (Landelies)" },
  { city: "Helsinki", entity: "Pentagon Technical Services GmbH", address: "Suomen Sivuliike Urho Kekkosen katu 4-6 E 00100 Helsinki" },
  { city: "Lisbon", entity: "Pentagon Technical Services GmbH", address: "Av. Da Republica no 50 2 1050-196 Lisboa" },
  { city: "Singapore", entity: "Pentagon Technical Services Ltd", address: "20 Collyer Quay, Singapore" },
  { city: "Rome", entity: "Pentagon Technical Services GmbH, Italia", address: "Via Antonio Beroloni, 44 ROMA 00197" },
  { city: "Stockholm", entity: "Pentagon Technical Services LLC", address: "Birger Jarlsgatan 12 114 34, Stockholm" },
  { city: "Delaware", entity: "Pentagon Technical Services Ltd", address: "254 Chapman Rd, Ste 208 #24759, Newark Delaware 19702" },
  { city: "Vienna", entity: "Pentagon Technical Services GmbH", address: "Jordangasse 7/12, 1010 Vienna, Austria" },
];

export const footer = {
  title: "Let’s talk",
  explore: [
    { label: "Home", href: `${LIVE}/` },
    ...nav,
    { label: "Graduate Scheme", href: u("/graduate-scheme/") },
  ],
  legal: [
    { label: "Modern Slavery", href: u("/modern-slavery/") },
    { label: "Privacy Policy", href: u("/privacy-policy/") },
  ],
  copyright: "© Copyright 2026 Pentagon Technical Services",
};
