import { type FormEvent, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { trackEvent } from "./lib/analytics";
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
  return value === "dk" || value === "en";
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
      inLanguage: page.lang === "dk" ? "da-DK" : "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.description,
      url: localUrl(path),
      inLanguage: page.lang === "dk" ? "da-DK" : "en",
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
      areaServed: page.lang === "dk" ? ["Aarhus", "Danmark"] : ["Aarhus", "Denmark", "Europe"],
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
      inLanguage: page.lang === "dk" ? "da-DK" : "en",
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
  const langLinks: Language[] = ["dk", "en"];
  const { currency, currencyOptions, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <a href={`/${page.lang}/`} className="flex items-center gap-3">
          <img src={logo} alt="UnderStack logo" className="h-8 w-8" loading="eager" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/90">UnderStack</span>
        </a>
        <nav className="order-3 flex w-full items-center gap-5 overflow-x-auto pb-1 text-sm text-white/68 lg:order-none lg:w-auto lg:overflow-visible lg:pb-0" aria-label="Primary navigation">
          <a href={`/${page.lang}/webudvikling-aarhus`} className={page.lang === "dk" ? "hover:text-white" : "hidden"}>
            Webudvikling
          </a>
          <a href={`/${page.lang}/web-development`} className={page.lang === "en" ? "hover:text-white" : "hidden"}>
            Web
          </a>
          <a href={`/${page.lang}/${page.lang === "dk" ? "softwareudvikling" : "software-development"}`} className="hover:text-white">
            Software
          </a>
          <a href={`/${page.lang}/restaurant-software`} className="hover:text-white">
            Restaurant
          </a>
          <a href={`/${page.lang}/cases/`} className="hover:text-white">
            Cases
          </a>
          <a href={`/${page.lang}/portfolio`} className="hover:text-white">
            Portfolio
          </a>
          <a href={`/${page.lang}/for-you`} className="hover:text-white">
            For You
          </a>
          <SmsContactLink language={page.lang} location="header" className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100 hover:bg-cyan-300/15">
            {page.lang === "dk" ? "Skriv SMS" : "Send SMS"}
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
              label={page.lang === "dk" ? "Valuta" : "Currency"}
              value={currency}
              placeholder={page.lang === "dk" ? "Vælg valuta" : "Choose currency"}
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
              : "Independent software studio run by Diego Posleman. Aarhus, Denmark."}
          </p>
          <a
            href="https://github.com/Dposleman"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-cyan-100 hover:text-white"
          >
            github.com/Dposleman
          </a>
          <p className="mt-4 text-sm text-white/48">CVR: {COMPANY_CVR}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/42">Services</div>
          <div className="mt-4 grid gap-3 text-sm text-white/62">
            {services.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/42">Contact</div>
          <p className="mt-4 text-xs text-white/42">{lang === "dk" ? "SMS foretrækkes" : "SMS preferred"}</p>
          <SmsContactLink language={lang} location="footer" className="mt-1 block text-sm text-cyan-100 hover:text-white">
            {COMPANY_PHONE_DISPLAY}
          </SmsContactLink>
          <CopyPhoneButton language={lang} className="mt-2 text-xs text-white/58 transition hover:text-white" />
          <p className="mt-3 text-xs leading-5 text-white/42">
            {lang === "dk" ? "Hvis du vil tale om flere detaljer, finder vi gerne et tidspunkt, der passer." : "If you would like to talk through more details, we can find a time that works."}
          </p>
          <p className="mt-4 text-xs text-white/42">{lang === "dk" ? "Generelle henvendelser" : "General enquiries"}</p>
          <a href={`mailto:${GENERAL_EMAIL}`} data-event="EMAIL_CLICK" className="mt-1 block text-sm text-cyan-100 hover:text-white">
            {GENERAL_EMAIL}
          </a>
          <p className="mt-4 text-xs text-white/42">{lang === "dk" ? "Produkt og teknik" : "Product and technical"}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} data-event="EMAIL_CLICK" className="mt-1 block text-sm text-cyan-100 hover:text-white">
            {CONTACT_EMAIL}
          </a>
          <p className="mt-6 text-xs text-white/40">© 2026 UnderStack. All rights reserved.</p>
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

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {children.map((item) => (
          <a key={item.slug} href={pagePath(item)} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-cyan-300/24">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/72">{item.kind === "case" ? "Case" : "Insight"}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.h1}</h2>
            <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function localizedProject(project: PortfolioProject, lang: Language) {
  return { ...project, ...project.localized?.[lang] };
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
          <ProductScreenshotGallery screenshots={screenshots} label={`${project.name} screenshots`} />
        </div>
      </div>
    </article>
  );
}

function PortfolioGrid({ page }: { page: SeoPage }) {
  if (page.kind !== "portfolio" && page.kind !== "apps") {
    return null;
  }

  const isDanish = page.lang === "dk";
  const isApps = page.kind === "apps";

  return (
    <section className="mx-auto max-w-7xl px-6 py-12" aria-labelledby="portfolio-projects">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">
          {isApps ? (isDanish ? "Produkter og produktretninger" : "Products and product directions") : isDanish ? "Software bygget til reel drift." : "Software built for real-world operations."}
        </p>
        <h2 id="portfolio-projects" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {isApps
            ? isDanish
              ? "Produkter med tydelig status og dokumenterede funktioner."
              : "Products with a clear status and documented capabilities."
            : isDanish
              ? "Fire projekter, jeg kan stå inde for."
              : "Four projects I can stand behind."}
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
          {isDanish ? (
            <>
              Flere koncepter under udvikling —{" "}
              <a href="/dk/andre-projekter" className="text-cyan-100 underline decoration-white/30 underline-offset-4 hover:text-white">
                se andre projekter
              </a>
              .
            </>
          ) : (
            <>
              More concepts in development —{" "}
              <a href="/en/other-projects" className="text-cyan-100 underline decoration-white/30 underline-offset-4 hover:text-white">
                see other projects
              </a>
              .
            </>
          )}
        </p>
      ) : null}
    </section>
  );
}

