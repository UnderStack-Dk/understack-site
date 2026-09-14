import { localizeText } from "./localization";

export const SITE_URL = "https://understack.dk";
export const CONTACT_EMAIL = "dev.team@understack.dk";
export const GENERAL_EMAIL = "info@understack.dk";
export const COMPANY_CVR = "46327608";
export const GASTROAPP_URL = "https://gastroapp.dk";
export const SOCIAL_IMAGE_PATH = "/og-image.jpg";
export const SOCIAL_IMAGE_URL = `${SITE_URL}${SOCIAL_IMAGE_PATH}`;

export type Language = "dk" | "en" | "se" | "de";
export type PageKind = "home" | "service" | "case" | "caseIndex" | "portfolio" | "archive" | "insight" | "insightIndex" | "apps" | "marketplace" | "forYou";

export type SeoPage = {
  lang: Language;
  slug: string;
  /** Shared identifier for translated pages whose URLs use different slugs. */
  translationKey?: string;
  kind: PageKind;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  sections: { title: string; body: string; items?: string[]; variant?: "process" | "techStack" }[];
  faqs?: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  cta: string;
  keywords: string[];
};

export type PortfolioProject = {
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  status?: string;
  location?: string;
  cta?: {
    label: string;
    href: string;
  };
  localized?: Partial<Record<Language, Partial<Omit<PortfolioProject, "name" | "cta" | "localized">> & { cta?: PortfolioProject["cta"] }>>;
};

export const languageNames: Record<Language, string> = {
  dk: "Dansk",
  en: "English",
  se: "Svenska",
  de: "Deutsch",
};

export const languageTags: Record<Language, string> = {
  dk: "da-DK",
  en: "en",
  se: "sv-SE",
  de: "de-DE",
};

export const futureLanguages = ["/no/", "/nl/"];

function translationKeyFor(page: SeoPage) {
  return page.translationKey ?? `${page.kind}:${page.slug}`;
}

export function pagePath(page: SeoPage) {
  if (page.slug === "") {
    return `/${page.lang}/`;
  }

  return `/${page.lang}/${page.slug}`;
}

export function pageAlternates(page: SeoPage) {
  const pageKey = translationKeyFor(page);
  const localizedPages = (["dk", "en", "se", "de"] as Language[])
    .map((lang) => allPages.find((item) => item.lang === lang && translationKeyFor(item) === pageKey))
    .filter((item): item is SeoPage => Boolean(item));

  const alternates = localizedPages.map((item) => ({
    hrefLang: languageTags[item.lang],
    href: pagePath(item),
  }));
  const defaultPage = localizedPages.find((item) => item.lang === "dk");

  return defaultPage ? [...alternates, { hrefLang: "x-default", href: pagePath(defaultPage) }] : alternates;
}

const dkServiceSections = {
  process: {
    title: "Sådan arbejder vi",
    body:
      "Vi starter med forretningsmål, brugere og arbejdsgange, før vi designer løsningen. Derefter bygger vi i korte, synlige iterationer med fokus på performance, struktur, sikkerhed og enkel drift.",
    items: ["Strategi og scope", "UX og teknisk arkitektur", "Frontend, backend og integrationer", "QA, launch og løbende forbedring"],
    variant: "process" as const,
  },
  stack: {
    title: "Teknologi og leverance",
    body:
      "UnderStack bygger webplatforme og softwareprodukter med React, TypeScript, Node.js og API-integrationer. Stacken vælges efter løsningens krav.",
    variant: "techStack" as const,
  },
};

const enServiceSections = {
  process: {
    title: "How we work",
    body:
      "We define business goals, users and operational workflows before implementation. Delivery runs in focused iterations with clear architecture, strong UX, maintainable code and launch-ready quality.",
    items: ["Strategy and scope", "UX and technical architecture", "Frontend, backend and integrations", "QA, launch and improvement"],
    variant: "process" as const,
  },
  stack: {
    title: "Technology and delivery",
    body:
      "UnderStack builds web platforms and software systems with React, TypeScript, Node.js and API integrations. The stack follows the requirements of the product.",
    variant: "techStack" as const,
  },
};

export const pages: SeoPage[] = [
  {
    lang: "dk",
    slug: "",
    kind: "home",
    title: "UnderStack | Softwareudvikling og webudvikling i Aarhus",
    description:
      "UnderStack er et uafhængigt softwarestudio i Aarhus, der designer og udvikler websites, SaaS-produkter og custom software til virksomheder i Danmark.",
    h1: "Software, websites og digitale produkter bygget i Aarhus.",
    eyebrow: "Uafhængigt softwarestudio · Aarhus",
    intro:
      "UnderStack designer og udvikler websites, SaaS-produkter og custom software til virksomheder i Danmark og resten af Europa.",
    sections: [
      {
        title: "Det vi bygger",
        body:
          "Websites, custom business software og AI-assisterede arbejdsgange bygget med React, TypeScript og moderne webteknologi. Kodebasen for dette site er selv offentlig på GitHub, så du kan se kvaliteten før du skriver under på noget.",
        items: ["Websites og webplatforme", "Custom business software", "AI-assisterede arbejdsgange", "Restaurant- og hospitality software"],
      },
      {
        title: "Bygget i Aarhus. Lille med vilje.",
        body:
          "UnderStack er Diego Posleman — et uafhængigt softwarestudio i Aarhus. Du arbejder direkte med den person, der designer og bygger dit produkt: ingen account managers, unødige led eller lange kommunikationskæder. Se udvalgt kode på GitHub (github.com/UnderStack-Dk) eller skriv direkte, hvis du vil tale om et projekt.",
      },
    ],
    related: [
      { label: "Webudvikling Aarhus", href: "/dk/webudvikling-aarhus" },
      { label: "Softwareudvikling Aarhus", href: "/dk/softwareudvikling-aarhus" },
      { label: "Restaurant software", href: "/dk/restaurant-software" },
    ],
    cta: "Book en samtale",
    keywords: ["softwareudvikling Aarhus", "webudvikling Aarhus", "software company Aarhus"],
  },
  {
    lang: "en",
    slug: "",
    kind: "home",
    title: "UnderStack | Software company in Aarhus, Denmark",
    description:
      "UnderStack is an independent software studio in Aarhus, designing websites, SaaS products and custom software for companies in Denmark and Europe.",
    h1: "Software, websites and digital products built in Aarhus.",
    eyebrow: "Independent software studio · Aarhus",
    intro:
      "UnderStack designs and develops websites, SaaS products and custom software for companies in Denmark and across Europe.",
    sections: [
      {
        title: "What we build",
        body:
          "Websites, custom business software and AI-assisted workflows, built with React, TypeScript and modern web tooling. This site's own codebase is public on GitHub, so you can see the quality before you sign anything.",
        items: ["Custom software", "Web development", "App development", "AI solutions", "Restaurant software"],
      },
      {
        title: "Built in Aarhus. Small by design.",
        body:
          "UnderStack is Diego Posleman — an independent software studio based in Aarhus. You work directly with the person designing and building your product: no account managers, unnecessary layers or long communication chains. See selected code on GitHub (github.com/UnderStack-Dk) or reach out directly to talk about a project.",
      },
    ],
    related: [
      { label: "Web development", href: "/en/web-development" },
      { label: "Software development", href: "/en/software-development" },
      { label: "Restaurant software", href: "/en/restaurant-software" },
    ],
    cta: "Discuss your project",
    keywords: ["software company Aarhus", "web development Denmark", "custom software Denmark"],
  },
];

export const forYouPages: SeoPage[] = [
  {
    lang: "dk",
    slug: "for-you",
    kind: "forYou",
    title: "Websites og digitale projekter til dig | UnderStack",
    description: "Personlige websites, portfolier, små virksomhedswebsites og digitale værktøjer fra UnderStack. Klar pris fra 1.500 DKK.",
    h1: "Har du brug for et website eller et mindre custom værktøj?",
    eyebrow: "UnderStack For You",
    intro: "UnderStack arbejder også med privatpersoner, freelancere og mindre virksomheder. Fortæl, hvad du har brug for, dit omtrentlige budget og hvornår det skal være klar, så siger vi, hvad der giver mening at bygge.",
    sections: [],
    related: [
      { label: "Webudvikling", href: "/dk/webudvikling" },
      { label: "Softwareudvikling", href: "/dk/softwareudvikling" },
    ],
    cta: "Få et tilbud",
    keywords: ["personlig hjemmeside Danmark", "portfolio hjemmeside", "freelancer hjemmeside", "webudvikler Aarhus"],
  },
  {
    lang: "en",
    slug: "for-you",
    kind: "forYou",
    title: "Websites & Digital Projects for Individuals | UnderStack",
    description: "Personal websites, portfolios, small business websites and custom digital tools from UnderStack. Transparent pricing and projects starting from 1,500 DKK.",
    h1: "Need a website or a small custom tool?",
    eyebrow: "UnderStack For You",
    intro: "UnderStack also works with individuals, freelancers and small businesses. Tell us what you need, your approximate budget and how soon you need it, and we will tell you what makes sense to build.",
    sections: [],
    related: [
      { label: "Web development", href: "/en/web-development" },
      { label: "Software development", href: "/en/software-development" },
    ],
    cta: "Get a quote",
    keywords: ["personal website Denmark", "portfolio website Denmark", "freelancer website Denmark", "web developer Aarhus"],
  },
];

