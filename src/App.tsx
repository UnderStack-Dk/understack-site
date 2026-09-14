import { type FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { trackEvent } from "./lib/analytics";
import { techStackIcons } from "./lib/techStack";
import { githubStats } from "./lib/githubStats";
import { localizeText } from "./localization";
import { COMPANY_PHONE_DISPLAY, COMPANY_PHONE_INTERNATIONAL } from "./lib/contact";
import { CurrencyProvider, useCurrency } from "./lib/currency";
import { CopyPhoneButton, SmsContactLink } from "./components/SmsContact";
import LifePrivacyPage from "./pages/LifePrivacyPage";
import logo from "./assets/understack-logo.png";
import PageMeta from "./components/PageMeta";
import PocketPrivacyPage from "./pages/PocketPrivacyPage";
import ProductScreenshotGallery from "./components/ProductScreenshotGallery";
import { productScreenshots } from "./lib/productAssets";
import {
  allPages,
  alternateFor,
  archivedProjects,
  COMPANY_CVR,
  CONTACT_EMAIL,
  findPage,
  GENERAL_EMAIL,
  languageTags,
  languageNames,
  pageAlternates,
  pagePath,
  portfolioProjects,
  SITE_URL,
  type Language,
  type PortfolioProject,
  type SeoPage,
} from "./seoContent";

function isLanguage(value: string | undefined): value is Language {
  return value === "dk" || value === "en" || value === "se" || value === "de";
}

function languageCopy<T>(language: Language, values: Record<Language, T>) {
  return values[language];
}

function localUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UnderStack",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: GENERAL_EMAIL,
    telephone: COMPANY_PHONE_INTERNATIONAL,
    vatID: `DK${COMPANY_CVR}`,
    areaServed: ["Aarhus", "Denmark", "Nordics", "Europe"],
    knowsAbout: ["Software development", "Web development", "Custom software", "AI solutions", "Restaurant software"],
  };
}