function ArchiveGrid({ page }: { page: SeoPage }) {
  if (page.kind !== "archive") {
    return null;
  }

  const isDanish = page.lang === "dk";

  return (
    <section className="mx-auto max-w-7xl px-6 py-12" aria-labelledby="archive-projects">
      <h2 id="archive-projects" className="sr-only">
        {isDanish ? "Andre projekter under udvikling" : "Other projects in development"}
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
  const isDanish = page.lang === "dk";

  return (
    <section className="mx-auto max-w-7xl px-6 py-6" aria-label={isDanish ? "Skærmbilleder" : "Screenshots"}>
      {screenshots.length ? (
        <ProductScreenshotGallery screenshots={screenshots} />
      ) : (
        <p className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-5 text-sm text-white/48">
          {isDanish ? "Skærmbilleder tilføjes snart." : "Screenshots coming soon."}
        </p>
      )}
    </section>
  );
}

function SeoPageView({ page }: { page: SeoPage }) {
  const path = pagePath(page);
  const isDanish = page.lang === "dk";
  const alternates = pageAlternates(page).map((alternate) => ({ ...alternate, href: localUrl(alternate.href) }));

  return (
    <div className="min-h-screen text-white">
      <PageMeta title={page.title} description={page.description} path={path} lang={isDanish ? "da-DK" : "en"} alternates={alternates} schema={schemaFor(page)} />
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
                <a href={`/${page.lang}/portfolio`} className="text-sm font-medium text-white/70 underline decoration-white/30 underline-offset-4 transition hover:text-white">
                  {isDanish ? "Se cases" : "View cases"}
                </a>
              </div>
              <p className="mt-4 text-xs text-white/48">
                {isDanish ? "Hvis du foretrækker at tale om flere detaljer, finder vi gerne et tidspunkt, der passer." : "If you would prefer to talk through more details, we can find a time that works."}
              </p>
            </div>
          </div>
        </section>

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
              {section.items ? (
                <ul className="section-list mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <li key={item} className="border-t border-white/10 py-3 text-sm text-white/72">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              </div>
            </div>
          </section>
        ))}

        {page.faqs ? (
          <section className="mx-auto max-w-7xl px-6 py-10">
            <h2 className="text-3xl font-semibold tracking-tight">{isDanish ? "Spørgsmål og svar" : "Questions and answers"}</h2>
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
            <h2 className="text-2xl font-semibold tracking-tight">{isDanish ? "Relaterede sider" : "Related pages"}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.related.map((link) => (
                <a key={`${link.href}-${link.label}`} href={link.href} className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/78 hover:bg-white/10">
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

function formatStartingPrice(value: number, lang: Language, formatPrice: (dkkAmount: number, language: Language) => string) {
  const amount = formatPrice(value, lang);
  return lang === "dk" ? `Fra ${amount}` : `Starting from ${amount}`;
}

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
  const { formatPrice } = useCurrency();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [quoteStarted, setQuoteStarted] = useState(false);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const alternates = [
    { hrefLang: "da-DK", href: localUrl("/dk/for-you") },
    { hrefLang: "en", href: localUrl("/en/for-you") },
    { hrefLang: "x-default", href: localUrl("/dk/for-you") },
  ];

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
      setFormMessage(isDanish ? "Udfyld venligst alle obligatoriske felter." : "Please complete all required fields.");
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
      setFormMessage(isDanish ? "Tak - vi har modtaget din forespørgsel. Vi gennemgår dit projekt og vender tilbage så snart som muligt." : "Thanks - we received your request. We will review your project and get back to you as soon as possible.");
      setStatus("success");
    } catch {
      setFormMessage(isDanish ? "Din forespørgsel kunne ikke sendes. Prøv igen, eller skriv direkte til info@understack.dk." : "Your request could not be sent. Please try again or email info@understack.dk directly.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen text-white">
      <PageMeta title={page.title} description={page.description} path={pagePath(page)} lang={isDanish ? "da-DK" : "en"} alternates={alternates} schema={schemaFor(page)} />
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
                {isDanish ? "Få et tilbud" : "Get a quote"}
              </button>
              <SmsContactLink language={page.lang} location="for_you_hero" className="rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10">
                {isDanish ? "Skriv SMS" : "Send SMS"}
              </SmsContactLink>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20" aria-labelledby="for-you-services">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">{isDanish ? "Til mindre projekter" : "For smaller projects"}</p>
            <h2 id="for-you-services" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{isDanish ? "Det rigtige niveau af løsning, uden unødig kompleksitet." : "The right level of solution, without unnecessary complexity."}</h2>
            <div className="mt-10 border-y border-white/12">
              {forYouServices.map((service) => (
                <article key={service.id} className="grid gap-5 border-t border-white/12 py-7 first:border-t-0 md:grid-cols-[10rem_minmax(12rem,0.8fr)_minmax(0,1.5fr)_auto] md:gap-8 md:py-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">{formatStartingPrice(service.price, page.lang, formatPrice)}</p>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{isDanish ? service.dk : service.en}</h3>
                  <div>
                    <p className="text-sm leading-7 text-white/60">{isDanish ? service.dkDescription : service.enDescription}</p>
                    <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-white/62 sm:grid-cols-2">
                      {(isDanish ? service.dkItems : service.enItems).map((item) => <li key={item}>— {item}</li>)}
                    </ul>
                  </div>
                  <button type="button" onClick={() => selectService(service.id)} className="self-start text-left text-sm font-semibold text-white/85 underline decoration-white/30 underline-offset-4 transition hover:text-white md:whitespace-nowrap">
                    {service.id === "tool" ? (isDanish ? "Fortæl os om din idé" : "Tell us your idea") : service.id === "help" ? (isDanish ? "Kontakt os" : "Contact us") : (isDanish ? "Få et tilbud" : "Get a quote")}
                  </button>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/54">{isDanish ? "Prisen afhænger af dit projekts scope og kompleksitet. DKK er den primære pris, og andre valutaer vises som omtrentlige omregninger. Du får altid en klar pris, før arbejdet begynder." : "Pricing depends on the scope and complexity of your project. DKK is the primary price and other currencies are shown as approximate conversions. You will always receive a clear price before any work begins."}</p>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.025] px-6 py-16 sm:py-20" aria-labelledby="for-you-process">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">{isDanish ? "Klar proces" : "Clear process"}</p>
            <h2 id="for-you-process" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{isDanish ? "En enkel proces. Ingen overraskelser." : "Simple process. No surprises."}</h2>
            <div className="mt-10 grid gap-0 border-y border-white/10 md:grid-cols-2 xl:grid-cols-4">
              {(isDanish
                ? [["Fortæl os, hvad du har brug for", "Send en kort beskrivelse af dit projekt."], ["Vi gennemgår det", "Vi ser på scope og anbefaler den enkleste egnede løsning."], ["Du får et klart tilbud", "Du kender prisen, før udviklingen begynder."], ["Vi bygger det", "Når det er godkendt, håndterer UnderStack design, udvikling og levering."]]
                : [["Tell us what you need", "Include your approximate budget and how soon you need it when you can."], ["We review it", "We look at the scope and recommend the simplest suitable solution."], ["You receive a clear quote", "You know the price before development begins."], ["We build it", "Once approved, UnderStack handles design, development and delivery."]]
              ).map(([title, body], index) => (
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
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/72">{isDanish ? "Projektforespørgsel" : "Project enquiry"}</p>
              <h2 id="for-you-quote-title" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{isDanish ? "Fortæl os om dit projekt." : "Tell us about your project."}</h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/62">{isDanish ? "Vi gennemgår din forespørgsel og vender tilbage, så snart vi kan." : "We will review your request and get back to you as soon as possible."}</p>
              <div className="mt-8 border-t border-white/12 pt-6">
                <h3 className="text-lg font-semibold text-white">{isDanish ? "Vil du afklare det først?" : "Want to clarify it first?"}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{isDanish ? "Skriv kort, hvad du har brug for, dit omtrentlige budget og hvornår du skal bruge det. Hvis en samtale er nyttig, finder vi et tidspunkt." : "Send a short message with what you need, your approximate budget and how soon you need it. If a call would be useful, we can find a time."}</p>
                <SmsContactLink language={page.lang} location="for_you_contact_panel" className="mt-5 inline-flex text-sm font-semibold text-cyan-100 hover:text-white">
                  {isDanish ? "Skriv til UnderStack" : "Text UnderStack"}
                </SmsContactLink>
                <a href={`mailto:${GENERAL_EMAIL}`} data-event="CTA_CLICK" data-analytics-label="For You email alternative" onClick={() => trackEvent("for_you_contact_click")} className="mt-3 block text-sm text-white/54 hover:text-white">
                  {isDanish ? "Eller send en email" : "Or send an email"}
                </a>
              </div>
            </div>

            <form onSubmit={submitQuote} onFocus={focusQuoteForm} className="border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-white/78">{isDanish ? "Navn" : "Name"}<input required name="name" autoComplete="name" maxLength={120} className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" /></label>
                <label className="grid gap-2 text-sm font-medium text-white/78">Email<input required name="email" type="email" autoComplete="email" maxLength={254} className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" /></label>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-white/78">{isDanish ? "Hvad har du brug for?" : "What do you need?"}<GlassSelect id="for-you-service" name="service" label={isDanish ? "Hvad har du brug for?" : "What do you need?"} value={service} placeholder={isDanish ? "Vælg en type" : "Choose a type"} options={[{ value: "personal-website", label: isDanish ? "Personligt website" : "Personal website" }, { value: "portfolio", label: "Portfolio" }, { value: "freelancer-small-business", label: isDanish ? "Freelancer eller mindre virksomhedswebsite" : "Freelancer or small business website" }, { value: "custom-website", label: isDanish ? "Skræddersyet website" : "Custom website" }, { value: "web-app-custom-tool", label: isDanish ? "Webapp eller custom værktøj" : "Web app or custom tool" }, { value: "website-changes", label: isDanish ? "Website-ændringer" : "Website changes" }, { value: "other", label: isDanish ? "Andet" : "Other" }]} onChange={(value) => { setService(value); trackEvent("for_you_service_click", { service: value, source: "quote_form" }); }} /></label>
                <label className="grid gap-2 text-sm font-medium text-white/78">{isDanish ? "Cirka budget" : "Approximate budget"}<GlassSelect id="for-you-budget" name="budget" label={isDanish ? "Cirka budget" : "Approximate budget"} value={budget} placeholder={isDanish ? "Vælg et budget" : "Choose a budget"} options={[{ value: "under-2000", label: isDanish ? `Under ${formatPrice(2000, page.lang)}` : `Under ${formatPrice(2000, page.lang)}` }, { value: "2000-5000", label: `${formatPrice(2000, page.lang)} - ${formatPrice(5000, page.lang)}` }, { value: "5000-10000", label: `${formatPrice(5000, page.lang)} - ${formatPrice(10000, page.lang)}` }, { value: "10000-plus", label: `${formatPrice(10000, page.lang)}+` }, { value: "not-sure", label: isDanish ? "Ikke sikker endnu" : "Not sure" }]} onChange={setBudget} /></label>
              </div>
              <label className="mt-5 grid gap-2 text-sm font-medium text-white/78">{isDanish ? "Fortæl os om dit projekt" : "Tell us about your project"}<textarea required name="message" rows={7} maxLength={5000} placeholder={isDanish ? "Beskriv kort, hvad du har brug for, hvad du vil opnå og eventuelle vigtige detaljer." : "Briefly describe what you need, what you want to achieve and any important details."} className="resize-y rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/50" /></label>
              <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <button type="submit" disabled={status === "submitting"} className="mt-6 rounded-full border border-cyan-300/25 bg-cyan-300/12 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? (isDanish ? "Sender..." : "Sending...") : (isDanish ? "Få mit tilbud" : "Get my quote")}</button>
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
    return fallback ? <SeoPageView page={{ ...fallback, title: "Page not found | UnderStack", h1: "Page not found.", description: "The requested UnderStack page could not be found." }} /> : null;
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