const dkServices: Omit<SeoPage, "lang" | "kind">[] = [
  {
    slug: "webudvikling-aarhus",
    title: "Webudvikling Aarhus | Hjemmesider og webplatforme",
    description:
      "Webudvikling i Aarhus for virksomheder, der har brug for en hurtig, professionel og konverterende hjemmeside eller webplatform.",
    h1: "Webudvikling i Aarhus for virksomheder med seriøse digitale ambitioner.",
    eyebrow: "Webudvikling Aarhus",
    intro:
      "UnderStack hjælper virksomheder i Aarhus med hjemmesider og webplatforme, der forklarer ydelsen tydeligt og fungerer på tværs af enheder.",
    sections: [
      { title: "Problemet vi løser", body: "Mange virksomheder har websites, der ser pæne ud, men ikke forklarer tydeligt, hvad virksomheden leverer, hvem den hjælper, eller hvordan man tager næste skridt. Vi bygger struktur, performance og konvertering ind fra starten." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    faqs: [
      { question: "Hvad koster webudvikling i Aarhus?", answer: "Prisen afhænger af antal sider, designniveau, integrationer og indhold. UnderStack arbejder med klare scopes og kan give et tilbud efter en kort afklaring." },
      { question: "Bygger I kun hjemmesider i Aarhus?", answer: "Nej. Aarhus er et primært lokalt marked, men UnderStack arbejder også med virksomheder i resten af Danmark og Europa." },
    ],
    related: [
      { label: "Webudvikling Danmark", href: "/dk/webudvikling" },
      { label: "Hvad koster en hjemmeside?", href: "/dk/insights/hvad-koster-en-hjemmeside-i-danmark" },
      { label: "Custom software", href: "/dk/custom-software" },
    ],
    cta: "Få et tilbud",
    keywords: ["webudvikling Aarhus", "hjemmeside virksomhed Aarhus", "website Aarhus"],
  },
  {
    slug: "webudvikling",
    translationKey: "web-development",
    title: "Webudvikling Danmark | Websites og webplatforme",
    description: "Webudvikling i Danmark med fokus på performance, SEO, UX og konvertering for virksomheder.",
    h1: "Webudvikling i Danmark med teknisk kvalitet og kommerciel retning.",
    eyebrow: "Webudvikling Danmark",
    intro: "UnderStack bygger websites og webplatforme, der gør det nemt for kunder at forstå, stole på og kontakte din virksomhed.",
    sections: [
      { title: "Mere end en digital brochure", body: "Et godt website skal positionere virksomheden, skabe tillid, forklare ydelsen og kunne findes i Google på relevante søgninger. Derfor kombinerer vi udvikling, indhold, teknisk SEO og conversion structure." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    related: [
      { label: "Webudvikling Aarhus", href: "/dk/webudvikling-aarhus" },
      { label: "Webshop udvikling", href: "/dk/webshop-udvikling" },
      { label: "Business website pris", href: "/dk/insights/hvad-koster-en-hjemmeside-i-danmark" },
    ],
    cta: "Start et webprojekt",
    keywords: ["webudvikling Danmark", "hjemmeside virksomhed", "web development Denmark"],
  },
  {
    slug: "softwareudvikling-aarhus",
    title: "Softwareudvikling Aarhus | Custom software for virksomheder",
    description: "Softwareudvikling i Aarhus for virksomheder, der har brug for interne systemer, platforme og specialudviklet software.",
    h1: "Softwareudvikling i Aarhus til drift, vækst og digitale produkter.",
    eyebrow: "Softwareudvikling Aarhus",
    intro: "UnderStack bygger specialudviklet software for virksomheder, hvor standardværktøjer ikke længere er nok.",
    sections: [
      { title: "Når standard SaaS ikke passer", body: "Vi udvikler systemer til arbejdsgange, data, dashboards, integrationer og produktidéer, hvor virksomheden har brug for kontrol, fleksibilitet og en bedre brugeroplevelse." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    related: [
      { label: "Softwareudvikling Danmark", href: "/dk/softwareudvikling" },
      { label: "Custom software", href: "/dk/custom-software" },
      { label: "AI-løsninger", href: "/dk/ai-loesninger" },
    ],
    cta: "Book en samtale",
    keywords: ["softwareudvikling Aarhus", "custom software Aarhus", "software company Aarhus"],
  },
  {
    slug: "softwareudvikling",
    title: "Softwareudvikling Danmark | Specialudviklede systemer",
    description: "Specialudviklet software i Danmark: interne systemer, webapps, integrationer og digitale produkter.",
    h1: "Softwareudvikling i Danmark for virksomheder med komplekse arbejdsgange.",
    eyebrow: "Softwareudvikling Danmark",
    intro: "UnderStack udvikler software, der understøtter drift, salg, data og produktudvikling uden unødvendig kompleksitet.",
    sections: [
      { title: "Hvad vi bygger", body: "Vi bygger webapps, dashboards, API-lag, integrationsflows, SaaS-produkter og interne værktøjer. Målet er software, der passer præcist til virksomhedens måde at arbejde på." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    related: [
      { label: "Softwareudvikling Aarhus", href: "/dk/softwareudvikling-aarhus" },
      { label: "Hvad koster softwareudvikling?", href: "/dk/insights/hvad-koster-softwareudvikling-i-danmark" },
      { label: "Custom software", href: "/dk/custom-software" },
    ],
    cta: "Diskuter din løsning",
    keywords: ["softwareudvikling Danmark", "custom software Denmark", "software development Denmark"],
  },
  {
    slug: "app-udvikling",
    title: "App udvikling Danmark | Webapps og mobile produkter",
    description: "App udvikling i Danmark for virksomheder, der vil bygge digitale produkter, interne apps eller kundevendte løsninger.",
    h1: "App udvikling i Danmark med fokus på produkt, drift og skalering.",
    eyebrow: "App udvikling",
    intro: "UnderStack hjælper med at omsætte app-idéer til brugbare produkter med stærk UX, teknisk struktur og realistisk scope.",
    sections: [
      { title: "Fra idé til brugbar app", body: "Vi hjælper med product scope, prototyper, brugerflows, frontend, backend og lancering. For mange virksomheder starter den rigtige løsning som en webapp, før native mobiludvikling giver mening." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    related: [
      { label: "Hvad koster en app?", href: "/dk/insights/hvad-koster-en-app-at-udvikle" },
      { label: "Custom software", href: "/dk/custom-software" },
      { label: "AI-løsninger", href: "/dk/ai-loesninger" },
    ],
    cta: "Start en app-dialog",
    keywords: ["app udvikling Danmark", "app udvikling", "webapp udvikling"],
  },
  {
    slug: "ai-loesninger",
    translationKey: "ai-solutions",
    title: "AI-løsninger til virksomheder | AI leverandør i Danmark",
    description: "AI-løsninger til danske virksomheder fra en praktisk AI leverandør: automatisering, interne assistenter og software, der løser konkrete opgaver.",
    h1: "AI-løsninger til danske virksomheder med konkrete arbejdsgange.",
    eyebrow: "AI leverandør i Danmark",
    intro: "UnderStack er en dansk AI leverandør, der bygger AI-assisterede workflows, interne værktøjer og produktfunktioner, hvor teknologien løser en konkret opgave.",
    sections: [
      { title: "AI-løsninger med driftsværdi", body: "De bedste AI-løsninger tager udgangspunkt i en arbejdsproces, ikke i et værktøj. Vi arbejder med automatisering, beslutningsstøtte, strukturering af data, intern assistance, restaurantdrift og kundevendte flows, hvor AI kan reducere friktion." },
      { title: "Fra AI-idé til løsning, der kan bruges", body: "Som AI leverandør hjælper vi med at afgrænse opgaven, forbinde relevante data og systemer og bygge en løsning, som teamet kan bruge og vedligeholde. Det kan være en intern assistent, et automatiseret workflow eller AI som en del af et eksisterende softwareprodukt." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    faqs: [
      { question: "Hvad kan en AI-løsning bruges til i en virksomhed?", answer: "En AI-løsning kan blandt andet understøtte dokumentarbejde, interne søgninger, klassificering, kundevendte flows og gentagne arbejdsopgaver. Værdien afhænger af, at opgaven, dataene og den menneskelige kontrol er tydeligt defineret." },
      { question: "Hvordan vælger man en AI leverandør?", answer: "Se efter en partner, der først forstår arbejdsgangen og kan tage ansvar for integration, sikkerhed, brugeroplevelse og drift. En god løsning behøver ikke starte stort; den skal kunne måles og bruges i hverdagen." },
    ],
    related: [
      { label: "AI til danske virksomheder", href: "/dk/insights/ai-loesninger-til-danske-virksomheder" },
      { label: "Custom webudvikling", href: "/dk/custom-software" },
      { label: "Cases", href: "/dk/cases/" },
    ],
    cta: "Book en AI-samtale",
    keywords: ["AI løsninger", "AI løsning", "AI leverandør", "AI software Danmark", "AI restaurant software"],
  },
  {
    slug: "restaurant-software",
    title: "Restaurant software Danmark | Drift, køkken og AI",
    description: "Restaurant software i Danmark til køkkenstyring, food cost, inventory, drift og AI-understøttede restaurant workflows.",
    h1: "Restaurant software til restauranter, køkkener og hospitality teams.",
    eyebrow: "Restaurant software Denmark",
    intro: "UnderStack bygger og dokumenterer software til restaurantdrift: fra food cost og waste tracking til AI-assisteret service og køkkenstyring.",
    sections: [
      { title: "Hvad restaurant software skal løse", body: "Restauranter har brug for bedre overblik over vareforbrug, priser, spild, serviceflow og daglig drift. Software skal passe til køkkenets tempo og give bedre beslutninger uden at skabe ekstra administration." },
      { title: "GastroApp som produktretning", body: "GastroApp er UnderStacks restaurant software-retning med fokus på food cost, opskrifter, inventory og operationelle værktøjer i køkkenet." },
      dkServiceSections.stack,
    ],
    faqs: [
      { question: "Bygger UnderStack restaurant management software?", answer: "Ja. GastroApp dækker food cost, opskrifter, inventory og indkøb i ét system. Se GastroApp-casen for detaljer og et direkte link til produktet." },
      { question: "Kan løsningerne tilpasses en restaurant?", answer: "Ja. Custom restaurant software kan bygges omkring konkrete workflows som food cost, waste tracking, service, inventory eller rapportering." },
    ],
    related: [
      { label: "GastroApp case", href: "/dk/cases/gastroapp" },
      { label: "Restaurant software artikel", href: "/dk/insights/restaurant-software-i-danmark" },
      { label: "AI restaurantdrift", href: "/dk/insights/hvordan-automatiserer-ai-restaurantdrift" },
    ],
    cta: "Se restaurant-løsninger",
    keywords: ["restaurant software Denmark", "kitchen management software", "restaurant inventory management", "food cost management"],
  },
  {
    slug: "custom-software",
    title: "Custom webudvikling og software | UnderStack Danmark",
    description: "Custom webudvikling og specialudviklet software til virksomheder i Danmark: webplatforme, interne systemer, integrationer og digitale produkter.",
    h1: "Custom webudvikling og software til virksomheder med særlige behov.",
    eyebrow: "Custom webudvikling Danmark",
    intro: "UnderStack designer og udvikler custom webplatforme og business software til arbejdsgange, data, integrationer og digitale produkter.",
    sections: [
      { title: "Når standardværktøjer og standardwebsites ikke passer", body: "Custom webudvikling giver mening, når virksomheden bruger for mange manuelle processer, spreadsheets eller standardværktøjer, der ikke passer til driften. Vi bygger løsningen omkring den måde, teamet faktisk arbejder på." },
      { title: "Fra webplatform til internt system", body: "Nogle opgaver kræver et klart virksomhedswebsite. Andre kræver login, roller, data, dashboards eller integrationer. Vi kan bygge begge dele som én sammenhængende løsning, uden at gøre projektet mere komplekst end nødvendigt." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    related: [
      { label: "Webudvikling Danmark", href: "/dk/webudvikling" },
      { label: "Softwareudvikling", href: "/dk/softwareudvikling" },
      { label: "Peritar - ASEPCO case", href: "/dk/cases/peritar-asepco" },
    ],
    cta: "Diskuter custom software",
    keywords: ["custom webudvikling", "specialudviklet software", "webplatform udvikling", "custom software Denmark"],
  },
  {
    slug: "webshop-udvikling",
    title: "Webshop udvikling Danmark | Commerce platforme",
    description: "Webshop udvikling for virksomheder, der har brug for en hurtig, troværdig og skalerbar online salgsplatform.",
    h1: "Webshop udvikling med fokus på performance, UX og købsklar trafik.",
    eyebrow: "Webshop udvikling",
    intro: "UnderStack kan bygge commerce-orienterede weboplevelser og produktplatforme med stærk frontend, tydelig struktur og teknisk SEO.",
    sections: [
      { title: "Commerce uden unødvendig kompleksitet", body: "En webshop skal gøre produkter lette at forstå, finde og købe. Vi fokuserer på informationsarkitektur, hastighed, trackingstruktur og teknisk fundament før avancerede features." },
      dkServiceSections.process,
      dkServiceSections.stack,
    ],
    related: [
      { label: "Webudvikling", href: "/dk/webudvikling" },
      { label: "Custom software", href: "/dk/custom-software" },
      { label: "Website pris", href: "/dk/insights/hvad-koster-en-hjemmeside-i-danmark" },
    ],
    cta: "Planlæg webshop",
    keywords: ["webshop udvikling Danmark", "ecommerce development Denmark", "webshop udvikling"],
  },
];

const serviceDefinitions: (Omit<SeoPage, "lang" | "kind"> & Partial<Pick<SeoPage, "lang">>)[] = [
  {
    slug: "web-development",
    translationKey: "web-development",
    title: "Web development in Denmark | Websites and web platforms",
    description: "Web development in Denmark for companies that need a clear, responsive business website or a practical web platform built to perform.",
    h1: "Web development in Denmark for websites that make your offer clear.",
    eyebrow: "Web development Denmark",
    intro: "UnderStack provides web development in Denmark for company websites and web platforms, with responsive design, technical SEO, analytics and the integrations your business actually needs.",
    sections: [
      { title: "Web development that supports the business", body: "Many business websites look acceptable but fail to explain the offer, build trust or convert qualified visitors. We build clear structure, performance, SEO foundations and conversion paths into every website or web platform." },
      { title: "A website when you need one, a platform when you need more", body: "A focused business website can be the right place to start. When the work needs user accounts, data, workflows or recurring integrations, we can extend the same foundation into a web platform without losing clarity or speed." },
      enServiceSections.process,
      enServiceSections.stack,
    ],
    related: [
      { label: "Business website cost", href: "/en/insights/how-much-does-a-business-website-cost-in-denmark" },
      { label: "Software development", href: "/en/software-development" },
      { label: "Custom software", href: "/en/custom-software" },
    ],
    cta: "Start a project",
    keywords: ["web development Denmark", "web development Aarhus", "business website Denmark"],
  },
  {
    slug: "software-development",
    title: "Software development Denmark | UnderStack",
    description: "Software development in Denmark for custom business systems, internal tools, platforms and digital products.",
    h1: "Custom software for workflows that generic tools do not fit.",
    eyebrow: "Software development Denmark",
    intro: "UnderStack builds internal systems, business software and product platforms around real workflows, data and integrations.",
    sections: [
      { title: "Built around real workflows", body: "We build dashboards, internal systems, API layers, integrations, SaaS products and web apps for teams that need software aligned with how they actually work." },
      enServiceSections.process,
      enServiceSections.stack,
    ],
    related: [
      { label: "Custom software", href: "/en/custom-software" },
      { label: "Software development cost", href: "/en/insights/how-much-does-software-development-cost-in-denmark" },
      { label: "Cases", href: "/en/cases/" },
    ],
    cta: "Discuss your project",
    keywords: ["software development Denmark", "software company Aarhus", "custom software Europe"],
  },
  {
    slug: "custom-software",
    title: "Custom software Denmark and Europe | UnderStack",
    description: "Custom business software for companies in Denmark and Europe: platforms, tools, integrations and scalable systems.",
    h1: "Custom software for companies that have outgrown standard tools.",
    eyebrow: "Custom software Denmark",
    intro: "UnderStack builds custom business software for workflows, integrations, data, internal operations and product ideas.",
    sections: [
      { title: "When SaaS is not enough", body: "Custom software makes sense when teams rely on manual processes, disconnected tools or workflows that off-the-shelf software cannot support cleanly." },
      enServiceSections.process,
      enServiceSections.stack,
    ],
    related: [
      { label: "Custom software vs SaaS", href: "/en/insights/custom-software-vs-saas" },
      { label: "Software development", href: "/en/software-development" },
      { label: "Cases", href: "/en/cases/" },
    ],
    cta: "Plan your system",
    keywords: ["custom software Denmark", "custom business software Europe", "software company Denmark"],
  },
  {
    slug: "app-development",
    title: "App development Denmark | Web apps and digital products",
    description: "App development in Denmark for companies building web apps, internal tools, mobile products and digital services.",
    h1: "App development in Denmark with product thinking and technical discipline.",
    eyebrow: "App development Denmark",
    intro: "UnderStack helps turn app ideas into useful digital products with clear scope, strong UX and maintainable architecture.",
    sections: [
      { title: "From concept to usable product", body: "We help with product scope, prototypes, user flows, frontend, backend and launch. For many companies, a web app is the right first product before native mobile development." },
      enServiceSections.process,
      enServiceSections.stack,
    ],
    related: [
      { label: "App cost guide", href: "/dk/insights/hvad-koster-en-app-at-udvikle" },
      { label: "AI development", href: "/en/ai-development" },
      { label: "Cases", href: "/en/cases/" },
    ],
    cta: "Discuss your app",
    keywords: ["app development Denmark", "web app development Denmark", "digital product Denmark"],
  },
  {
    slug: "ai-development",
    translationKey: "ai-solutions",
    title: "AI development for companies | Denmark and Europe",
    description: "AI development for companies: automation, internal assistants, workflows and AI-enabled software systems.",
    h1: "AI development for companies that need practical automation, not hype.",
    eyebrow: "AI solutions for business",
    intro: "UnderStack builds applied AI workflows, internal tools and product features where AI solves concrete operational tasks.",
    sections: [
      { title: "AI for specific tasks", body: "AI is useful for automation, document processing, search, classification and assistants when it solves a clear workflow problem." },
      enServiceSections.process,
      enServiceSections.stack,
    ],
    related: [
      { label: "AI automation article", href: "/en/insights/ai-automation-for-european-businesses" },
      { label: "Cases", href: "/en/cases/" },
      { label: "Restaurant software", href: "/en/restaurant-software" },
    ],
    cta: "Plan an AI workflow",
    keywords: ["AI solutions companies", "AI development Denmark", "AI automation Europe"],
  },
  {
    slug: "restaurant-software",
    title: "Restaurant software Denmark | Kitchen and AI operations",
    description: "Restaurant software for Denmark and Europe: food cost, inventory, kitchen management, operations and practical AI workflows.",
    h1: "Restaurant software for kitchens, operators and hospitality teams.",
    eyebrow: "Restaurant software Denmark",
    intro: "UnderStack builds restaurant software concepts and products around food cost, waste tracking, inventory, kitchen workflows and practical service support.",
    sections: [
      { title: "Operational problems we address", body: "Restaurants need better visibility into food cost, waste, pricing, inventory, service flow and day-to-day execution. Software should support the pace of the kitchen instead of adding admin load." },
      { title: "GastroApp", body: "GastroApp is UnderStack's restaurant software direction for food cost, recipes, inventory and utility workflows in the kitchen." },
      enServiceSections.stack,
    ],
    related: [
      { label: "GastroApp case", href: "/en/cases/gastroapp" },
      { label: "Restaurant software guide", href: "/en/insights/restaurant-management-software-in-denmark" },
      { label: "AI restaurant operations", href: "/dk/insights/hvordan-automatiserer-ai-restaurantdrift" },
    ],
    cta: "Explore restaurant solutions",
    keywords: ["restaurant software Denmark", "restaurant management software Denmark", "kitchen management software", "AI restaurant software"],
  },
  {
    lang: "se",
    slug: "teknisk-seo-sverige",
    title: "Teknisk SEO Sverige | UnderStack",
    description:
      "Teknisk SEO för svenska företag: indexerbar webbplatsstruktur, Core Web Vitals, strukturerad data, flerspråkig SEO och konverteringsmätning.",
    h1: "Teknisk SEO för svenska företag som vill att sökmotorer ska förstå deras webbplats.",
    eyebrow: "Teknisk SEO Sverige",
    intro:
      "UnderStack hjälper svenska företag att stärka den tekniska grunden för synlighet: crawlbarhet, rendering, prestanda, strukturerad data, flerspråkig struktur och mätbara konverteringsvägar.",
    sections: [
      {
        title: "Teknisk SEO börjar före innehållet",
        body:
          "Synlighet i sök beror på om en webbplats kan crawlas, renderas, förstås och bedömas som pålitlig. Vi granskar arkitekturen bakom sidorna: interna länkar, kanoniska URL:er, metadata, sitemap, robots regler, strukturerad data och hur JavaScript når sökmotorer.",
      },
      {
        title: "Byggt för Sverige och tillväxt över gränserna",
        body:
          "Ett svenskt företag kan behöva svenskt innehåll, engelska kommersiella sidor eller båda. Vi planerar språk och regionala signaler medvetet, inklusive hreflang där det är relevant, så att tillväxt i Norden och Europa inte skapar duplicerat innehåll eller otydliga URL:er.",
      },
      {
        title: "Vad teknisk SEO kan omfatta",
        body:
          "Rätt omfattning följer webbplatsen och det kommersiella målet. Arbetet kan börja med en fokuserad SEO analys och fortsätta med implementation tillsammans med webb och produktutveckling.",
        items: [
          "Crawlbarhet, indexering och granskning av kanoniska URL:er",
          "Core Web Vitals, laddningsbeteende och stabil layout",
          "Strukturerad data, sitemap och robots konfiguration",
          "JavaScript rendering och kontroll av serverrenderade sidor",
          "Flerspråkig och regional SEO arkitektur",
          "Analys, kontakt händelser och konverteringsmätning",
        ],
      },
      {
        title: "Tydliga rekommendationer och praktisk leverans",
        body:
          "Vi säljer inte placeringar eller publicerar innehåll som bara fyller ut med nyckelord. Resultatet är en prioriterad teknisk plan, tydlig implementation och en webbplatsgrund som stöder användbart innehåll, relevant trafik och framtida tillväxt.",
      },
      {
        title: "Så arbetar vi",
        body:
          "Vi definierar affärsmål, målgrupper och arbetsflöden innan implementation. Leveransen sker i fokuserade iterationer med tydlig arkitektur, god användarupplevelse, förvaltningsbar kod och kvalitet inför lansering.",
        items: ["Strategi och omfattning", "UX och teknisk arkitektur", "Frontend, backend och integrationer", "QA, lansering och förbättring"],
        variant: "process",
      },
    ],
    faqs: [
      {
        question: "Kan UnderStack hjälpa företag i Sverige med teknisk SEO?",
        answer:
          "Ja. UnderStack arbetar på distans från Aarhus med företag i Sverige, Danmark och övriga Europa. Arbetet fokuserar på webbplatsens tekniska status och de affärsmål den ska stödja.",
      },
      {
        question: "Garanterar ni placeringar i Google?",
        answer:
          "Nej. Placeringar i sök beror på konkurrens, innehåll, auktoritet och sökmotorernas beslut. Teknisk SEO tar bort onödiga hinder och skapar en starkare grund för långsiktig synlighet.",
      },
      {
        question: "Behöver svenska och engelska sidor olika SEO arbete?",
        answer:
          "Ofta, ja. Bästa arbetssätt beror på målgrupp, tjänster och marknader. Vi kan bedöma om separata språksidor, hreflang annoteringar och eget innehåll är rätt väg innan de byggs.",
      },
      {
        question: "Kan teknisk SEO kombineras med en ny webbplats eller webbplattform?",
        answer:
          "Ja. Det är ofta mer effektivt att etablera teknisk SEO, analys och innehållsstruktur medan en webbplats eller plattform byggs, i stället för att reparera grunden efter lansering.",
      },
    ],
    related: [
      { label: "Webbutveckling", href: "/en/web-development" },
      { label: "Anpassad mjukvara", href: "/en/custom-software" },
      { label: "Mjukvaruutveckling", href: "/en/software-development" },
      { label: "Insikter", href: "/en/insights/" },
    ],
    cta: "Prata om teknisk SEO",
    keywords: [
      "teknisk SEO Sverige",
      "teknisk sökmotoroptimering Sverige",
      "SEO analys Sverige",
      "SEO byrå Sverige",
      "teknisk SEO för företag",
      "Core Web Vitals Sverige",
      "flerspråkig SEO Sverige",
    ],
  },
];

export const servicePages: SeoPage[] = [
  ...dkServices.map((page) => ({ ...page, lang: "dk" as const, kind: "service" as const })),
  ...serviceDefinitions.map((page) => ({ ...page, lang: page.lang ?? ("en" as const), kind: "service" as const })),
];

export const casePages: SeoPage[] = [
  {
    lang: "dk",
    slug: "cases",
    kind: "caseIndex",
    title: "Cases | UnderStack produkter og softwareprojekter",
    description: "UnderStack cases: GastroApp, UnderStack Pocket AI, Life og platformmodernisering for Peritar (ASEPCO).",
    h1: "Cases fra UnderStack.",
    eyebrow: "Cases",
    intro: "Et lille udvalg af projekter — hvert med kode, en URL eller en navngiven kunde bag, i stedet for en lang liste.",
    sections: [
      { title: "Dokumenterede produkter", body: "Diego Posleman bygger og driver hvert af disse produkter selv. Du kan se koden på GitHub eller besøge produktet direkte via linkene nedenfor." },
    ],
    related: [
      { label: "GastroApp", href: "/dk/cases/gastroapp" },
      { label: "UnderStack Pocket AI", href: "/dk/cases/understack-ai-pocket" },
      { label: "Life", href: "/dk/cases/life" },
    ],
    cta: "Se relevante løsninger",
    keywords: ["UnderStack cases", "software cases Danmark"],
  },
  {
    lang: "en",
    slug: "cases",
    kind: "caseIndex",
    title: "Cases | UnderStack software products",
    description: "UnderStack cases: GastroApp, UnderStack Pocket AI, Life and platform modernization for Peritar (ASEPCO).",
    h1: "Cases from UnderStack.",
    eyebrow: "Cases",
    intro: "A small set of projects — each backed by code, a live URL or a named client, instead of a long list.",
    sections: [
      { title: "Documented products", body: "Diego Posleman builds and runs each of these products himself. You can see the code on GitHub or visit the product directly through the links below." },
    ],
    related: [
      { label: "GastroApp", href: "/en/cases/gastroapp" },
      { label: "UnderStack Pocket AI", href: "/en/cases/understack-ai-pocket" },
      { label: "Life", href: "/en/cases/life" },
    ],
    cta: "Explore related services",
    keywords: ["software cases Denmark", "UnderStack products"],
  },
];

const caseDetails = [
  {
    slug: "gastroapp",
    name: "GastroApp",
    dk: "Restaurantdriftssoftware bygget på erfaring fra hospitality. Samler opskrifter, food cost, inventory, indkøb, produktion, rapporter og køkkendrift i ét system.",
    en: "Restaurant operations software built from firsthand hospitality experience. Connects recipes, food cost, inventory, purchasing, production, reports and day-to-day kitchen operations in one system.",
    serviceDk: "/dk/restaurant-software",
    serviceEn: "/en/restaurant-software",
    keywords: ["restaurant software Denmark", "food cost management", "kitchen management software"],
    featuresDk: ["Opskrifter og food cost", "Inventory, stock og indkøb", "Produktion, events og closeout", "Rapporter, roller og flere restauranter"],
    featuresEn: ["Recipes and food costing", "Inventory, stock and purchasing", "Production, events and closeout", "Reports, role-based access and multi-restaurant management"],
    technicalDk: "Et samlet driftsværktøj, hvor køkkenteamet arbejder med opskrifter, lager og indkøb i samme produkt.",
    technicalEn: "One operations product where kitchen teams work with recipes, stock and purchasing in the same system.",
  },
  {
    slug: "understack-ai-pocket",
    name: "UnderStack AI Pocket",
    dk: "Færdig Android-assistent med local-first arkitektur, som er under Google Play-review. Produktet er designet til private, kontrollerbare AI-workflows på mobilen.",
    en: "Completed Android assistant in Google Play review, built around a local-first architecture for private, controllable AI workflows on mobile.",
    serviceDk: "/dk/ai-loesninger",
    serviceEn: "/en/ai-development",
    keywords: ["local-first Android AI", "private AI assistant", "mobile AI workflows"],
    featuresDk: ["Local-first datahåndtering", "Vedvarende hukommelse og værktøjsrouting", "Per-app tilladelser", "Automatiseringer med auditability"],
    featuresEn: ["Local-first data handling", "Persistent memory and tool routing", "Per-app permissions", "Automations with auditability"],
    technicalDk: "Data og godkendelser håndteres på enheden, mens værktøjer og automatiseringer kræver eksplicitte tilladelser.",
    technicalEn: "Data and approvals stay on the device, while tools and automations require explicit permissions.",
  },
  {
    slug: "life",
    name: "Life",
    dk: "Færdigt local-first personligt operating system til opgaver, noter, regninger, kvitteringer, dokumenter og hverdagsplanlægning. Produktet er under Google Play-review.",
    en: "Completed local-first personal operating system for tasks, notes, bills, receipts, documents and everyday planning. The product is in Google Play review.",
    serviceDk: "/dk/app-udvikling",
    serviceEn: "/en/app-development",
    keywords: ["personal operating system app", "local-first productivity app", "Android life organizer"],
    featuresDk: ["Opgaver, noter og påmindelser", "Regninger, kvitteringer og OCR", "Abonnementer og dokumentarkiv", "Indkøbslister og ADHD-venligt overblik"],
    featuresEn: ["Tasks, notes and reminders", "Bills, receipts and OCR", "Subscriptions and document archive", "Shopping lists and ADHD-friendly organisation"],
    technicalDk: "Produktet samler private oplysninger lokalt på telefonen frem for at gøre hverdagsdata til et eksternt dashboard.",
    technicalEn: "The product keeps personal information on the phone instead of turning everyday data into an external dashboard.",
  },
  {
    slug: "peritar-asepco",
    name: "Peritar - ASEPCO",
    dk: "Professionel platform til ekspertvurderingsarbejde for ASEPCO i Mendoza, Argentina. UnderStack gennemfører en større teknisk modernisering af platformen for en navngiven kunde.",
    en: "A professional platform used for expert assessment workflows for ASEPCO in Mendoza, Argentina, now undergoing a major technical modernization by UnderStack for a named client.",
    serviceDk: "/dk/custom-software",
    serviceEn: "/en/custom-software",
    keywords: ["legacy system modernization", "PHP to TypeScript migration", "custom platform Argentina"],
    featuresDk: ["Migrering fra legacy PHP til TypeScript", "Modernisering af frontend og backend", "Opdateret UI/UX", "Vedligeholdbar kodestruktur", "Forberedelse til skalerbar arkitektur"],
    featuresEn: ["Legacy PHP to TypeScript modernization", "Frontend and backend modernization", "UI/UX modernization", "Maintainable code structure", "Scalable architecture preparation"],
    technicalDk: "Moderniseringen sker løbende for en aktiv kunde og er dokumenteret som et igangværende projekt, ikke et afsluttet resultat.",
    technicalEn: "The modernization is ongoing for an active client and is documented as work in progress, not a finished result.",
  },
];

caseDetails.forEach((item) => {
  casePages.push(
    {
      lang: "dk",
      slug: `cases/${item.slug}`,
      kind: "case",
      title: `${item.name} case | UnderStack`,
      description: `${item.name}: ${item.dk}`,
      h1: `${item.name}: produkt og status.`,
      eyebrow: "Produkt",
      intro: item.dk,
      sections: [
        { title: "Produktet", body: item.dk },
        { title: "Funktioner", body: "Nedenfor er de funktioner, der er bygget eller er del af den nuværende produktretning.", items: item.featuresDk },
        { title: "Teknisk retning", body: item.technicalDk },
      ],
      related: [
        { label: "Relevant service", href: item.serviceDk },
        { label: "Alle cases", href: "/dk/cases/" },
        { label: "Kontakt", href: "mailto:dev.team@understack.dk" },
      ],
      cta: "Diskuter en lignende løsning",
      keywords: item.keywords,
    },
    {
      lang: "en",
      slug: `cases/${item.slug}`,
      kind: "case",
      title: `${item.name} case | UnderStack`,
      description: `${item.name}: ${item.en}`,
      h1: `${item.name}: product and status.`,
      eyebrow: "Product",
      intro: item.en,
      sections: [
        { title: "The product", body: item.en },
        { title: "Capabilities", body: "The capabilities below are built or part of the current product direction.", items: item.featuresEn },
        { title: "Technical direction", body: item.technicalEn },
      ],
      related: [
        { label: "Related service", href: item.serviceEn },
        { label: "All cases", href: "/en/cases/" },
        { label: "Contact", href: "mailto:dev.team@understack.dk" },
      ],
      cta: "Discuss a similar system",
      keywords: item.keywords,
    },
  );
});

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "GastroApp",
    category: "Restaurant Operations SaaS",
    description:
      "Restaurant operations software that brings recipes, food cost, inventory, purchasing, production and reporting into one system.",
    capabilities: ["Recipes and food costing", "Inventory, stock and purchasing", "Production, events and closeout", "Reports and operational analytics", "Role-based and multi-restaurant access"],
    status: "Working product",
    cta: { label: "Visit GastroApp", href: GASTROAPP_URL },
    localized: {
      dk: {
        category: "Restaurantdrift-SaaS",
        description: "Restaurantdriftssoftware, der samler opskrifter, food cost, lager, indkøb, produktion og rapportering i ét system.",
        capabilities: ["Opskrifter og food cost", "Lager, stock og indkøb", "Produktion, events og closeout", "Rapporter og driftsanalyse", "Rollebaseret adgang til flere restauranter"],
        status: "Fungerende produkt",
        cta: { label: "Besøg GastroApp", href: GASTROAPP_URL },
      },
      se: {
        category: "Restaurangdrift-SaaS",
        description: "Restaurangdriftsmjukvara som samlar recept, food cost, lager, inköp, produktion och rapportering i ett system.",
        capabilities: ["Recept och food costing", "Lager, stock och inköp", "Produktion, events och avslut", "Rapporter och driftsanalys", "Rollbaserad åtkomst för flera restauranger"],
        status: "Fungerande produkt",
        cta: { label: "Besök GastroApp", href: GASTROAPP_URL },
      },
      de: {
        category: "SaaS für Restaurantbetrieb",
        description: "Restaurantbetriebssoftware, die Rezepte, Food Cost, Lagerbestand, Einkauf, Produktion und Berichte in einem System vereint.",
        capabilities: ["Rezepte und Food Costing", "Lager, Bestand und Einkauf", "Produktion, Events und Tagesabschluss", "Berichte und Betriebsanalysen", "Rollenbasierter Zugriff für mehrere Restaurants"],
        status: "Funktionierendes Produkt",
        cta: { label: "GastroApp besuchen", href: GASTROAPP_URL },
      },
    },
  },
  {
    name: "UnderStack Pocket AI",
    category: "Local-first Mobile Assistant",
    description:
      "A completed Android assistant designed around local execution, approved memory, explicit permissions and optional trusted-workstation delegation.",
    capabilities: [
      "Local AI chat with downloaded models",
      "Approved local memory stored on device",
      "Selected files, PDF, DOCX and XLSX text workflows",
      "Camera, image OCR and visual labeling",
      "Calendar, reminders, contacts, email drafts, SMS, phone, maps and location with approval",
      "Public web search and source reading when the user asks to go online",
      "On-device image generation when a compatible local model is installed",
      "Android app launcher and optional screen-control surfaces where the distribution permits it",
    ],
    status: "Completed - Google Play review",
    localized: {
      dk: {
        category: "Local-first Android AI-assistent",
        description:
          "En privat Android-assistent bygget omkring lokale modeller, godkendt hukommelse på enheden, valgte filer og mobilhandlinger med tydelige tilladelser.",
        capabilities: [
          "Lokal AI-chat med downloadede modeller",
          "Godkendt lokal hukommelse gemt på enheden",
          "Arbejdsgange til valgte filer, PDF, DOCX og XLSX-tekst",
          "Kamera, billed-OCR og visuel mærkning",
          "Kalender, påmindelser, kontakter, email-kladder, SMS, telefon, kort og lokation med godkendelse",
          "Offentlig websøgning og kildelæsning når brugeren beder om online research",
          "Billedgenerering på enheden når en kompatibel lokal model er installeret",
          "Android app launcher og valgfri skærmkontrol hvor distributionen tillader det",
        ],
        status: "Färdig - Google Play-review",
      },
      se: {
        category: "Local-first mobilassistent",
        description: "En färdig Android-assistent byggd kring lokal exekvering, godkänt minne, tydliga behörigheter och valfri delegering till en betrodd dator.",
        capabilities: [
          "Lokal AI-chatt med nedladdade modeller",
          "Godkänt lokalt minne lagrat på enheten",
          "Arbetsflöden för valda filer, PDF-, DOCX- och XLSX-text",
          "Kamera, bild-OCR och visuell märkning",
          "Kalender, påminnelser, kontakter, e-postutkast, SMS, telefon, kartor och plats med godkännande",
          "Offentlig websökning och källäsning när användaren ber om det",
          "Bildgenerering på enheten när en kompatibel lokal modell är installerad",
          "Android-apputforskare och valfria skärmkontrollytor där distributionen tillåter det",
        ],
        status: "Färdig – granskas i Google Play",
      },
      de: {
        category: "Local-first Mobile-Assistent",
        description: "Ein fertiggestellter Android-Assistent, aufgebaut auf lokaler Ausführung, freigegebenem Speicher, expliziten Berechtigungen und optionaler Delegation an einen vertrauenswürdigen Rechner.",
        capabilities: [
          "Lokaler KI-Chat mit heruntergeladenen Modellen",
          "Freigegebener lokaler Speicher auf dem Gerät",
          "Workflows für ausgewählte Dateien, PDF-, DOCX- und XLSX-Text",
          "Kamera, Bild-OCR und visuelle Kennzeichnung",
          "Kalender, Erinnerungen, Kontakte, E-Mail-Entwürfe, SMS, Telefon, Karten und Standort mit Freigabe",
          "Öffentliche Websuche und Quellenlektüre, wenn der Nutzer online gehen möchte",
          "Bildgenerierung auf dem Gerät bei installiertem kompatiblem lokalem Modell",
          "Android-App-Launcher und optionale Bildschirmsteuerung, wo die Distribution es erlaubt",
        ],
        status: "Fertiggestellt – im Google-Play-Review",
      },
    },
  },
  {
    name: "Peritar - ASEPCO",
    category: "Business Platform Modernization",
    description:
      "A professional platform used in the context of expert assessment workflows for ASEPCO in Mendoza, Argentina, now undergoing a major technical modernization by UnderStack.",
    capabilities: ["Legacy PHP -> TypeScript modernization", "Frontend and backend modernization", "UI/UX modernization", "Maintainable code structure", "Scalable architecture preparation"],
    status: "Platform modernization in progress",
    location: "Mendoza, Argentina",
    localized: {
      dk: {
        category: "Modernisering af forretningsplatform",
        description: "En professionel platform, der bruges til ekspertvurderingsarbejde for ASEPCO i Mendoza, Argentina, som nu gennemgår en stor teknisk modernisering af UnderStack.",
        capabilities: ["Migrering fra legacy PHP til TypeScript", "Modernisering af frontend og backend", "Modernisering af UI/UX", "Vedligeholdbar kodestruktur", "Forberedelse til skalerbar arkitektur"],
        status: "Platformmodernisering i gang",
        location: "Mendoza, Argentina",
      },
      se: {
        category: "Modernisering av affärsplattform",
        description: "En professionell plattform som används för expertbedömningsarbete åt ASEPCO i Mendoza, Argentina, som nu genomgår en stor teknisk modernisering av UnderStack.",
        capabilities: ["Modernisering från legacy PHP till TypeScript", "Modernisering av frontend och backend", "Modernisering av UI/UX", "Underhållbar kodstruktur", "Förberedelse för skalbar arkitektur"],
        status: "Plattformsmodernisering pågår",
        location: "Mendoza, Argentina",
      },
      de: {
        category: "Modernisierung der Geschäftsplattform",
        description: "Eine professionelle Plattform für Gutachten-Workflows für ASEPCO in Mendoza, Argentinien, die derzeit von UnderStack umfassend technisch modernisiert wird.",
        capabilities: ["Modernisierung von Legacy-PHP zu TypeScript", "Modernisierung von Frontend und Backend", "UI/UX-Modernisierung", "Wartbare Codestruktur", "Vorbereitung auf eine skalierbare Architektur"],
        status: "Plattformmodernisierung läuft",
        location: "Mendoza, Argentinien",
      },
    },
  },
  {
    name: "Life",
    category: "Local-first Personal OS",
    description:
      "A completed, local personal organization app for tasks, notes, bills, receipts, subscriptions, documents and focused everyday planning.",
    capabilities: ["Tasks and notes", "Bills, receipts and OCR", "Subscriptions and documents", "Shopping and personal planning", "ADHD-friendly organization"],
    status: "Completed - Google Play review",
    localized: {
      dk: {
        category: "Local-first personligt OS",
        description: "En færdig, lokal personlig organiseringsapp til opgaver, noter, regninger, kvitteringer, abonnementer, dokumenter og fokuseret hverdagsplanlægning.",
        capabilities: ["Opgaver og noter", "Regninger, kvitteringer og OCR", "Abonnementer og dokumenter", "Indkøb og personlig planlægning", "ADHD-venlig organisering"],
        status: "Færdig - anmeldelse i Google Play",
      },
      se: {
        category: "Local-first personligt OS",
        description: "En färdig, lokal app för personlig organisation för uppgifter, anteckningar, räkningar, kvitton, abonnemang, dokument och fokuserad vardagsplanering.",
        capabilities: ["Uppgifter och anteckningar", "Räkningar, kvitton och OCR", "Abonnemang och dokument", "Inköp och personlig planering", "ADHD-vänlig organisation"],
        status: "Färdig – granskas i Google Play",
      },
      de: {
        category: "Local-first persönliches Betriebssystem",
        description: "Eine fertiggestellte, lokale App zur persönlichen Organisation für Aufgaben, Notizen, Rechnungen, Quittungen, Abonnements, Dokumente und fokussierte Alltagsplanung.",
        capabilities: ["Aufgaben und Notizen", "Rechnungen, Quittungen und OCR", "Abonnements und Dokumente", "Einkäufe und persönliche Planung", "ADHS-freundliche Organisation"],
        status: "Fertiggestellt – im Google-Play-Review",
      },
    },
  },
];

// Earlier-stage concepts that do not yet have public evidence (a repo, a live
// URL, a named client) to stand next to the projects above. Kept out of the
// main portfolio and shown only on the "other projects" page so the main
// portfolio stays limited to what can actually be verified.
export const archivedProjects: PortfolioProject[] = [
  {
    name: "AI Schedule",
    category: "Workforce Scheduling",
    description:
      "A scheduling product concept for multi-location businesses with availability, leave, contractual limits and practical attendance controls.",
    capabilities: ["Employee scheduling", "Availability and vacation management", "Contractual hour limits", "Replacement workflows and notifications", "Geofenced attendance"],
    status: "Concept",
    localized: {
      dk: {
        category: "Vagtplanlægning",
        description: "Et koncept til vagtplanlægning for virksomheder med flere lokationer, med tilgængelighed, orlov, kontraktlige grænser og praktisk fremmødekontrol.",
        capabilities: ["Medarbejderplanlægning", "Tilgængeligheds- og feriestyring", "Kontraktlige timegrænser", "Erstatnings-workflows og notifikationer", "Geofence-baseret fremmøde"],
        status: "Koncept",
      },
      se: {
        category: "Personalschemaläggning",
        description: "Ett koncept för schemaläggning för verksamheter med flera platser, med tillgänglighet, ledighet, avtalsmässiga gränser och praktisk närvarokontroll.",
        capabilities: ["Personalschemaläggning", "Hantering av tillgänglighet och semester", "Avtalsmässiga timgränser", "Ersättningsflöden och aviseringar", "Geofence-baserad närvaro"],
        status: "Koncept",
      },
      de: {
        category: "Personaleinsatzplanung",
        description: "Ein Schichtplanungskonzept für Unternehmen mit mehreren Standorten, mit Verfügbarkeit, Urlaub, vertraglichen Grenzen und praktischer Anwesenheitskontrolle.",
        capabilities: ["Mitarbeiterplanung", "Verfügbarkeits- und Urlaubsverwaltung", "Vertragliche Stundengrenzen", "Vertretungs-Workflows und Benachrichtigungen", "Geofence-basierte Anwesenheit"],
        status: "Konzept",
      },
    },
  },
  {
    name: "UnderStack AI Agent",
    category: "Local-first Windows Desktop Agent",
    description:
      "A local-first desktop agent in active development for controlled repository work, diagnostics, patching and verified engineering workflows.",
    capabilities: [
      "Local desktop dashboard for agent work",
      "Local daemon on localhost APIs",
      "Task creation, task state and execution flow",
      "Project registration and repository analysis",
      "Local SQLite storage for memory, audit logs and project profiles",
      "Ollama model status, model selection and local chat",
      "Whitelisted build diagnostics and command execution",
      "Pocket pairing through a token-protected local or tunneled connection",
      "Windows installer path prepared with Tauri",
    ],
    status: "Active development - Windows",
    localized: {
      dk: {
        category: "Local-first Windows desktop-agent",
        description:
          "En Windows desktop-agent under udvikling med React-interface, lokal Python-daemon, opgavestyring, projektanalyse, audit-events og planlagt Tauri-pakning.",
        capabilities: [
          "Lokalt desktop-dashboard til agentarbejde",
          "Lokal daemon via localhost API'er",
          "Oprettelse, status og eksekveringsflow for opgaver",
          "Projektregistrering og repository-analyse",
          "Lokal SQLite-lagring til hukommelse, audit logs og projektprofiler",
          "Ollama modelstatus, modelvalg og lokal chat",
          "Whitelisted build diagnostics og kommandokørsel",
          "Pocket-parring via tokenbeskyttet lokal eller tunneled forbindelse",
          "Windows installer-retning klargjort med Tauri",
        ],
        status: "Aktiv udvikling - Windows",
      },
      se: {
        category: "Local-first Windows-skrivbordsagent",
        description: "En local-first skrivbordsagent under aktiv utveckling för kontrollerat repository-arbete, diagnostik, patchning och verifierade ingenjörsarbetsflöden.",
        capabilities: [
          "Lokalt skrivbordsdashboard för agentarbete",
          "Lokal daemon via localhost-API:er",
          "Skapande, status och exekveringsflöde för uppgifter",
          "Projektregistrering och repository-analys",
          "Lokal SQLite-lagring för minne, audit logs och projektprofiler",
          "Ollama-modellstatus, modellval och lokal chatt",
          "Vitlistad build-diagnostik och kommandokörning",
          "Pocket-parkoppling via tokenskyddad lokal eller tunnlad anslutning",
          "Windows-installationsväg förberedd med Tauri",
        ],
        status: "Aktiv utveckling – Windows",
      },
      de: {
        category: "Local-first Windows-Desktop-Agent",
        description: "Ein local-first Desktop-Agent in aktiver Entwicklung für kontrollierte Repository-Arbeit, Diagnose, Patching und verifizierte Engineering-Workflows.",
        capabilities: [
          "Lokales Desktop-Dashboard für Agentenarbeit",
          "Lokaler Daemon über localhost-APIs",
          "Erstellung, Status und Ausführungsablauf von Aufgaben",
          "Projektregistrierung und Repository-Analyse",
          "Lokale SQLite-Speicherung für Speicher, Audit-Logs und Projektprofile",
          "Ollama-Modellstatus, Modellauswahl und lokaler Chat",
          "Whitelisted Build-Diagnose und Befehlsausführung",
          "Pocket-Kopplung über eine tokengeschützte lokale oder getunnelte Verbindung",
          "Windows-Installer-Weg vorbereitet mit Tauri",
        ],
        status: "Aktive Entwicklung – Windows",
      },
    },
  },
  {
    name: "Service OS",
    category: "Restaurant Service Operations SaaS",
    description:
      "Restaurant service software currently in development for floor planning, reservations, service timing and front-of-house coordination.",
    capabilities: [
      "Table awareness and floor planning",
      "Reservation and service timing",
      "Operational coordination for front-of-house teams",
    ],
    status: "Active development",
    localized: {
      dk: {
        category: "Restaurant service operations SaaS",
        description:
          "Restaurantsoftware til service under udvikling med fokus på floorplan, reservationer, timing og koordinering i front-of-house.",
        capabilities: [
          "Bordoverblik og floorplan",
          "Reservationer og timing af service",
          "Koordinering for front-of-house teams",
        ],
        status: "Aktiv udvikling",
      },
      se: {
        category: "SaaS för restaurangservice",
        description: "Restaurangservicemjukvara under utveckling för bordsplanering, bokningar, servicetiming och koordinering i front-of-house.",
        capabilities: ["Bordöversikt och bordsplanering", "Bokningar och servicetiming", "Operativ koordinering för front-of-house-team"],
        status: "Aktiv utveckling",
      },
      de: {
        category: "SaaS für Restaurant-Serviceabläufe",
        description: "Restaurant-Service-Software in Entwicklung für Tischplanung, Reservierungen, Service-Timing und Koordination im Front-of-House.",
        capabilities: ["Tischübersicht und Tischplanung", "Reservierungen und Service-Timing", "Betriebliche Koordination für Front-of-House-Teams"],
        status: "Aktive Entwicklung",
      },
    },
  },
  {
    name: "AI Visual Studio",
    category: "AI Creative Platform",
    description:
      "An AI-powered creative platform concept for transforming, editing and animating visual content through generative models.",
    capabilities: ["Image-to-image workflows", "Image-to-video generation", "Creative editing workflows", "Multi-model architecture", "Personal media library"],
    status: "Concept",
    localized: {
      dk: {
        category: "AI kreativ platform",
        description: "Et AI-drevet kreativt platformskoncept til at transformere, redigere og animere visuelt indhold med generative modeller.",
        capabilities: ["Image-to-image workflows", "Image-to-video-generering", "Kreative redigeringsworkflows", "Multi-model-arkitektur", "Personligt mediebibliotek"],
        status: "Koncept",
      },
      se: {
        category: "AI-kreativ plattform",
        description: "Ett AI-drivet kreativt plattformskoncept för att transformera, redigera och animera visuellt innehåll med generativa modeller.",
        capabilities: ["Image-to-image-arbetsflöden", "Image-to-video-generering", "Kreativa redigeringsflöden", "Multi-modellarkitektur", "Personligt mediebibliotek"],
        status: "Koncept",
      },
      de: {
        category: "KI-Kreativplattform",
        description: "Ein KI-gestütztes kreatives Plattformkonzept zum Transformieren, Bearbeiten und Animieren visueller Inhalte mit generativen Modellen.",
        capabilities: ["Image-to-Image-Workflows", "Image-to-Video-Generierung", "Kreative Bearbeitungs-Workflows", "Multi-Modell-Architektur", "Persönliche Medienbibliothek"],
        status: "Konzept",
      },
    },
  },
  {
    name: "Meeting Copilot",
    category: "Private Meeting Assistant",
    description:
      "A real-time meeting assistant concept designed for private use without retaining meeting recordings.",
    capabilities: ["Microphone transcription", "Rolling context", "Question detection", "Short suggested answers", "Privacy-conscious session design"],
    status: "Concept",
    localized: {
      dk: {
        category: "Privat mødeassistent",
        description: "Et koncept til en realtids mødeassistent designet til privat brug uden at gemme mødeoptagelser.",
        capabilities: ["Mikrofontranskription", "Løbende kontekst", "Spørgsmålsdetektion", "Korte forslag til svar", "Privatlivsbevidst sessionsdesign"],
        status: "Koncept",
      },
      se: {
        category: "Privat mötesassistent",
        description: "Ett koncept för en mötesassistent i realtid, utformad för privat bruk utan att spara mötesinspelningar.",
        capabilities: ["Mikrofontranskription", "Löpande kontext", "Frågedetektering", "Korta föreslagna svar", "Integritetsmedvetet sessionsdesign"],
        status: "Koncept",
      },
      de: {
        category: "Privater Meeting-Assistent",
        description: "Ein Konzept für einen Echtzeit-Meeting-Assistenten für den privaten Gebrauch, ohne Meeting-Aufnahmen zu speichern.",
        capabilities: ["Mikrofontranskription", "Fortlaufender Kontext", "Fragenerkennung", "Kurze Antwortvorschläge", "Datenschutzbewusstes Sitzungsdesign"],
        status: "Konzept",
      },
    },
  },
  {
    name: "CodeQuest",
    category: "Inclusive Programming Education",
    description:
      "A programming education product for autistic children, designed with sensory settings, clear feedback and supported learning paths.",
    capabilities: ["Sensory settings", "Focus mode", "Friendly error handling", "Code editor and guided tutor", "Parent mode and multilingual paths"],
    status: "In development - Android and iOS",
    localized: {
      dk: {
        category: "Inkluderende programmeringsundervisning",
        description: "Et programmeringsundervisningsprodukt til autistiske børn, designet med sensoriske indstillinger, tydelig feedback og understøttede læringsforløb.",
        capabilities: ["Sensoriske indstillinger", "Fokustilstand", "Venlig fejlhåndtering", "Kodeeditor og guidet tutor", "Forældretilstand og flersprogede forløb"],
        status: "Under udvikling - Android og iOS",
      },
      se: {
        category: "Inkluderande programmeringsutbildning",
        description: "En produkt för programmeringsutbildning för autistiska barn, utformad med sensoriska inställningar, tydlig feedback och stödda inlärningsvägar.",
        capabilities: ["Sensoriska inställningar", "Fokusläge", "Vänlig felhantering", "Kodredigerare och guidad handledare", "Föräldraläge och flerspråkiga vägar"],
        status: "Under utveckling – Android och iOS",
      },
      de: {
        category: "Inklusive Programmierbildung",
        description: "Ein Programmierbildungsprodukt für autistische Kinder, gestaltet mit sensorischen Einstellungen, klarem Feedback und unterstützten Lernpfaden.",
        capabilities: ["Sensorische Einstellungen", "Fokusmodus", "Freundliche Fehlerbehandlung", "Code-Editor und geführter Tutor", "Elternmodus und mehrsprachige Lernpfade"],
        status: "In Entwicklung – Android und iOS",
      },
    },
  },
  {
    name: "Food Cost Calculator",
    category: "Restaurant Utility App",
    description:
      "A mobile tool concept for recipe cost, servings, selling price and margin calculations with local persistence.",
    capabilities: ["Recipe cost calculation", "Servings and yield", "Selling price guidance", "Margin calculation", "Local persistence"],
    status: "Concept",
    localized: {
      dk: {
        category: "Restaurantværktøjs-app",
        description: "Et koncept til et mobilværktøj til opskriftspris, portioner, salgspris og avanceberegninger med lokal lagring.",
        capabilities: ["Beregning af opskriftspris", "Portioner og udbytte", "Vejledning til salgspris", "Avanceberegning", "Lokal lagring"],
        status: "Koncept",
      },
      se: {
        category: "Restaurangverktygsapp",
        description: "Ett koncept för ett mobilverktyg för receptkostnad, portioner, försäljningspris och marginalberäkningar med lokal lagring.",
        capabilities: ["Beräkning av receptkostnad", "Portioner och utbyte", "Vägledning för försäljningspris", "Marginalberäkning", "Lokal lagring"],
        status: "Koncept",
      },
      de: {
        category: "Restaurant-Utility-App",
        description: "Ein mobiles Tool-Konzept für Rezeptkosten, Portionen, Verkaufspreis und Margenberechnung mit lokaler Speicherung.",
        capabilities: ["Berechnung der Rezeptkosten", "Portionen und Ausbeute", "Verkaufspreis-Empfehlung", "Margenberechnung", "Lokale Speicherung"],
        status: "Konzept",
      },
    },
  },
  {
    name: "WasteTrackr",
    category: "Restaurant Utility App",
    description:
      "A mobile waste logging tool concept for restaurant teams with a practical history and operational overview.",
    capabilities: ["Waste logging", "Operational dashboard", "History and editing", "Date filters", "Team-facing insight"],
    status: "Concept",
    localized: {
      dk: {
        category: "Restaurantværktøjs-app",
        description: "Et koncept til et mobilt spildregistreringsværktøj til restaurantteams med praktisk historik og driftsoverblik.",
        capabilities: ["Spildregistrering", "Driftsdashboard", "Historik og redigering", "Datofiltre", "Indsigt til teamet"],
        status: "Koncept",
      },
      se: {
        category: "Restaurangverktygsapp",
        description: "Ett koncept för ett mobilt verktyg för svinnregistrering för restaurangteam, med praktisk historik och driftsöversikt.",
        capabilities: ["Svinnregistrering", "Driftsdashboard", "Historik och redigering", "Datumfilter", "Insikt för teamet"],
        status: "Koncept",
      },
      de: {
        category: "Restaurant-Utility-App",
        description: "Ein mobiles Konzept zur Erfassung von Lebensmittelverschwendung für Restaurantteams mit praktischer Historie und Betriebsüberblick.",
        capabilities: ["Erfassung von Verschwendung", "Betriebs-Dashboard", "Historie und Bearbeitung", "Datumsfilter", "Einblicke für das Team"],
        status: "Konzept",
      },
    },
  },
  {
    name: "Restaurant Micro-tools",
    category: "Hospitality Operations",
    description:
      "A focused product line concept for inventory, recipe cost, menu engineering and accountable kitchen routines.",
    capabilities: ["Inventory", "Recipe Cost", "Menu Engineering", "Shift Checklist", "Optional Pocket connection"],
    status: "Active development",
    localized: {
      dk: {
        category: "Hospitality-drift",
        description: "Et fokuseret koncept for en produktlinje til lager, opskriftspris, menu engineering og ansvarlige køkkenrutiner.",
        capabilities: ["Lager", "Opskriftspris", "Menu Engineering", "Vagtcheckliste", "Valgfri Pocket-forbindelse"],
        status: "Aktiv udvikling",
      },
      se: {
        category: "Hospitality-drift",
        description: "Ett fokuserat produktlinjekoncept för lager, receptkostnad, menyutveckling och ansvarsfulla köksrutiner.",
        capabilities: ["Lager", "Receptkostnad", "Menu Engineering", "Skiftchecklista", "Valfri Pocket-anslutning"],
        status: "Aktiv utveckling",
      },
      de: {
        category: "Gastgewerbe-Betrieb",
        description: "Ein fokussiertes Produktlinienkonzept für Lagerbestand, Rezeptkosten, Menu Engineering und nachvollziehbare Küchenroutinen.",
        capabilities: ["Lagerbestand", "Rezeptkosten", "Menu Engineering", "Schichtcheckliste", "Optionale Pocket-Verbindung"],
        status: "Aktive Entwicklung",
      },
    },
  },
  {
    name: "FollowUp, PingPerson and Recall",
    category: "Local-first Utilities",
    description:
      "Android-first utility product concepts for reply obligations, person-triggered context and intentional memory resurfacing.",
    capabilities: ["Follow-up commitments", "Person-based talking points", "Intentional memory capture", "Explicit permissions", "Pocket-ready product direction"],
    status: "In development - Android-first",
    localized: {
      dk: {
        category: "Local-first værktøjer",
        description: "Android-first værktøjskoncepter til svarforpligtelser, personudløst kontekst og bevidst genkaldelse af hukommelse.",
        capabilities: ["Opfølgningsforpligtelser", "Personbaserede talepunkter", "Bevidst hukommelsesregistrering", "Eksplicitte tilladelser", "Pocket-klar produktretning"],
        status: "Under udvikling - Android-first",
      },
      se: {
        category: "Local-first-verktyg",
        description: "Android-first verktygskoncept för svarsförpliktelser, personutlöst kontext och medveten återkallning av minnen.",
        capabilities: ["Uppföljningsåtaganden", "Personbaserade samtalspunkter", "Medveten minnesinsamling", "Uttryckliga behörigheter", "Pocket-redo produktinriktning"],
        status: "Under utveckling – Android-first",
      },
      de: {
        category: "Local-first-Tools",
        description: "Android-first Utility-Produktkonzepte für Antwortverpflichtungen, personenausgelösten Kontext und bewusstes Wiederauftauchen von Erinnerungen.",
        capabilities: ["Follow-up-Verpflichtungen", "Personenbezogene Gesprächspunkte", "Bewusste Speichererfassung", "Ausdrückliche Berechtigungen", "Pocket-fähige Produktrichtung"],
        status: "In Entwicklung – Android-first",
      },
    },
  },
  {
    name: "Family Safety",
    category: "Family Location and Safety",
    description:
      "A family safety product concept with parent and child roles, clear location controls and privacy-first platform behavior.",
    capabilities: ["Parent and child roles", "Live location", "Safe and restricted zones", "Alerts and SOS", "Device health and privacy controls"],
    status: "In development - Android and iOS",
    localized: {
      dk: {
        category: "Familielokation og sikkerhed",
        description: "Et koncept til et familiesikkerhedsprodukt med forælder- og børneroller, tydelig lokationsstyring og privatlivsorienteret platformadfærd.",
        capabilities: ["Forælder- og børneroller", "Live lokation", "Sikre og begrænsede zoner", "Alarmer og SOS", "Enhedstjek og privatlivskontrol"],
        status: "Under udvikling - Android og iOS",
      },
      se: {
        category: "Familjeplats och säkerhet",
        description: "Ett koncept för en familjesäkerhetsprodukt med föräldra- och barnroller, tydlig platskontroll och integritetsfokuserat plattformsbeteende.",
        capabilities: ["Föräldra- och barnroller", "Live-plats", "Säkra och begränsade zoner", "Larm och SOS", "Enhetshälsa och integritetskontroller"],
        status: "Under utveckling – Android och iOS",
      },
      de: {
        category: "Familienstandort und Sicherheit",
        description: "Ein Familiensicherheitsprodukt-Konzept mit Eltern- und Kindrollen, klarer Standortkontrolle und datenschutzorientiertem Plattformverhalten.",
        capabilities: ["Eltern- und Kindrollen", "Live-Standort", "Sichere und eingeschränkte Zonen", "Alarme und SOS", "Gerätezustand und Datenschutzeinstellungen"],
        status: "In Entwicklung – Android und iOS",
      },
    },
  },
  {
    name: "UnderStack Product Ecosystem",
    category: "Shared Platform Strategy",
    description:
      "An early foundation concept for identity, permission boundaries and audited cross-product workflows across web, mobile and desktop software.",
    capabilities: ["Shared identity", "Capability manifests", "Permission boundaries", "Action routing", "Audited cross-product workflows"],
    status: "Concept",
    localized: {
      dk: {
        category: "Delt platformstrategi",
        description: "Et tidligt fundamentkoncept for identitet, tilladelsesgrænser og reviderede tværprodukt-workflows på tværs af web-, mobil- og desktopsoftware.",
        capabilities: ["Delt identitet", "Capability manifests", "Tilladelsesgrænser", "Handlingsrouting", "Reviderede tværprodukt-workflows"],
        status: "Koncept",
      },
      se: {
        category: "Delad plattformsstrategi",
        description: "Ett tidigt grundkoncept för identitet, behörighetsgränser och granskade tvärprodukts-arbetsflöden över webb-, mobil- och skrivbordsmjukvara.",
        capabilities: ["Delad identitet", "Capability-manifest", "Behörighetsgränser", "Handlingsdirigering", "Granskade tvärprodukts-arbetsflöden"],
        status: "Koncept",
      },
      de: {
        category: "Gemeinsame Plattformstrategie",
        description: "Ein frühes Grundlagenkonzept für Identität, Berechtigungsgrenzen und auditierte produktübergreifende Workflows über Web-, Mobile- und Desktop-Software hinweg.",
        capabilities: ["Gemeinsame Identität", "Capability-Manifeste", "Berechtigungsgrenzen", "Aktionsrouting", "Auditierte produktübergreifende Workflows"],
        status: "Konzept",
      },
    },
  },
];

export const portfolioPages: SeoPage[] = [
  {
    lang: "dk",
    slug: "portfolio",
    kind: "portfolio",
    title: "Portfolio | UnderStack softwaresystemer og SaaS-produkter",
    description:
      "Fire projekter fra UnderStack med kode, en URL eller en navngiven kunde bag: GastroApp, Life, UnderStack Pocket AI og platformmodernisering for Peritar (ASEPCO).",
    h1: "Udvalgt arbejde",
    eyebrow: "Portfolio",
    intro:
      "Et lille, bevidst afgrænset udvalg af projekter — ikke en fuld liste over alt, der er i gang. Andre produkter under udvikling ligger på en separat side.",
    sections: [
      {
        title: "Software bygget til reel drift.",
        body:
          "GastroApp og Peritar (ASEPCO) er i aktiv brug hos rigtige brugere. Life og UnderStack Pocket AI er færdige produkter i Google Play-review. Flere tidlige koncepter er samlet på en separat side i stedet for at blande dem ind her.",
      },
    ],
    related: [
      { label: "Andre projekter under udvikling", href: "/dk/andre-projekter" },
      { label: "Softwareudvikling", href: "/dk/softwareudvikling" },
      { label: "Kontakt", href: "mailto:dev.team@understack.dk" },
    ],
    cta: "Diskuter dit projekt",
    keywords: ["softwareudvikling Danmark", "softwareudvikling Aarhus", "SaaS udvikling", "custom software development", "AI løsninger", "restaurant software", "business software"],
  },
  {
    lang: "en",
    slug: "portfolio",
    kind: "portfolio",
    title: "Portfolio | UnderStack software systems and SaaS products",
    description:
      "Four UnderStack projects backed by code, a live URL or a named client: GastroApp, Life, UnderStack Pocket AI and platform modernization for Peritar (ASEPCO).",
    h1: "Selected Work",
    eyebrow: "Portfolio",
    intro:
      "A small, deliberately limited set of projects — not a full list of everything in progress. Other products in development live on a separate page.",
    sections: [
      {
        title: "Software built for real-world operations.",
        body:
          "GastroApp and Peritar (ASEPCO) are in active use by real users. Life and UnderStack Pocket AI are completed products in Google Play review. Earlier-stage concepts are kept on a separate page instead of mixed in here.",
      },
    ],
    related: [
      { label: "Other projects in development", href: "/en/other-projects" },
      { label: "Software development", href: "/en/software-development" },
      { label: "Contact", href: "mailto:dev.team@understack.dk" },
    ],
    cta: "Discuss your project",
    keywords: ["software development Denmark", "software development Aarhus", "SaaS development", "custom software development", "AI solutions", "restaurant software", "business software"],
  },
];

export const archivePages: SeoPage[] = [
  {
    lang: "dk",
    slug: "andre-projekter",
    kind: "archive",
    title: "Andre projekter under udvikling | UnderStack",
    description: "Tidlige koncepter og produkter under udvikling fra UnderStack, uden endnu offentlig evidens i form af kode, URL eller kunde.",
    h1: "Andre projekter under udvikling.",
    eyebrow: "Under udvikling",
    intro:
      "Disse er tidlige koncepter og produkter, jeg arbejder på ved siden af de projekter, der er samlet i Portfolio. De har endnu ikke en offentlig URL, et repo eller en kunde bag sig, så de er holdt adskilt fra de dokumenterede cases.",
    sections: [
      { title: "Hvorfor en separat side", body: "Portfolio-siden er bevidst afgrænset til projekter, der kan verificeres. Det, der står her, er retninger og koncepter under udvikling — ikke færdige leverancer." },
    ],
    related: [
      { label: "Portfolio", href: "/dk/portfolio" },
      { label: "Cases", href: "/dk/cases/" },
      { label: "Kontakt", href: "mailto:dev.team@understack.dk" },
    ],
    cta: "Diskuter en idé",
    keywords: ["UnderStack produkter under udvikling", "software koncepter"],
  },
  {
    lang: "en",
    slug: "other-projects",
    kind: "archive",
    title: "Other projects in development | UnderStack",
    description: "Early-stage concepts and products in development from UnderStack, without public evidence yet such as code, a URL or a client.",
    h1: "Other projects in development.",
    eyebrow: "In development",
    intro:
      "These are early-stage concepts and products I'm working on alongside the projects collected in Portfolio. They do not yet have a public URL, a repo or a client behind them, so they're kept separate from the documented cases.",
    sections: [
      { title: "Why a separate page", body: "The Portfolio page is deliberately limited to projects that can be verified. What's listed here are directions and concepts in development, not finished deliverables." },
    ],
    related: [
      { label: "Portfolio", href: "/en/portfolio" },
      { label: "Cases", href: "/en/cases/" },
      { label: "Contact", href: "mailto:dev.team@understack.dk" },
    ],
    cta: "Discuss an idea",
    keywords: ["UnderStack products in development", "software concepts"],
  },
];

const insights = [
  ["dk", "hvad-koster-en-hjemmeside-i-danmark", "Hvad koster en hjemmeside i Danmark?", "En realistisk guide til pris på virksomhedswebsites i Danmark, hvad der driver prisen, og hvornår custom udvikling giver mening.", "/dk/webudvikling"],
  ["dk", "hvad-koster-softwareudvikling-i-danmark", "Hvad koster softwareudvikling i Danmark?", "Softwareudvikling afhænger af scope, integrationer, design, data og drift. Artiklen forklarer, hvordan virksomheder kan budgettere uden falsk præcision.", "/dk/softwareudvikling"],
  ["dk", "freelancer-vs-softwarebureau", "Freelancer vs softwarebureau", "Hvornår giver en freelancer mening, og hvornår kræver projektet et mere struktureret softwareteam eller studio?", "/dk/custom-software"],
  ["dk", "hvad-koster-en-app-at-udvikle", "Hvad koster en app at udvikle?", "App-priser afhænger af platform, backend, design, brugerroller og integrationer. Start med scope og product risk før features.", "/dk/app-udvikling"],
  ["dk", "ai-loesninger-til-danske-virksomheder", "AI-løsninger til danske virksomheder", "Praktiske AI-løsninger handler om automatisering, workflows og beslutningsstøtte, ikke kun chatbots.", "/dk/ai-loesninger"],
  ["dk", "restaurant-software-i-danmark", "Restaurant software i Danmark", "Restaurant software skal hjælpe med food cost, inventory, spild, serviceflow og operationelt overblik.", "/dk/restaurant-software"],
  ["dk", "hvordan-automatiserer-ai-restaurantdrift", "Hvordan automatiserer AI restaurantdrift?", "AI kan hjælpe restaurantdrift med planlægning, service-assistance, køkkenoverblik og beslutningsstøtte.", "/dk/restaurant-software"],
  ["en", "how-much-does-software-development-cost-in-denmark", "How much does software development cost in Denmark?", "A practical guide to the cost drivers behind software development in Denmark: scope, integrations, UX, data and maintenance.", "/en/software-development"],
  ["en", "how-much-does-a-business-website-cost-in-denmark", "How much does a business website cost in Denmark?", "Website pricing in Denmark depends on content, design, technical complexity, SEO and integrations. This guide explains the main tradeoffs.", "/en/web-development"],
  ["en", "custom-software-vs-saas", "Custom software vs SaaS", "When should a company choose custom software instead of SaaS? A practical comparison for operational systems and digital products.", "/en/custom-software"],
  ["en", "restaurant-management-software-in-denmark", "Restaurant management software in Denmark", "Restaurant management software should support food cost, inventory, kitchen workflows, waste tracking and service operations.", "/en/restaurant-software"],
  ["en", "ai-automation-for-european-businesses", "AI automation for European businesses", "AI automation works best when it is tied to specific workflows, human review and measurable operational friction.", "/en/ai-development"],
] as const;

const detailedInsightContent: Record<string, Pick<SeoPage, "sections" | "faqs">> = {
  "en/how-much-does-a-business-website-cost-in-denmark": {
    sections: [
      {
        title: "Start with the decision, not a template",
        body:
          "A useful website budget starts with the job the site needs to do. A focused brochure site, a content-heavy marketing platform and a customer-facing web application may all look like websites from the outside, but they require very different planning, design and engineering work.",
      },
      {
        title: "What actually changes the scope?",
        body:
          "The largest cost drivers are usually not visual details. They are the number of user journeys, the quality and availability of content, integrations with existing systems, language requirements, performance expectations, accessibility, analytics and the amount of custom functionality required after launch.",
        items: [
          "Information architecture, content and conversion paths",
          "Design depth and responsive behaviour",
          "CMS, forms, booking, payments or CRM integrations",
          "SEO migration, analytics and technical performance",
          "Custom customer areas, workflows or data models",
          "Ongoing ownership, maintenance and iteration",
        ],
      },
      {
        title: "A practical way to budget",
        body:
          "Rather than asking for a single price before the scope is clear, split the work into three decisions: what must be true at launch, what can be measured after launch, and what belongs in a later iteration. This creates a credible first release without hiding future technical or content work inside a vague fixed quote.",
      },
      {
        title: "When a website becomes a web platform",
        body:
          "A project stops being a conventional website when it needs user accounts, operational workflows, structured data, permissions, internal tools or recurring integrations. At that point, the right comparison is not between visual packages but between a lightweight product architecture and the operational value it needs to support.",
      },
      {
        title: "Questions worth answering before requesting a proposal",
        body:
          "A stronger brief helps both sides make better decisions. Define the business outcome, essential audience journeys, the content that exists today, systems that must connect, who owns decisions and what should be measurable after launch. That is more useful than selecting features from a generic checklist.",
      },
    ],
    faqs: [
      {
        question: "Is a template website always the lower-cost option?",
        answer:
          "It can reduce the initial build effort, especially for a simple site with ready content. It becomes less efficient when the business needs a distinct conversion flow, reliable integrations, unusual content structure or functionality that the template was not designed to support.",
      },
      {
        question: "Should SEO be part of the initial website scope?",
        answer:
          "Yes. Page structure, redirects, metadata, content migration, performance and analytics are easier to handle during the build than after a site has already been launched and indexed.",
      },
      {
        question: "How should a business compare website proposals?",
        answer:
          "Compare the defined outcome, scope boundaries, content responsibilities, technical ownership, launch process and what happens after launch. A proposal with a lower headline figure can still create more work later if these points are unclear.",
      },
    ],
  },
};

export const insightPages: SeoPage[] = [
  {
    lang: "dk",
    slug: "insights",
    kind: "insightIndex",
    title: "Insights | UnderStack SEO guides om software, AI og web",
    description: "Guides om webudvikling, softwareudvikling, AI-løsninger, restaurant software og digitale produkter i Danmark.",
    h1: "Insights om software, web, AI og digitale produkter.",
    eyebrow: "Content hub",
    intro: "Praktiske artikler skrevet til virksomheder, der skal træffe bedre beslutninger om digitale produkter og software.",
    sections: [{ title: "Hvad du finder her", body: "Praktiske artikler om priser, teknologivalg og beslutninger, som virksomheder kan bruge, før de sætter et softwareprojekt i gang." }],
    related: [],
    cta: "Læs guides",
    keywords: ["software insights Danmark", "webudvikling guide", "AI løsninger guide"],
  },
  {
    lang: "en",
    slug: "insights",
    kind: "insightIndex",
    title: "Insights | UnderStack guides on software, AI and web",
    description: "Guides about software development, AI solutions, restaurant software and web platforms in Denmark and Europe.",
    h1: "Insights on software, web, AI and digital products.",
    eyebrow: "Content hub",
    intro: "Practical articles for companies making better decisions about software systems and digital products.",
    sections: [{ title: "What you'll find here", body: "Practical articles about pricing, technology choices and decisions companies can use before starting a software project." }],
    related: [],
    cta: "Read guides",
    keywords: ["software development Denmark guide", "AI automation Europe", "restaurant software guide"],
  },
  ...insights.map(([lang, slug, title, description, target]) => {
    const detailedContent = detailedInsightContent[`${lang}/${slug}`];
    const defaultSections: SeoPage["sections"] = [
      {
        title: lang === "dk" ? "Kort svar" : "Short answer",
        body:
          lang === "dk"
            ? "Der findes ikke én rigtig pris eller løsning. Den rigtige beslutning afhænger af mål, kompleksitet, integrationsbehov, indhold, drift og hvor vigtig løsningen er for virksomheden."
            : "There is no single correct price or solution. The right decision depends on goals, complexity, integrations, content, operations and how important the system is to the business.",
      },
      {
        title: lang === "dk" ? "Hvad driver kompleksiteten?" : "What drives complexity?",
        body:
          lang === "dk"
            ? "De største drivere er antal brugerflows, datamodeller, integrationer, rettighedsniveauer, designkrav, SEO-krav, performance og behovet for løbende iteration."
            : "The biggest drivers are user flows, data models, integrations, permission levels, design quality, SEO needs, performance and the need for ongoing iteration.",
        items:
          lang === "dk"
            ? ["Scope og brugerroller", "Data og integrationer", "Design og indhold", "Drift, sikkerhed og vedligehold"]
            : ["Scope and user roles", "Data and integrations", "Design and content", "Operations, security and maintenance"],
      },
      {
        title: lang === "dk" ? "Næste skridt" : "Next step",
        body:
          lang === "dk"
            ? "Start med et lille, præcist scope og byg derefter videre baseret på reel brug. Det reducerer risiko og gør investeringen lettere at styre."
            : "Start with a small, precise scope and expand based on real use. That reduces risk and makes the investment easier to control.",
      },
    ];

    return {
      lang,
      slug: `insights/${slug}`,
      kind: "insight" as const,
      title: `${title} | UnderStack`,
      description,
      h1: title,
      eyebrow: lang === "dk" ? "Guide" : "Insight",
      intro: description,
      sections: detailedContent?.sections ?? defaultSections,
      faqs: detailedContent?.faqs,
      related: [
        { label: lang === "dk" ? "Relevant service" : "Related service", href: target },
        { label: lang === "dk" ? "Cases" : "Cases", href: `/${lang}/cases/` },
        { label: lang === "dk" ? "Kontakt" : "Contact", href: "mailto:dev.team@understack.dk" },
      ],
      cta: lang === "dk" ? "Tal med UnderStack" : "Talk to UnderStack",
      keywords: [title, "UnderStack", lang === "dk" ? "Danmark" : "Denmark"],
    };
  }),
];

export const appsPages: SeoPage[] = [
  {
    lang: "dk",
    slug: "apps",
    kind: "apps",
    title: "Apps | UnderStack produkter",
    description: "Released apps og aktive produktretninger fra UnderStack, herunder Food Cost Calculator, WasteTrackr og ServiceOS.",
    h1: "Apps og produktpipeline.",
    eyebrow: "UnderStack Apps",
    intro: "En oversigt over released apps og produkter under udvikling i UnderStack-økosystemet.",
    sections: [
      { title: "Released", body: "Food Cost Calculator og WasteTrackr er dokumenteret som released restaurant utility apps." },
      { title: "In development", body: "ServiceOS og yderligere UnderStack utilities er markeret som produkter under udvikling." },
    ],
    related: [
      { label: "GastroApp", href: "/dk/cases/gastroapp" },
      { label: "Restaurant software", href: "/dk/restaurant-software" },
      { label: "Marketplace", href: "/dk/marketplace" },
    ],
    cta: "Kontakt produktteamet",
    keywords: ["UnderStack apps", "restaurant utility apps", "ServiceOS"],
  },
  {
    lang: "en",
    slug: "apps",
    kind: "apps",
    title: "Apps | UnderStack products",
    description: "Released apps and active product directions from UnderStack, including Food Cost Calculator, WasteTrackr and ServiceOS.",
    h1: "Apps and product pipeline.",
    eyebrow: "UnderStack Apps",
    intro: "A view of released apps and active product development inside the UnderStack ecosystem.",
    sections: [
      { title: "Released", body: "Food Cost Calculator and WasteTrackr are documented as released restaurant utility apps." },
      { title: "In development", body: "ServiceOS and additional UnderStack utilities are marked as products in development." },
    ],
    related: [
      { label: "GastroApp", href: "/en/cases/gastroapp" },
      { label: "Restaurant software", href: "/en/restaurant-software" },
      { label: "Marketplace", href: "/en/marketplace" },
    ],
    cta: "Contact the product team",
    keywords: ["UnderStack apps", "restaurant utility apps", "ServiceOS"],
  },
  {
    lang: "dk",
    slug: "marketplace",
    kind: "marketplace",
    title: "Marketplace | UnderStack code assets",
    description: "Kodeaktiver, templates og genanvendelige udviklerprodukter fra UnderStack.",
    h1: "Marketplace for code assets og reusable software.",
    eyebrow: "UnderStack Marketplace",
    intro: "UnderStack udvikler en marketplace-retning med templates, packaged apps og reusable software assets.",
    sections: [
      { title: "Retning", body: "Codester-profilen bruges til at distribuere templates, apps og genanvendelige kodeaktiver." },
    ],
    related: [
      { label: "Apps", href: "/dk/apps" },
      { label: "Custom software", href: "/dk/custom-software" },
      { label: "Codester", href: "https://www.codester.com/UnderStack/" },
    ],
    cta: "Se apps",
    keywords: ["UnderStack marketplace", "code assets", "software templates"],
  },
  {
    lang: "en",
    slug: "marketplace",
    kind: "marketplace",
    title: "Marketplace | UnderStack code assets",
    description: "Code assets, templates and reusable developer products from UnderStack.",
    h1: "Marketplace for code assets and reusable software.",
    eyebrow: "UnderStack Marketplace",
    intro: "UnderStack is developing a marketplace direction with templates, packaged apps and reusable software assets.",
    sections: [
      { title: "Direction", body: "The Codester profile is used to distribute templates, apps and reusable code assets." },
    ],
    related: [
      { label: "Apps", href: "/en/apps" },
      { label: "Custom software", href: "/en/custom-software" },
      { label: "Codester", href: "https://www.codester.com/UnderStack/" },
    ],
    cta: "View apps",
    keywords: ["UnderStack marketplace", "code assets", "software templates"],
  },
];

const sourcePages = [...pages, ...servicePages, ...casePages, ...portfolioPages, ...archivePages, ...insightPages, ...appsPages, ...forYouPages];

function localizedPage(source: SeoPage, language: "se" | "de"): SeoPage {
  return {
    ...source,
    lang: language,
    translationKey: translationKeyFor(source),
    title: localizeText(source.title, language),
    description: localizeText(source.description, language),
    h1: localizeText(source.h1, language),
    eyebrow: localizeText(source.eyebrow, language),
    intro: localizeText(source.intro, language),
    sections: source.sections.map((section) => ({
      title: localizeText(section.title, language),
      body: localizeText(section.body, language),
      items: section.items?.map((item) => localizeText(item, language)),
      variant: section.variant,
    })),
    faqs: source.faqs?.map((faq) => ({
      question: localizeText(faq.question, language),
      answer: localizeText(faq.answer, language),
    })),
    related: source.related.map((link) => ({ ...link, label: localizeText(link.label, language) })),
    cta: localizeText(source.cta, language),
    keywords: source.keywords.map((keyword) => localizeText(keyword, language)),
  };
}

const localizedPages = (["se", "de"] as const).flatMap((language) =>
  sourcePages
    .filter((page) => page.lang === "en")
    .map((page) => localizedPage(page, language)),
);

// Sweden-only SEO page: link it from every other Swedish page so it is
// reachable through internal navigation, not just the sitemap.
const tekniskSeoRelatedLink = { label: "Teknisk SEO Sverige", href: "/en/teknisk-seo-sverige" };
for (const page of localizedPages) {
  if (page.lang !== "se" || page.slug === "teknisk-seo-sverige") continue;
  if (page.related.some((link) => link.href.endsWith("/teknisk-seo-sverige"))) continue;
  page.related = [...page.related, tekniskSeoRelatedLink];
}

export const allPages = [...sourcePages, ...localizedPages];

export function findPage(lang: Language, slug = "") {
  const normalized = slug.replace(/^\/|\/$/g, "");
  return allPages.find((page) => page.lang === lang && page.slug === normalized);
}

export function alternateFor(page: SeoPage, lang: Language) {
  const candidate = allPages.find((item) => item.lang === lang && translationKeyFor(item) === translationKeyFor(page));
  if (candidate) return pagePath(candidate);

  // Insight slugs are translated per-article and do not always have a 1:1
  // counterpart in the other language. Falling through to the homepage in
  // that case is misleading, so point to the insights index instead.
  if (page.kind === "insight") {
    const insightIndex = allPages.find((item) => item.lang === lang && item.kind === "insightIndex");
    if (insightIndex) return pagePath(insightIndex);
  }

  return `/${lang}/`;
}