// Exported for the SSG entry so prerendered pages and client navigation share identical schema.
// eslint-disable-next-line react-refresh/only-export-components
export function schemaFor(page: SeoPage) {
  const path = pagePath(page);
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "UnderStack", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: page.h1, item: localUrl(path) },
  ];
  const base: Record<string, unknown>[] = [
    organizationSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "UnderStack",
      url: SITE_URL,
      inLanguage: languageTags[page.lang],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.description,
      url: localUrl(path),
      inLanguage: languageTags[page.lang],
      isPartOf: { "@type": "WebSite", name: "UnderStack", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
  ];

  if (page.kind === "service") {
    base.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.description,
      provider: { "@type": "Organization", name: "UnderStack", url: SITE_URL },
      serviceType: page.keywords,
      areaServed: page.lang === "dk" ? ["Aarhus", "Danmark"] : page.lang === "se" ? ["Sweden", "Nordics", "Europe"] : page.lang === "de" ? ["Germany", "Europe"] : ["Aarhus", "Denmark", "Europe"],
      url: localUrl(path),
    });
  }

  if (page.kind === "forYou") {
    base.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "UnderStack For You",
      description: page.description,
      provider: { "@type": "Organization", name: "UnderStack", url: SITE_URL },
      areaServed: ["Aarhus", "Denmark"],
      url: localUrl(path),
      offers: [
        { "@type": "Offer", name: "Personal website", price: "1500", priceCurrency: "DKK" },
        { "@type": "Offer", name: "Small web app or custom tool", price: "4500", priceCurrency: "DKK" },
      ],
    });
  }

  if (page.kind === "case") {
    base.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: page.h1.split(":")[0],
      applicationCategory: "BusinessApplication",
      description: page.description,
      operatingSystem: "Web",
      url: localUrl(path),
      offers: { "@type": "Offer", price: "0", priceCurrency: "DKK", availability: "https://schema.org/InDevelopment" },
    });
  }

  if (page.kind === "portfolio") {
    base.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.h1,
      description: page.description,
      url: localUrl(path),
      about: ["SaaS development", "Custom software development", "AI solutions", "Restaurant software", "Business platform modernization"],
      mainEntity: portfolioProjects.map((project) => ({
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        genre: project.category,
        locationCreated: project.location,
        url: project.cta?.href,
      })),
    });
  }

  if (page.kind === "insight") {
    base.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      author: { "@type": "Organization", name: "UnderStack" },
      publisher: { "@type": "Organization", name: "UnderStack", logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` } },
      mainEntityOfPage: localUrl(path),
      inLanguage: languageTags[page.lang],
    });
  }

  if (page.faqs?.length) {
    base.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return base;
}

function Header({ page }: { page: SeoPage }) {
  const currentPath = pagePath(page);
  const navLanguage = page.lang;
  const langLinks: Language[] = ["dk", "en", "se", "de"];
  const { currency, currencyOptions, setCurrency } = useCurrency();
  const nav = languageCopy(page.lang, {
    dk: { web: "Webudvikling", software: "Softwareudvikling", restaurant: "Restaurant", cases: "Cases", portfolio: "Portfolio", forYou: "For You", sms: "Skriv SMS", currency: "Valuta", chooseCurrency: "Vælg valuta" },
    en: { web: "Web", software: "Software", restaurant: "Restaurant", cases: "Cases", portfolio: "Portfolio", forYou: "For You", sms: "Send SMS", currency: "Currency", chooseCurrency: "Choose currency" },
    se: { web: "Webb", software: "Mjukvara", restaurant: "Restaurang", cases: "Case", portfolio: "Portfölj", forYou: "För dig", sms: "Skicka SMS", currency: "Valuta", chooseCurrency: "Välj valuta" },
    de: { web: "Web", software: "Software", restaurant: "Gastronomie", cases: "Projekte", portfolio: "Portfolio", forYou: "Für Sie", sms: "SMS senden", currency: "Währung", chooseCurrency: "Währung wählen" },
  });

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <a href={`/${navLanguage}/`} className="flex items-center gap-3">
          <img src={logo} alt="UnderStack logo" className="h-8 w-8" loading="eager" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/90">UnderStack</span>
        </a>
        <nav className="order-3 flex w-full items-center gap-5 overflow-x-auto pb-1 text-sm text-white/68 lg:order-none lg:w-auto lg:overflow-visible lg:pb-0" aria-label="Primary navigation">
          <a href={`/${navLanguage}/webudvikling-aarhus`} className={page.lang === "dk" ? "hover:text-white" : "hidden"}>
            {nav.web}
          </a>
          <a href={`/${navLanguage}/web-development`} className={page.lang !== "dk" ? "hover:text-white" : "hidden"}>
            {nav.web}
          </a>
          <a href={`/${navLanguage}/${page.lang === "dk" ? "softwareudvikling" : "software-development"}`} className="hover:text-white">
            {nav.software}
          </a>
          <a href={`/${navLanguage}/restaurant-software`} className="hover:text-white">
            {nav.restaurant}
          </a>
          <a href={`/${navLanguage}/cases/`} className="hover:text-white">
            {nav.cases}
          </a>
          <a href={`/${navLanguage}/portfolio`} className="hover:text-white">
            {nav.portfolio}
          </a>
          <a href={`/${navLanguage}/for-you`} className="hover:text-white">
            {nav.forYou}
          </a>
          <SmsContactLink language={page.lang} location="header" className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100 hover:bg-cyan-300/15">
            {nav.sms}
          </SmsContactLink>
        </nav>
        <div className="flex items-center gap-2 text-xs text-white/58" aria-label="Language and currency preferences">
          {langLinks.map((lang) => {
            const href = alternateFor(page, lang);
            return (
              <a
                key={lang}
                href={href}
                data-event="LANGUAGE_CHANGE"
                aria-current={currentPath === href ? "page" : undefined}
                className={`rounded-full border px-3 py-1 ${page.lang === lang ? "border-cyan-300/30 text-cyan-100" : "border-white/10 hover:text-white"}`}
              >
                {languageNames[lang]}
              </a>
            );
          })}
          <div className="w-48">
            <GlassSelect
              id="site-currency"
              name="currency"
              label={nav.currency}
              value={currency}
              placeholder={nav.chooseCurrency}
              options={currencyOptions}
              onChange={(nextCurrency) => {
                setCurrency(nextCurrency as typeof currency);
                trackEvent("currency_change", { currency: nextCurrency });
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: Language }) {
  const services =
    lang === "dk"
      ? [
          ["Webudvikling Aarhus", "/dk/webudvikling-aarhus"],
          ["Softwareudvikling", "/dk/softwareudvikling"],
          ["AI-løsninger", "/dk/ai-loesninger"],
          ["Restaurant software", "/dk/restaurant-software"],
          ["Portfolio", "/dk/portfolio"],
          ["For You", "/dk/for-you"],
        ]
      : lang === "se"
        ? [
            ["Webbutveckling", "/se/web-development"],
            ["Mjukvaruutveckling", "/se/software-development"],
            ["AI-utveckling", "/se/ai-development"],
            ["Restaurangprogramvara", "/se/restaurant-software"],
            ["Teknisk SEO", "/se/teknisk-seo-sverige"],
            ["Portfölj", "/se/portfolio"],
            ["För dig", "/se/for-you"],
          ]
        : lang === "de"
          ? [
            ["Webentwicklung", "/de/web-development"],
            ["Softwareentwicklung", "/de/software-development"],
            ["KI-Entwicklung", "/de/ai-development"],
            ["Restaurantsoftware", "/de/restaurant-software"],
            ["Portfolio", "/de/portfolio"],
            ["Für Sie", "/de/for-you"],
          ]
        : [
          ["Web development", "/en/web-development"],
          ["Software development", "/en/software-development"],
          ["AI development", "/en/ai-development"],
          ["Restaurant software", "/en/restaurant-software"],
          ["Portfolio", "/en/portfolio"],
          ["For You", "/en/for-you"],
        ];

  return (
    <footer className="border-t border-white/8 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white">UnderStack</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
            {lang === "dk"
              ? "Uafhængigt softwarestudio drevet af Diego Posleman. Aarhus, Danmark."
              : lang === "se"
                ? "Oberoende mjukvarustudio drivet av Diego Posleman. Aarhus, Danmark."
                : lang === "de"
                  ? "Unabhängiges Softwarestudio von Diego Posleman. Aarhus, Dänemark."
                  : "Independent software studio run by Diego Posleman. Aarhus, Denmark."}
          </p>
          <a
            href="https://github.com/UnderStack-Dk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-cyan-100 hover:text-white"
          >
            github.com/UnderStack-Dk
          </a>
          <p className="mt-4 text-sm text-white/48">CVR: {COMPANY_CVR}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/42">{lang === "dk" ? "Tjenester" : lang === "se" ? "Tjänster" : lang === "de" ? "Leistungen" : "Services"}</div>
          <div className="mt-4 grid gap-3 text-sm text-white/62">
            {services.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/42">{lang === "dk" || lang === "se" || lang === "de" ? "Kontakt" : "Contact"}</div>
          <p className="mt-4 text-xs text-white/42">{lang === "dk" ? "SMS foretrækkes" : lang === "se" ? "SMS föredras" : lang === "de" ? "SMS bevorzugt" : "SMS preferred"}</p>
          <SmsContactLink language={lang} location="footer" className="mt-1 block text-sm text-cyan-100 hover:text-white">
            {COMPANY_PHONE_DISPLAY}
          </SmsContactLink>
          <CopyPhoneButton language={lang} className="mt-2 text-xs text-white/58 transition hover:text-white" />
          <p className="mt-3 text-xs leading-5 text-white/42">
            {lang === "dk" ? "Hvis du vil tale om flere detaljer, finder vi gerne et tidspunkt, der passer." : lang === "se" ? "Om du vill prata igenom fler detaljer hittar vi gärna en tid som passar." : lang === "de" ? "Wenn Sie weitere Details besprechen möchten, finden wir gern einen passenden Termin." : "If you would like to talk through more details, we can find a time that works."}
          </p>
          <p className="mt-4 text-xs text-white/42">{lang === "dk" ? "Generelle henvendelser" : lang === "se" ? "Allmänna förfrågningar" : lang === "de" ? "Allgemeine Anfragen" : "General enquiries"}</p>
          <a href={`mailto:${GENERAL_EMAIL}`} data-event="EMAIL_CLICK" className="mt-1 block text-sm text-cyan-100 hover:text-white">
            {GENERAL_EMAIL}
          </a>
          <p className="mt-4 text-xs text-white/42">{lang === "dk" ? "Produkt og teknik" : lang === "se" ? "Produkt och teknik" : lang === "de" ? "Produkt und Technik" : "Product and technical"}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} data-event="EMAIL_CLICK" className="mt-1 block text-sm text-cyan-100 hover:text-white">
            {CONTACT_EMAIL}
          </a>
          <p className="mt-6 text-xs text-white/40">© 2026 UnderStack. {lang === "dk" ? "Alle rettigheder forbeholdes." : lang === "se" ? "Alla rättigheter förbehållna." : lang === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}

function CardGrid({ page }: { page: SeoPage }) {
  if (page.kind !== "caseIndex" && page.kind !== "insightIndex") {
    return null;
  }

  const children = allPages.filter((item) => item.lang === page.lang && item.slug.startsWith(`${page.slug}/`));
  const kindLabel = languageCopy(page.lang, {
    dk: { case: "Case", insight: "Insight" },
    en: { case: "Case", insight: "Insight" },
    se: { case: "Case", insight: "Insikt" },
    de: { case: "Projekt", insight: "Einblick" },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {children.map((item) => (
          <a key={item.slug} href={pagePath(item)} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-cyan-300/24">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/72">{item.kind === "case" ? kindLabel.case : kindLabel.insight}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.h1}</h2>
            <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function localizedProject(project: PortfolioProject, lang: Language) {
  const content = { ...project, ...project.localized?.[lang] };
  if (lang === "dk" || project.localized?.[lang]) return content;

  return {
    ...content,
    category: localizeText(content.category, lang),
    description: localizeText(content.description, lang),
    capabilities: content.capabilities.map((capability) => localizeText(capability, lang)),
    status: content.status ? localizeText(content.status, lang) : undefined,
    location: content.location ? localizeText(content.location, lang) : undefined,
    cta: content.cta ? { ...content.cta, label: localizeText(content.cta.label, lang) } : undefined,
  };
}

function PortfolioEntry({ project, lang, featured = false }: { project: PortfolioProject; lang: Language; featured?: boolean }) {
  const content = localizedProject(project, lang);
  const screenshots = productScreenshots[
    project.name === "GastroApp"
      ? "gastroapp"
      : project.name === "UnderStack Pocket AI"
        ? "understack-ai-pocket"
      : project.name === "Peritar - ASEPCO"
          ? "peritar-asepco"
          : project.name.toLowerCase()
  ] ?? [];

  return (
    <article className={`grid gap-5 border-t border-white/12 py-8 md:gap-10 ${featured ? "md:grid-cols-[minmax(11rem,0.45fr)_minmax(16rem,0.9fr)_minmax(0,1.4fr)] md:py-14" : "md:grid-cols-[minmax(11rem,0.55fr)_minmax(15rem,0.8fr)_minmax(0,1.25fr)] md:py-10"}`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">{content.category}</p>
        {content.status ? <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-white/68">{content.status}</p> : null}
        {content.location ? <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/42">{content.location}</p> : null}
      </div>
      <div>
        <h2 className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} font-semibold tracking-tight text-white`}>{project.name}</h2>
        {content.cta ? (
          <a href={content.cta.href} className="mt-6 inline-flex text-sm font-medium text-white/82 underline decoration-white/30 underline-offset-4 transition hover:text-white">
            {content.cta.label} <span aria-hidden="true" className="ml-3">-&gt;</span>
          </a>
        ) : null}
      </div>
      <div>
        <p className="max-w-xl text-sm leading-7 text-white/64">{content.description}</p>
        <ul className="mt-6 grid gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-sm text-white/62 sm:grid-cols-2">
          {content.capabilities.map((capability) => (
            <li key={capability}>— {capability}</li>
          ))}
        </ul>
        <div className="mt-6 max-w-xl">
          <ProductScreenshotGallery
            screenshots={screenshots}
            lang={lang}
            label={`${project.name} ${languageCopy(lang, { dk: "billeder", en: "screenshots", se: "skärmbilder", de: "Screenshots" })}`}
          />
        </div>
      </div>
    </article>
  );
}

function PortfolioGrid({ page }: { page: SeoPage }) {
  if (page.kind !== "portfolio" && page.kind !== "apps") {
    return null;
  }

  const isApps = page.kind === "apps";
  const copy = languageCopy(page.lang, {
    dk: { kickerApps: "Produkter og produktretninger", kickerPortfolio: "Software bygget til reel drift.", titleApps: "Produkter med tydelig status og dokumenterede funktioner.", titlePortfolio: "Fire projekter, jeg kan stå inde for.", more: "Flere koncepter under udvikling —", moreLink: "se andre projekter", moreHref: "/dk/andre-projekter" },
    en: { kickerApps: "Products and product directions", kickerPortfolio: "Software built for real-world operations.", titleApps: "Products with a clear status and documented capabilities.", titlePortfolio: "Four projects I can stand behind.", more: "More concepts in development —", moreLink: "see other projects", moreHref: "/en/other-projects" },
    se: { kickerApps: "Produkter och produktinriktningar", kickerPortfolio: "Mjukvara byggd för verklig drift.", titleApps: "Produkter med tydlig status och dokumenterade funktioner.", titlePortfolio: "Fyra projekt jag står för.", more: "Fler koncept under utveckling —", moreLink: "se andra projekt", moreHref: "/se/other-projects" },
    de: { kickerApps: "Produkte und Produktbereiche", kickerPortfolio: "Software für den realen Betrieb.", titleApps: "Produkte mit klarem Status und dokumentierten Funktionen.", titlePortfolio: "Vier Projekte, hinter denen ich stehe.", more: "Weitere Konzepte in Entwicklung —", moreLink: "andere Projekte ansehen", moreHref: "/de/other-projects" },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12" aria-labelledby="portfolio-projects">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">
          {isApps ? copy.kickerApps : copy.kickerPortfolio}
        </p>
        <h2 id="portfolio-projects" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {isApps ? copy.titleApps : copy.titlePortfolio}
        </h2>
      </div>
      <div className="mt-10">
        <div className="border-b border-white/12">
          {portfolioProjects.map((project) => (
            <PortfolioEntry key={project.name} project={project} lang={page.lang} featured />
          ))}
        </div>
      </div>
      {!isApps ? (
        <p className="mt-8 text-sm text-white/58">
          <>
            {copy.more}{" "}
            <a href={copy.moreHref} className="text-cyan-100 underline decoration-white/30 underline-offset-4 hover:text-white">
              {copy.moreLink}
            </a>
            .
          </>
        </p>
      ) : null}
    </section>
  );
}

function ArchiveGrid({ page }: { page: SeoPage }) {
  if (page.kind !== "archive") {
    return null;
  }

  const archiveHeading = languageCopy(page.lang, {
    dk: "Andre projekter under udvikling",
    en: "Other projects in development",
    se: "Andra projekt under utveckling",
    de: "Weitere Projekte in Entwicklung",
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12" aria-labelledby="archive-projects">
      <h2 id="archive-projects" className="sr-only">
        {archiveHeading}
      </h2>
      <div className="border-b border-white/12">
        {archivedProjects.map((project) => (
          <PortfolioEntry key={project.name} project={project} lang={page.lang} />
        ))}
      </div>
    </section>
  );
}

function CaseScreenshots({ page }: { page: SeoPage }) {
  if (page.kind !== "case") {
    return null;
  }

  const caseSlug = page.slug.split("/").pop() ?? "";
  const screenshots = productScreenshots[caseSlug] ?? [];
  const copy = languageCopy(page.lang, {
    dk: { label: "Skærmbilleder", soon: "Skærmbilleder tilføjes snart." },
    en: { label: "Screenshots", soon: "Screenshots coming soon." },
    se: { label: "Skärmbilder", soon: "Skärmbilder tillkommer snart." },
    de: { label: "Screenshots", soon: "Screenshots folgen in Kürze." },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-6" aria-label={copy.label}>
      {screenshots.length ? (
        <ProductScreenshotGallery screenshots={screenshots} lang={page.lang} />
      ) : (
        <p className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-5 text-sm text-white/48">
          {copy.soon}
        </p>
      )}
    </section>
  );
}

function SeoPageView({ page }: { page: SeoPage }) {
  const path = pagePath(page);
  const isDanish = page.lang === "dk";
  const isSwedish = page.lang === "se";
  const isGerman = page.lang === "de";
  const relatedLanguage = page.lang;
  const alternates = pageAlternates(page).map((alternate) => ({ ...alternate, href: localUrl(alternate.href) }));

  return (
    <div className="min-h-screen text-white">
      <PageMeta title={page.title} description={page.description} path={path} lang={languageTags[page.lang]} alternates={alternates} schema={schemaFor(page)} />
      <div className="noise-overlay" />
      <Header page={page} />

      <main>
        <section className="page-hero px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="eyebrow">
                {page.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{page.h1}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{page.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <SmsContactLink
                  language={page.lang}
                  location="page_hero"
                  className="rounded-full border border-cyan-300/25 bg-cyan-300/12 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/18"
                >
                  {page.cta}
                </SmsContactLink>
                <a href={`/${relatedLanguage}/portfolio`} className="text-sm font-medium text-white/70 underline decoration-white/30 underline-offset-4 transition hover:text-white">
                  {isDanish ? "Se cases" : isSwedish ? "Visa case" : isGerman ? "Projekte ansehen" : "View cases"}
                </a>
              </div>
              <p className="mt-4 text-xs text-white/48">
                {isDanish ? "Hvis du foretrækker at tale om flere detaljer, finder vi gerne et tidspunkt, der passer." : isSwedish ? "Om du vill prata igenom fler detaljer hittar vi gärna en tid som passar." : isGerman ? "Wenn Sie weitere Details besprechen möchten, finden wir gern einen passenden Termin." : "If you would prefer to talk through more details, we can find a time that works."}
              </p>
            </div>
          </div>
        </section>

        {page.kind === "home" ? (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="border-t border-white/8 px-6 py-8"
          >
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-12 gap-y-6">
              <div>
                <p className="text-3xl font-semibold tracking-tight text-white">{githubStats.publicRepos}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
                  {isDanish ? "Offentlige repos" : isSwedish ? "Publika GitHub-repor" : isGerman ? "Öffentliche Repositories" : "Public repositories"}
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-white">{githubStats.liveInProduction}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
                  {isDanish ? "Live i produktion" : isSwedish ? "Live i produktion" : isGerman ? "Live in Produktion" : "Live in production"}
                </p>
              </div>
              <a
                href="https://github.com/UnderStack-Dk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/40 underline decoration-white/20 underline-offset-4 transition hover:text-white/70"
              >
                {isDanish ? "Se koden på GitHub" : isSwedish ? "Se koden på GitHub" : isGerman ? "Code auf GitHub ansehen" : "See the code on GitHub"}
              </a>
            </div>
          </motion.section>
        ) : null}

        <CardGrid page={page} />
        <PortfolioGrid page={page} />
        <ArchiveGrid page={page} />
        <CaseScreenshots page={page} />

        {page.sections.map((section, index) => (
          <section key={section.title} className="content-section mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-6 border-t border-white/12 pt-7 md:grid-cols-[minmax(12rem,0.55fr)_minmax(0,1fr)] md:gap-12">
              <div>
                <p className="section-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{section.title}</h2>
              </div>
              <div>
                <p className="max-w-3xl text-base leading-8 text-white/66">{section.body}</p>
              {section.items && section.variant === "process" ? (
                <ol className="relative mt-7 space-y-6 border-l border-white/12 pl-7">
                  {section.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.08 }}
                      className="relative text-sm leading-6 text-white/72"
                    >
                      <span className="absolute -left-[2.35rem] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-[11px] font-medium text-cyan-100">
                        {itemIndex + 1}
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ol>
              ) : section.items ? (
                <ul className="section-list mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <li key={item} className="border-t border-white/10 py-3 text-sm text-white/72">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.variant === "techStack" ? (
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {techStackIcons.map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-white/50">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs uppercase tracking-[0.16em]">{label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              </div>
            </div>
          </section>
        ))}

        {page.faqs ? (
          <section className="mx-auto max-w-7xl px-6 py-10">
            <h2 className="text-3xl font-semibold tracking-tight">{isDanish ? "Spørgsmål og svar" : isSwedish ? "Frågor och svar" : isGerman ? "Fragen und Antworten" : "Questions and answers"}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/64">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-[30px] border border-cyan-300/14 bg-cyan-300/[0.055] p-7">
            <h2 className="text-2xl font-semibold tracking-tight">{isDanish ? "Relaterede sider" : isSwedish ? "Relaterade sidor" : isGerman ? "Verwandte Seiten" : "Related pages"}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.related.map((link) => (
                <a key={`${link.href}-${link.label}`} href={link.href.startsWith("/") ? `/${page.lang}/${link.href.split("/").slice(2).join("/")}` : link.href} className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/78 hover:bg-white/10">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={page.lang} />
    </div>
  );
}

const forYouServices = [
  { id: "personal", price: 1500, en: "Personal Website", dk: "Personligt website", enDescription: "A clean, professional website built around you, your work and your goals.", dkDescription: "Et rent, professionelt website bygget omkring dig, dit arbejde og dine mål.", enItems: ["Personal website", "CV website", "Portfolio", "Creator profile", "Professional profile"], dkItems: ["Personligt website", "CV-website", "Portfolio", "Creator-profil", "Professionel profil"] },
  { id: "freelancer", price: 2500, en: "Freelancer / Small Business Website", dk: "Freelancer- eller mindre virksomhedswebsite", enDescription: "A professional online presence without paying for features you do not need.", dkDescription: "En professionel online tilstedeværelse uden funktioner, du ikke har brug for.", enItems: ["Freelancers", "Consultants", "Independent professionals", "Small local businesses", "Services"], dkItems: ["Freelancere", "Konsulenter", "Selvstændige", "Små lokale virksomheder", "Services"] },
  { id: "custom", price: 3500, en: "Custom Website", dk: "Skræddersyet website", enDescription: "A tailored website designed around your project, brand and functionality.", dkDescription: "Et skræddersyet website omkring dit projekt, brand og funktionalitet.", enItems: ["Multi-page sites", "Custom layouts", "Advanced sections", "Integrations", "Animations", "Forms"], dkItems: ["Websites med flere sider", "Custom layouts", "Avancerede sektioner", "Integrationer", "Animationer", "Formularer"] },
  { id: "tool", price: 4500, en: "Small Web App / Custom Tool", dk: "Mindre webapp eller custom værktøj", enDescription: "Need something more than a website? Build lightweight custom web applications and tools.", dkDescription: "Har du brug for mere end et website? Vi bygger lette webapps og værktøjer.", enItems: ["Calculators", "Booking tools", "Dashboards", "Small management systems", "Automation tools", "Custom workflows"], dkItems: ["Beregner-værktøjer", "Bookingværktøjer", "Dashboards", "Mindre administrationssystemer", "Automatisering", "Custom workflows"] },
  { id: "help", price: 750, en: "Small Changes & Digital Help", dk: "Mindre ændringer og digital hjælp", enDescription: "For customers who already have something and just need help improving or fixing it.", dkDescription: "Til dig, der allerede har noget og bare har brug for hjælp til at forbedre eller rette det.", enItems: ["Landing pages", "Website fixes", "Small integrations", "Forms", "Improvements", "Technical adjustments"], dkItems: ["Landing pages", "Website-rettelser", "Mindre integrationer", "Formularer", "Forbedringer", "Tekniske justeringer"] },
];

const localizedForYouServices = {
  se: [
    { title: "Personlig webbplats", description: "En ren och professionell webbplats byggd kring dig, ditt arbete och dina mål.", items: ["Personlig webbplats", "CV-webbplats", "Portfölj", "Skaparprofil", "Professionell profil"] },
    { title: "Webbplats för frilansare eller småföretag", description: "En professionell närvaro på nätet utan funktioner du inte behöver.", items: ["Frilansare", "Konsulter", "Självständiga yrkespersoner", "Små lokala företag", "Tjänster"] },
    { title: "Skräddarsydd webbplats", description: "En skräddarsydd webbplats formad kring ditt projekt, varumärke och din funktionalitet.", items: ["Webbplatser med flera sidor", "Skräddarsydda layouter", "Avancerade sektioner", "Integrationer", "Animationer", "Formulär"] },
    { title: "Mindre webbapp eller skräddarsytt verktyg", description: "Behöver du något mer än en webbplats? Vi bygger lätta webbappar och verktyg för tydliga behov.", items: ["Kalkylatorer", "Bokningsverktyg", "Översikter", "Mindre administrationssystem", "Automatiseringsverktyg", "Skräddarsydda arbetsflöden"] },
    { title: "Mindre ändringar och digital hjälp", description: "För dig som redan har en lösning och behöver hjälp att förbättra eller rätta den.", items: ["Landningssidor", "Webbplatsändringar", "Mindre integrationer", "Formulär", "Förbättringar", "Tekniska justeringar"] },
  ],
  de: [
    { title: "Persönliche Website", description: "Eine klare, professionelle Website rund um Sie, Ihre Arbeit und Ihre Ziele.", items: ["Persönliche Website", "CV-Website", "Portfolio", "Creator-Profil", "Professionelles Profil"] },
    { title: "Website für Freelancer oder kleine Unternehmen", description: "Ein professioneller Online-Auftritt ohne Funktionen, die Sie nicht benötigen.", items: ["Freelancer", "Berater", "Selbstständige", "Kleine lokale Unternehmen", "Dienstleistungen"] },
    { title: "Individuelle Website", description: "Eine maßgeschneiderte Website für Ihr Projekt, Ihre Marke und die benötigte Funktionalität.", items: ["Websites mit mehreren Seiten", "Individuelle Layouts", "Erweiterte Bereiche", "Integrationen", "Animationen", "Formulare"] },
    { title: "Kleine Web-App oder individuelles Tool", description: "Sie brauchen mehr als eine Website? Wir entwickeln schlanke Web-Apps und Tools für konkrete Abläufe.", items: ["Rechner", "Buchungstools", "Dashboards", "Kleine Verwaltungssysteme", "Automatisierungstools", "Individuelle Arbeitsabläufe"] },
    { title: "Kleine Änderungen und digitale Hilfe", description: "Für Menschen, die bereits eine Lösung haben und sie verbessern oder reparieren möchten.", items: ["Landingpages", "Website-Korrekturen", "Kleine Integrationen", "Formulare", "Verbesserungen", "Technische Anpassungen"] },
  ],
} as const;

function forYouServiceContent(service: (typeof forYouServices)[number], index: number, language: Language) {
  if (language === "se" || language === "de") return localizedForYouServices[language][index];
  return {
    title: language === "dk" ? service.dk : service.en,
    description: language === "dk" ? service.dkDescription : service.enDescription,
    items: language === "dk" ? service.dkItems : service.enItems,
  };
}

function formatStartingPrice(value: number, lang: Language, formatPrice: (dkkAmount: number, language: Language) => string) {
  const amount = formatPrice(value, lang);
  return lang === "dk" ? `Fra ${amount}` : lang === "se" ? `Från ${amount}` : lang === "de" ? `Ab ${amount}` : `Starting from ${amount}`;
}

const forYouCopy = {
  dk: { quote: "Få et tilbud", sms: "Skriv SMS", smaller: "Til mindre projekter", level: "Det rigtige niveau af løsning, uden unødig kompleksitet.", pricing: "Prisen afhænger af dit projekts scope og kompleksitet. DKK er den primære pris, og andre valutaer vises som omtrentlige omregninger. Du får altid en klar pris, før arbejdet begynder.", process: "Klar proces", processTitle: "En enkel proces. Ingen overraskelser.", enquiry: "Projektforespørgsel", tell: "Fortæl os om dit projekt.", review: "Vi gennemgår din forespørgsel og vender tilbage, så snart vi kan.", clarify: "Vil du afklare det først?", clarifyText: "Skriv kort, hvad du har brug for, dit omtrentlige budget og hvornår du skal bruge det. Hvis en samtale er nyttig, finder vi et tidspunkt.", textUs: "Skriv til UnderStack", email: "Eller send en email", name: "Navn", need: "Hvad har du brug for?", chooseType: "Vælg en type", budget: "Cirka budget", chooseBudget: "Vælg et budget", notSure: "Ikke sikker endnu", details: "Beskriv kort, hvad du har brug for, hvad du vil opnå og eventuelle vigtige detaljer.", sending: "Sender...", complete: "Udfyld venligst alle obligatoriske felter.", success: "Tak - vi har modtaget din forespørgsel. Vi gennemgår dit projekt og vender tilbage så snart som muligt.", error: "Din forespørgsel kunne ikke sendes. Prøv igen, eller skriv direkte til info@understack.dk." },
  en: { quote: "Get a quote", sms: "Send SMS", smaller: "For smaller projects", level: "The right level of solution, without unnecessary complexity.", pricing: "Pricing depends on the scope and complexity of your project. DKK is the primary price and other currencies are shown as approximate conversions. You will always receive a clear price before any work begins.", process: "Clear process", processTitle: "Simple process. No surprises.", enquiry: "Project enquiry", tell: "Tell us about your project.", review: "We will review your request and get back to you as soon as possible.", clarify: "Want to clarify it first?", clarifyText: "Send a short message with what you need, your approximate budget and how soon you need it. If a call would be useful, we can find a time.", textUs: "Text UnderStack", email: "Or send an email", name: "Name", need: "What do you need?", chooseType: "Choose a type", budget: "Approximate budget", chooseBudget: "Choose a budget", notSure: "Not sure", details: "Briefly describe what you need, what you want to achieve and any important details.", sending: "Sending...", complete: "Please complete all required fields.", success: "Thanks - we received your request. We will review your project and get back to you as soon as possible.", error: "Your request could not be sent. Please try again or email info@understack.dk directly." },
  se: { quote: "Be om en offert", sms: "Skicka SMS", smaller: "För mindre projekt", level: "Rätt nivå av lösning, utan onödig komplexitet.", pricing: "Priset beror på projektets omfattning och komplexitet. DKK är grundpriset och andra valutor visas som ungefärliga omräkningar. Du får alltid ett tydligt pris innan arbetet börjar.", process: "Tydlig process", processTitle: "En enkel process. Inga överraskningar.", enquiry: "Projektförfrågan", tell: "Berätta om ditt projekt.", review: "Vi går igenom din förfrågan och återkommer så snart vi kan.", clarify: "Vill du reda ut det först?", clarifyText: "Skriv kort vad du behöver, din ungefärliga budget och när du behöver det. Om ett samtal är användbart hittar vi en tid.", textUs: "Skriv till UnderStack", email: "Eller skicka e-post", name: "Namn", need: "Vad behöver du?", chooseType: "Välj en typ", budget: "Ungefärlig budget", chooseBudget: "Välj en budget", notSure: "Inte säker ännu", details: "Beskriv kort vad du behöver, vad du vill uppnå och eventuella viktiga detaljer.", sending: "Skickar...", complete: "Fyll i alla obligatoriska fält.", success: "Tack - vi har tagit emot din förfrågan. Vi går igenom projektet och återkommer så snart som möjligt.", error: "Din förfrågan kunde inte skickas. Försök igen eller skriv direkt till info@understack.dk." },
  de: { quote: "Angebot anfragen", sms: "SMS senden", smaller: "Für kleinere Projekte", level: "Die passende Lösung, ohne unnötige Komplexität.", pricing: "Der Preis hängt vom Umfang und der Komplexität Ihres Projekts ab. DKK ist der Grundpreis; andere Währungen werden als ungefähre Umrechnung angezeigt. Vor Beginn der Arbeit erhalten Sie immer einen klaren Preis.", process: "Klarer Ablauf", processTitle: "Einfacher Ablauf. Keine Überraschungen.", enquiry: "Projektanfrage", tell: "Erzählen Sie uns von Ihrem Projekt.", review: "Wir prüfen Ihre Anfrage und melden uns so bald wie möglich.", clarify: "Möchten Sie es zuerst klären?", clarifyText: "Schreiben Sie kurz, was Sie benötigen, welches Budget Sie ungefähr haben und wann es fertig sein soll. Wenn ein Gespräch sinnvoll ist, finden wir einen Termin.", textUs: "UnderStack schreiben", email: "Oder eine E-Mail senden", name: "Name", need: "Was benötigen Sie?", chooseType: "Typ wählen", budget: "Ungefähres Budget", chooseBudget: "Budget wählen", notSure: "Noch nicht sicher", details: "Beschreiben Sie kurz, was Sie benötigen, was Sie erreichen möchten und welche Details wichtig sind.", sending: "Wird gesendet...", complete: "Bitte füllen Sie alle Pflichtfelder aus.", success: "Danke - wir haben Ihre Anfrage erhalten. Wir prüfen Ihr Projekt und melden uns so bald wie möglich.", error: "Ihre Anfrage konnte nicht gesendet werden. Versuchen Sie es erneut oder schreiben Sie direkt an info@understack.dk." },
} as const;

type GlassSelectOption = { value: string; label: string };

function GlassSelect({
  id,
  name,
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  options: GlassSelectOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function closeOnOutsidePress(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="flex w-full items-center justify-between rounded-xl border border-white/12 bg-[#151515]/92 px-4 py-3 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.18)] outline-none backdrop-blur-xl transition hover:border-white/22 focus:border-cyan-300/55"
      >
        <span className={selected ? "text-white" : "text-white/52"}>{selected?.label || placeholder}</span>
        <span aria-hidden="true" className={`ml-4 text-sm text-white/70 transition ${open ? "rotate-180" : ""}`}>v</span>
      </button>
      {open && (
        <div role="listbox" aria-labelledby={id} className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-white/14 bg-[#202020]/96 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${option.value === value ? "bg-cyan-300/16 text-cyan-50" : "text-white/82 hover:bg-white/10 hover:text-white"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ForYouPage({ page }: { page: SeoPage }) {
  const isDanish = page.lang === "dk";
  const copy = forYouCopy[page.lang];
  const { formatPrice } = useCurrency();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [quoteStarted, setQuoteStarted] = useState(false);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const alternates = pageAlternates(page).map((alternate) => ({ ...alternate, href: localUrl(alternate.href) }));
  const processSteps = languageCopy(page.lang, {
    dk: [["Fortæl os, hvad du har brug for", "Send en kort beskrivelse af dit projekt."], ["Vi gennemgår det", "Vi ser på scope og anbefaler den enkleste egnede løsning."], ["Du får et klart tilbud", "Du kender prisen, før udviklingen begynder."], ["Vi bygger det", "Når det er godkendt, håndterer UnderStack design, udvikling og levering."]],
    en: [["Tell us what you need", "Include your approximate budget and how soon you need it when you can."], ["We review it", "We look at the scope and recommend the simplest suitable solution."], ["You receive a clear quote", "You know the price before development begins."], ["We build it", "Once approved, UnderStack handles design, development and delivery."]],
    se: [["Berätta vad du behöver", "Skicka en kort beskrivning av ditt projekt."], ["Vi går igenom det", "Vi ser på omfattningen och rekommenderar den enklaste lämpliga lösningen."], ["Du får en tydlig offert", "Du känner till priset innan utvecklingen börjar."], ["Vi bygger det", "När det är godkänt hanterar UnderStack design, utveckling och leverans."]],
    de: [["Sagen Sie uns, was Sie benötigen", "Senden Sie eine kurze Beschreibung Ihres Projekts."], ["Wir prüfen es", "Wir bewerten den Umfang und empfehlen die einfachste passende Lösung."], ["Sie erhalten ein klares Angebot", "Sie kennen den Preis, bevor die Entwicklung beginnt."], ["Wir entwickeln es", "Nach der Freigabe übernimmt UnderStack Design, Entwicklung und Umsetzung."]],
  });

  function focusQuoteForm() {
    if (!quoteStarted) {
      setQuoteStarted(true);
      trackEvent("for_you_quote_start");
      trackEvent("contact_form_start", { form: "for_you_quote" });
    }
  }

  function selectService(service: string) {
    trackEvent("for_you_service_click", { service });
    document.getElementById("for-you-quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    if (!service || !budget) {
      setFormMessage(copy.complete);
      setStatus("error");
      return;
    }
    const fields = new FormData(form);
    setStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/for-you-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fields)),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error("Quote request failed");
      trackEvent("for_you_quote_submit", { service: String(fields.get("service") || "other") });
      trackEvent("contact_form_submit", { form: "for_you_quote", service: String(fields.get("service") || "other") });
      trackEvent("generate_lead", { source: "for_you_quote", service: String(fields.get("service") || "other") });
      form.reset();
      setService("");
      setBudget("");
      setFormMessage(copy.success);
      setStatus("success");
    } catch {
      setFormMessage(copy.error);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen text-white">
      <PageMeta title={page.title} description={page.description} path={pagePath(page)} lang={languageTags[page.lang]} alternates={alternates} schema={schemaFor(page)} />
      <div className="noise-overlay" />
      <Header page={page} />

      <main>
        <section className="page-hero px-6 py-16 sm:py-24">
          <div className="relative mx-auto max-w-7xl">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => selectService("hero")} className="rounded-full border border-cyan-300/25 bg-cyan-300/12 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/18">
                {copy.quote}
              </button>
              <SmsContactLink language={page.lang} location="for_you_hero" className="rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10">
                {copy.sms}
              </SmsContactLink>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20" aria-labelledby="for-you-services">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">{copy.smaller}</p>
            <h2 id="for-you-services" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{copy.level}</h2>
            <div className="mt-10 border-y border-white/12">
              {forYouServices.map((service, index) => {
                const serviceCopy = forYouServiceContent(service, index, page.lang);
                return (
                <article key={service.id} className="grid gap-5 border-t border-white/12 py-7 first:border-t-0 md:grid-cols-[10rem_minmax(12rem,0.8fr)_minmax(0,1.5fr)_auto] md:gap-8 md:py-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">{formatStartingPrice(service.price, page.lang, formatPrice)}</p>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{serviceCopy.title}</h3>
                  <div>
                    <p className="text-sm leading-7 text-white/60">{serviceCopy.description}</p>
                    <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-white/62 sm:grid-cols-2">
                      {serviceCopy.items.map((item) => <li key={item}>— {item}</li>)}
                    </ul>
                  </div>
                  <button type="button" onClick={() => selectService(service.id)} className="self-start text-left text-sm font-semibold text-white/85 underline decoration-white/30 underline-offset-4 transition hover:text-white md:whitespace-nowrap">
                    {service.id === "tool" ? localizeText(isDanish ? "Fortæl os om din idé" : "Tell us your idea", page.lang) : service.id === "help" ? localizeText(isDanish ? "Kontakt os" : "Contact us", page.lang) : copy.quote}
                  </button>
                </article>
                );
              })}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/54">{copy.pricing}</p>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.025] px-6 py-16 sm:py-20" aria-labelledby="for-you-process">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">{copy.process}</p>
            <h2 id="for-you-process" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{copy.processTitle}</h2>
            <div className="mt-10 grid gap-0 border-y border-white/10 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map(([title, body], index) => (
                <article key={title} className="border-b border-white/10 p-6 first:pl-0 md:border-r md:[&:nth-child(even)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2)]:border-r xl:[&:nth-child(4)]:border-r-0 xl:[&:nth-child(4)]:pr-0">
                  <p className="text-xs font-semibold tracking-[0.18em] text-white/48">0{index + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="for-you-quote" className="scroll-mt-24 px-6 py-16 sm:py-20" aria-labelledby="for-you-quote-title">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">{copy.enquiry}</p>
              <h2 id="for-you-quote-title" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{copy.tell}</h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/62">{copy.review}</p>
              <div className="mt-8 border-t border-white/12 pt-6">
                <h3 className="text-lg font-semibold text-white">{copy.clarify}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{copy.clarifyText}</p>
                <SmsContactLink language={page.lang} location="for_you_contact_panel" className="mt-5 inline-flex text-sm font-semibold text-cyan-100 hover:text-white">
                  {copy.textUs}
                </SmsContactLink>
                <a href={`mailto:${GENERAL_EMAIL}`} data-event="CTA_CLICK" data-analytics-label="For You email alternative" onClick={() => trackEvent("for_you_contact_click")} className="mt-3 block text-sm text-white/54 hover:text-white">
                  {copy.email}
                </a>
              </div>
            </div>

            <form onSubmit={submitQuote} onFocus={focusQuoteForm} className="border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-white/78">{copy.name}<input required name="name" autoComplete="name" maxLength={120} className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" /></label>
                <label className="grid gap-2 text-sm font-medium text-white/78">Email<input required name="email" type="email" autoComplete="email" maxLength={254} className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" /></label>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-white/78">{copy.need}<GlassSelect id="for-you-service" name="service" label={copy.need} value={service} placeholder={copy.chooseType} options={[{ value: "personal-website", label: localizeText(isDanish ? "Personligt website" : "Personal website", page.lang) }, { value: "portfolio", label: "Portfolio" }, { value: "freelancer-small-business", label: localizeText(isDanish ? "Freelancer eller mindre virksomhedswebsite" : "Freelancer or small business website", page.lang) }, { value: "custom-website", label: localizeText(isDanish ? "Skræddersyet website" : "Custom website", page.lang) }, { value: "web-app-custom-tool", label: localizeText(isDanish ? "Webapp eller custom værktøj" : "Web app or custom tool", page.lang) }, { value: "website-changes", label: localizeText(isDanish ? "Website-ændringer" : "Website changes", page.lang) }, { value: "other", label: localizeText(isDanish ? "Andet" : "Other", page.lang) }]} onChange={(value) => { setService(value); trackEvent("for_you_service_click", { service: value, source: "quote_form" }); }} /></label>
                <label className="grid gap-2 text-sm font-medium text-white/78">{copy.budget}<GlassSelect id="for-you-budget" name="budget" label={copy.budget} value={budget} placeholder={copy.chooseBudget} options={[{ value: "under-2000", label: `${localizeText(isDanish ? "Under" : "Under", page.lang)} ${formatPrice(2000, page.lang)}` }, { value: "2000-5000", label: `${formatPrice(2000, page.lang)} - ${formatPrice(5000, page.lang)}` }, { value: "5000-10000", label: `${formatPrice(5000, page.lang)} - ${formatPrice(10000, page.lang)}` }, { value: "10000-plus", label: `${formatPrice(10000, page.lang)}+` }, { value: "not-sure", label: copy.notSure }]} onChange={setBudget} /></label>
              </div>
              <label className="mt-5 grid gap-2 text-sm font-medium text-white/78">{copy.tell}<textarea required name="message" rows={7} maxLength={5000} placeholder={copy.details} className="resize-y rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/50" /></label>
              <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <button type="submit" disabled={status === "submitting"} className="mt-6 rounded-full border border-cyan-300/25 bg-cyan-300/12 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? copy.sending : copy.quote}</button>
              <div className="mt-4 min-h-6 text-sm" aria-live="polite">{status === "success" && <p className="text-emerald-200">{formMessage}</p>}{status === "error" && <p className="text-rose-200">{formMessage}</p>}</div>
            </form>
          </div>
        </section>
      </main>
      <Footer lang={page.lang} />
    </div>
  );
}

function ForYouRoute() {
  const params = useParams();
  const lang = isLanguage(params.lang) ? params.lang : "dk";
  const page = findPage(lang, "for-you");
  return page ? <ForYouPage page={page} /> : <Navigate to={`/${lang}/`} replace />;
}

function RoutedPage() {
  const params = useParams();
  const location = useLocation();
  const lang = isLanguage(params.lang) ? params.lang : "dk";
  const slug = params["*"] ?? "";
  const page = findPage(lang, slug);

  if (!page) {
    const fallback = findPage(lang, "");
    const notFoundCopy = languageCopy(lang, {
      dk: { title: "Siden blev ikke fundet | UnderStack", h1: "Siden blev ikke fundet.", description: "Den ønskede UnderStack-side kunne ikke findes." },
      en: { title: "Page not found | UnderStack", h1: "Page not found.", description: "The requested UnderStack page could not be found." },
      se: { title: "Sidan hittades inte | UnderStack", h1: "Sidan hittades inte.", description: "Den begärda UnderStack-sidan kunde inte hittas." },
      de: { title: "Seite nicht gefunden | UnderStack", h1: "Seite nicht gefunden.", description: "Die angeforderte UnderStack-Seite konnte nicht gefunden werden." },
    });
    return fallback ? <SeoPageView page={{ ...fallback, ...notFoundCopy }} /> : null;
  }

  if (location.pathname !== pagePath(page) && !location.pathname.endsWith("/")) {
    return <Navigate to={pagePath(page)} replace />;
  }

  return <SeoPageView page={page} />;
}

export default function App() {
  return (
    <CurrencyProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dk/" replace />} />
        <Route path="/privacy" element={<PocketPrivacyPage />} />
        <Route path="/life/privacy" element={<LifePrivacyPage />} />
        <Route path="/apps" element={<Navigate to="/en/apps" replace />} />
        <Route path="/marketplace" element={<Navigate to="/en/marketplace" replace />} />
        <Route path="/:lang/for-you" element={<ForYouRoute />} />
        <Route path="/:lang/*" element={<RoutedPage />} />
      </Routes>
    </CurrencyProvider>
  );
}
