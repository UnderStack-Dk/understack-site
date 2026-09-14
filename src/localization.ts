import type { Language } from "./seoContent";

type Locale = "se" | "de";

const phrases: Record<Locale, Record<string, string>> = {
  se: {
    "UnderStack | Software company in Aarhus, Denmark": "UnderStack | Mjukvarustudio i Aarhus, Danmark",
    "Software, websites and digital products built in Aarhus.": "Mjukvara, webbplatser och digitala produkter byggda i Aarhus.",
    "Independent software studio · Aarhus": "Oberoende mjukvarustudio · Aarhus",
    "UnderStack designs and develops websites, SaaS products and custom software for companies in Denmark and across Europe.": "UnderStack designar och utvecklar webbplatser, SaaS-produkter och skräddarsydd mjukvara för företag i Danmark och runt om i Europa.",
    "UnderStack is an independent software studio in Aarhus, designing websites, SaaS products and custom software for companies in Denmark and Europe.": "UnderStack är en oberoende mjukvarustudio i Aarhus som designar webbplatser, SaaS-produkter och skräddarsydd mjukvara för företag i Danmark och Europa.",
    "Websites, custom business software and AI-assisted workflows, built with React, TypeScript and modern web tooling.": "Webbplatser, skräddarsydd verksamhetsmjukvara och AI-stödda arbetsflöden, byggda med React, TypeScript och modern webbteknik.",
    "This site's own codebase is public on GitHub, so you can see the quality before you sign anything.": "Den här webbplatsens kodbas är offentlig på GitHub, så att du kan bedöma kvaliteten innan du bestämmer dig.",
    "UnderStack is Diego Posleman — an independent software studio based in Aarhus.": "UnderStack är Diego Posleman — en oberoende mjukvarustudio i Aarhus.",
    "You work directly with the person designing and building your product: no account managers, unnecessary layers or long communication chains.": "Du arbetar direkt med personen som designar och bygger din produkt: inga account managers, onödiga mellanhänder eller långa kommunikationskedjor.",
    "See selected code on GitHub (github.com/UnderStack-Dk) or reach out directly to talk about a project.": "Se utvald kod på GitHub (github.com/UnderStack-Dk) eller hör av dig direkt för att prata om ett projekt.",
    "Discuss your project": "Prata om ditt projekt",
    "Web development": "Webbutveckling",
    "App development": "Apputveckling",
    "AI solutions": "AI-lösningar",
    "Restaurant software": "Restaurangprogramvara",
    "Software development": "Mjukvaruutveckling",
    "What we build": "Det vi bygger",
    "Built in Aarhus. Small by design.": "Byggt i Aarhus. Litet med avsikt.",
    "Need a website or a small custom tool?": "Behöver du en webbplats eller ett mindre skräddarsytt verktyg?",
    "Websites & Digital Projects for Individuals | UnderStack": "Webbplatser och digitala projekt för privatpersoner | UnderStack",
    "Personal websites, portfolios, small business websites and custom digital tools from UnderStack. Transparent pricing and projects starting from 1,500 DKK.": "Personliga webbplatser, portföljer, småföretagswebbplatser och skräddarsydda digitala verktyg från UnderStack. Tydlig prissättning och projekt från 1 500 DKK.",
    "UnderStack also works with individuals, freelancers and small businesses. Tell us what you need, your approximate budget and how soon you need it, and we will tell you what makes sense to build.": "UnderStack arbetar också med privatpersoner, frilansare och mindre företag. Berätta vad du behöver, din ungefärliga budget och när du behöver det, så föreslår vi en lämplig lösning.",
    "UnderStack For You": "UnderStack för dig",
    "Get a quote": "Be om en offert",
    "Tell us your idea": "Berätta om din idé",
    "Contact us": "Kontakta oss",
    "Questions and answers": "Frågor och svar",
    "Related pages": "Relaterade sidor",
    "Explore related services": "Utforska relaterade tjänster",
    "Read guides": "Läs guider",
    "Talk to UnderStack": "Prata med UnderStack",
    "Contact the product team": "Kontakta produktteamet",
    "View apps": "Se appar",
    "Documented products": "Dokumenterade produkter",
    "Product": "Produkt",
    "Features": "Funktioner",
    "Technical direction": "Teknisk riktning",
    "Short answer": "Kort svar",
    "What drives complexity?": "Vad driver komplexiteten?",
    "Next step": "Nästa steg",
    "Insight": "Insikt",
    "Guide": "Guide",
    "Cases": "Case",
    "Portfolio": "Portfölj",
    "Marketplace": "Marknadsplats",
    "Apps": "Appar",
    "Contact": "Kontakt",
    "Released": "Lanserat",
    "In development": "Under utveckling",
    "Direction": "Inriktning",

    // Service pages — shared process/stack sections
    "How we work": "Så arbetar vi",
    "We define business goals, users and operational workflows before implementation. Delivery runs in focused iterations with clear architecture, strong UX, maintainable code and launch-ready quality.":
      "Vi definierar affärsmål, användare och arbetsflöden innan implementation. Leveransen sker i fokuserade iterationer med tydlig arkitektur, stark UX, underhållbar kod och lanseringsklar kvalitet.",
    "Strategy and scope": "Strategi och omfattning",
    "UX and technical architecture": "UX och teknisk arkitektur",
    "Frontend, backend and integrations": "Frontend, backend och integrationer",
    "QA, launch and improvement": "QA, lansering och förbättring",
    "Technology and delivery": "Teknik och leverans",
    "UnderStack builds web platforms and software systems with React, TypeScript, Node.js and API integrations. The stack follows the requirements of the product.":
      "UnderStack bygger webbplattformar och mjukvarusystem med React, TypeScript, Node.js och API-integrationer. Tekniken väljs efter produktens krav.",

    // web-development
    "Web development in Denmark | Websites and web platforms": "Webbutveckling i Danmark | Webbplatser och webbplattformar",
    "Web development in Denmark for companies that need a clear, responsive business website or a practical web platform built to perform.":
      "Webbutveckling i Danmark för företag som behöver en tydlig, responsiv företagswebbplats eller en praktisk webbplattform byggd för prestanda.",
    "Web development in Denmark for websites that make your offer clear.": "Webbutveckling i Danmark för webbplatser som tydligt visar vad du erbjuder.",
    "Web development Denmark": "Webbutveckling Danmark",
    "UnderStack provides web development in Denmark for company websites and web platforms, with responsive design, technical SEO, analytics and the integrations your business actually needs.":
      "UnderStack erbjuder webbutveckling i Danmark för företagswebbplatser och webbplattformar, med responsiv design, teknisk SEO, analys och de integrationer ditt företag faktiskt behöver.",
    "Web development that supports the business": "Webbutveckling som stödjer verksamheten",
    "Many business websites look acceptable but fail to explain the offer, build trust or convert qualified visitors. We build clear structure, performance, SEO foundations and conversion paths into every website or web platform.":
      "Många företagswebbplatser ser godtagbara ut men misslyckas med att förklara erbjudandet, bygga förtroende eller konvertera kvalificerade besökare. Vi bygger tydlig struktur, prestanda, SEO-grund och konverteringsvägar in i varje webbplats eller webbplattform.",
    "A website when you need one, a platform when you need more": "En webbplats när du behöver det, en plattform när du behöver mer",
    "A focused business website can be the right place to start. When the work needs user accounts, data, workflows or recurring integrations, we can extend the same foundation into a web platform without losing clarity or speed.":
      "En fokuserad företagswebbplats kan vara rätt utgångspunkt. När arbetet kräver användarkonton, data, arbetsflöden eller återkommande integrationer kan vi bygga vidare på samma grund till en webbplattform utan att förlora tydlighet eller hastighet.",
    "Business website cost": "Kostnad för företagswebbplats",
    "Custom software": "Skräddarsydd mjukvara",
    "Start a project": "Starta ett projekt",

    // software-development
    "Software development Denmark | UnderStack": "Mjukvaruutveckling Danmark | UnderStack",
    "Software development in Denmark for custom business systems, internal tools, platforms and digital products.":
      "Mjukvaruutveckling i Danmark för skräddarsydda affärssystem, interna verktyg, plattformar och digitala produkter.",
    "Custom software for workflows that generic tools do not fit.": "Skräddarsydd mjukvara för arbetsflöden som generiska verktyg inte passar.",
    "Software development Denmark": "Mjukvaruutveckling Danmark",
    "UnderStack builds internal systems, business software and product platforms around real workflows, data and integrations.":
      "UnderStack bygger interna system, affärsmjukvara och produktplattformar kring verkliga arbetsflöden, data och integrationer.",
    "Built around real workflows": "Byggt kring verkliga arbetsflöden",
    "We build dashboards, internal systems, API layers, integrations, SaaS products and web apps for teams that need software aligned with how they actually work.":
      "Vi bygger dashboards, interna system, API-lager, integrationer, SaaS-produkter och webbappar för team som behöver mjukvara anpassad efter hur de faktiskt arbetar.",
    "Software development cost": "Kostnad för mjukvaruutveckling",

    // custom-software
    "Custom software Denmark and Europe | UnderStack": "Skräddarsydd mjukvara Danmark och Europa | UnderStack",
    "Custom business software for companies in Denmark and Europe: platforms, tools, integrations and scalable systems.":
      "Skräddarsydd affärsmjukvara för företag i Danmark och Europa: plattformar, verktyg, integrationer och skalbara system.",
    "Custom software for companies that have outgrown standard tools.": "Skräddarsydd mjukvara för företag som vuxit ur standardverktyg.",
    "Custom software Denmark": "Skräddarsydd mjukvara Danmark",
    "UnderStack builds custom business software for workflows, integrations, data, internal operations and product ideas.":
      "UnderStack bygger skräddarsydd affärsmjukvara för arbetsflöden, integrationer, data, intern drift och produktidéer.",
    "When SaaS is not enough": "När SaaS inte räcker",
    "Custom software makes sense when teams rely on manual processes, disconnected tools or workflows that off-the-shelf software cannot support cleanly.":
      "Skräddarsydd mjukvara är rätt val när team är beroende av manuella processer, osammanhängande verktyg eller arbetsflöden som färdig mjukvara inte kan stödja på ett bra sätt.",
    "Custom software vs SaaS": "Skräddarsydd mjukvara jämfört med SaaS",
    "Plan your system": "Planera ditt system",

    // app-development
    "App development Denmark | Web apps and digital products": "Apputveckling Danmark | Webbappar och digitala produkter",
    "App development in Denmark for companies building web apps, internal tools, mobile products and digital services.":
      "Apputveckling i Danmark för företag som bygger webbappar, interna verktyg, mobila produkter och digitala tjänster.",
    "App development in Denmark with product thinking and technical discipline.": "Apputveckling i Danmark med produkttänk och tekniskt disciplin.",
    "App development Denmark": "Apputveckling Danmark",
    "UnderStack helps turn app ideas into useful digital products with clear scope, strong UX and maintainable architecture.":
      "UnderStack hjälper till att omvandla appidéer till användbara digitala produkter med tydligt omfång, stark UX och underhållbar arkitektur.",
    "From concept to usable product": "Från koncept till användbar produkt",
    "We help with product scope, prototypes, user flows, frontend, backend and launch. For many companies, a web app is the right first product before native mobile development.":
      "Vi hjälper till med produktomfång, prototyper, användarflöden, frontend, backend och lansering. För många företag är en webbapp rätt första produkt innan native mobilutveckling.",
    "App cost guide": "Guide om appkostnad",
    "AI development": "AI-utveckling",
    "Discuss your app": "Prata om din app",

    // ai-development
    "AI development for companies | Denmark and Europe": "AI-utveckling för företag | Danmark och Europa",
    "AI development for companies: automation, internal assistants, workflows and AI-enabled software systems.":
      "AI-utveckling för företag: automatisering, interna assistenter, arbetsflöden och AI-drivna mjukvarusystem.",
    "AI development for companies that need practical automation, not hype.": "AI-utveckling för företag som behöver praktisk automatisering, inte hype.",
    "AI solutions for business": "AI-lösningar för företag",
    "UnderStack builds applied AI workflows, internal tools and product features where AI solves concrete operational tasks.":
      "UnderStack bygger tillämpade AI-arbetsflöden, interna verktyg och produktfunktioner där AI löser konkreta driftsuppgifter.",
    "AI for specific tasks": "AI för specifika uppgifter",
    "AI is useful for automation, document processing, search, classification and assistants when it solves a clear workflow problem.":
      "AI är användbart för automatisering, dokumenthantering, sökning, klassificering och assistenter när det löser ett tydligt arbetsflödesproblem.",
    "AI automation article": "Artikel om AI-automatisering",
    "Plan an AI workflow": "Planera ett AI-arbetsflöde",

    // restaurant-software (en)
    "Restaurant software Denmark | Kitchen and AI operations": "Restaurangprogramvara Danmark | Kök och AI-drift",
    "Restaurant software for Denmark and Europe: food cost, inventory, kitchen management, operations and practical AI workflows.":
      "Restaurangprogramvara för Danmark och Europa: food cost, lager, köksstyrning, drift och praktiska AI-arbetsflöden.",
    "Restaurant software for kitchens, operators and hospitality teams.": "Restaurangprogramvara för kök, restauratörer och hospitality-team.",
    "Restaurant software Denmark": "Restaurangprogramvara Danmark",
    "UnderStack builds restaurant software concepts and products around food cost, waste tracking, inventory, kitchen workflows and practical service support.":
      "UnderStack bygger restaurangprogramvara kring food cost, spillkontroll, lager, köksarbetsflöden och praktiskt servicestöd.",
    "Operational problems we address": "Driftsproblem vi löser",
    "Restaurants need better visibility into food cost, waste, pricing, inventory, service flow and day-to-day execution. Software should support the pace of the kitchen instead of adding admin load.":
      "Restauranger behöver bättre överblick över food cost, svinn, prissättning, lager, serviceflöde och det dagliga arbetet. Mjukvaran ska stödja kökets tempo istället för att skapa extra administration.",
    "GastroApp is UnderStack's restaurant software direction for food cost, recipes, inventory and utility workflows in the kitchen.":
      "GastroApp är UnderStacks restaurangprogramvara med fokus på food cost, recept, lager och praktiska arbetsflöden i köket.",
    "GastroApp case": "GastroApp-caset",
    "Restaurant software guide": "Guide om restaurangprogramvara",
    "AI restaurant operations": "AI i restaurangdrift",
    "Explore restaurant solutions": "Utforska restauranglösningar",

    // case index
    "Diego Posleman builds and runs each of these products himself. You can see the code on GitHub or visit the product directly through the links below.":
      "Diego Posleman bygger och driver vart och ett av dessa produkter själv. Du kan se koden på GitHub eller besöka produkten direkt via länkarna nedan.",
    "A small set of projects — each backed by code, a live URL or a named client, instead of a long list.":
      "Ett litet urval projekt — vart och ett med kod, en live-URL eller en namngiven kund bakom sig, i stället för en lång lista.",
    "Cases | UnderStack software products": "Case | UnderStack mjukvaruprodukter",
    "UnderStack cases: GastroApp, UnderStack Pocket AI, Life and platform modernization for Peritar (ASEPCO).":
      "UnderStack-case: GastroApp, UnderStack Pocket AI, Life och plattformsmodernisering för Peritar (ASEPCO).",
    "Cases from UnderStack.": "Case från UnderStack.",

    // case details
    "Restaurant operations software built from firsthand hospitality experience. Connects recipes, food cost, inventory, purchasing, production, reports and day-to-day kitchen operations in one system.":
      "Restaurangdriftsmjukvara byggd på egen erfarenhet från hospitality-branschen. Samlar recept, food cost, lager, inköp, produktion, rapporter och daglig köksdrift i ett system.",
    "Recipes and food costing": "Recept och food costing",
    "Inventory, stock and purchasing": "Lager, stock och inköp",
    "Production, events and closeout": "Produktion, events och avslut",
    "Reports, role-based access and multi-restaurant management": "Rapporter, rollbaserad åtkomst och multi-restauranghantering",
    "One operations product where kitchen teams work with recipes, stock and purchasing in the same system.":
      "En sammanhållen driftsprodukt där köksteam arbetar med recept, lager och inköp i samma system.",
    "Completed Android assistant in Google Play review, built around a local-first architecture for private, controllable AI workflows on mobile.":
      "Färdig Android-assistent under granskning i Google Play, byggd kring en local-first-arkitektur för privata, kontrollerbara AI-arbetsflöden på mobilen.",
    "Local-first data handling": "Local-first datahantering",
    "Persistent memory and tool routing": "Beständigt minne och verktygsdirigering",
    "Per-app permissions": "Behörigheter per app",
    "Automations with auditability": "Automatiseringar med spårbarhet",
    "Data and approvals stay on the device, while tools and automations require explicit permissions.":
      "Data och godkännanden stannar på enheten, medan verktyg och automatiseringar kräver uttryckliga behörigheter.",
    "Completed local-first personal operating system for tasks, notes, bills, receipts, documents and everyday planning. The product is in Google Play review.":
      "Färdigt local-first personligt operativsystem för uppgifter, anteckningar, räkningar, kvitton, dokument och vardagsplanering. Produkten granskas i Google Play.",
    "Tasks, notes and reminders": "Uppgifter, anteckningar och påminnelser",
    "Bills, receipts and OCR": "Räkningar, kvitton och OCR",
    "Subscriptions and document archive": "Abonnemang och dokumentarkiv",
    "Shopping lists and ADHD-friendly organisation": "Inköpslistor och ADHD-vänlig organisation",
    "The product keeps personal information on the phone instead of turning everyday data into an external dashboard.":
      "Produkten behåller personlig information i telefonen istället för att göra vardagsdata till ett externt dashboard.",
    "A professional platform used for expert assessment workflows for ASEPCO in Mendoza, Argentina, now undergoing a major technical modernization by UnderStack for a named client.":
      "En professionell plattform som används för expertbedömningsarbete åt ASEPCO i Mendoza, Argentina, som nu genomgår en stor teknisk modernisering av UnderStack för en namngiven kund.",
    "Legacy PHP to TypeScript modernization": "Modernisering från legacy PHP till TypeScript",
    "Frontend and backend modernization": "Modernisering av frontend och backend",
    "UI/UX modernization": "Modernisering av UI/UX",
    "Maintainable code structure": "Underhållbar kodstruktur",
    "Scalable architecture preparation": "Förberedelse för skalbar arkitektur",
    "The modernization is ongoing for an active client and is documented as work in progress, not a finished result.":
      "Moderniseringen pågår för en aktiv kund och är dokumenterad som ett pågående arbete, inte ett färdigt resultat.",
    "Related service": "Relaterad tjänst",
    "All cases": "Alla case",
    "Discuss a similar system": "Prata om ett liknande system",
    "product and status.": "produkt och status.",
    "The product": "Produkten",
    "Capabilities": "Funktioner",
    "The capabilities below are built or part of the current product direction.":
      "Funktionerna nedan är byggda eller en del av den nuvarande produktinriktningen.",

    // portfolio page
    "A small, deliberately limited set of projects — not a full list of everything in progress. Other products in development live on a separate page.":
      "Ett litet, medvetet begränsat urval av projekt — inte en fullständig lista över allt som pågår. Andra produkter under utveckling finns på en separat sida.",
    "Software built for real-world operations.": "Mjukvara byggd för verklig drift.",
    "GastroApp and Peritar (ASEPCO) are in active use by real users. Life and UnderStack Pocket AI are completed products in Google Play review. Earlier-stage concepts are kept on a separate page instead of mixed in here.":
      "GastroApp och Peritar (ASEPCO) används aktivt av riktiga användare. Life och UnderStack Pocket AI är färdiga produkter under granskning i Google Play. Tidigare koncept finns på en separat sida istället för att blandas in här.",
    "Other projects in development": "Andra projekt under utveckling",

    // archive page
    "Other projects in development | UnderStack": "Andra projekt under utveckling | UnderStack",
    "Early-stage concepts and products in development from UnderStack, without public evidence yet such as code, a URL or a client.":
      "Tidiga koncept och produkter under utveckling från UnderStack, utan offentlig evidens ännu i form av kod, URL eller kund.",
    "Other projects in development.": "Andra projekt under utveckling.",
    "These are early-stage concepts and products I'm working on alongside the projects collected in Portfolio. They do not yet have a public URL, a repo or a client behind them, so they're kept separate from the documented cases.":
      "Det här är tidiga koncept och produkter jag arbetar med vid sidan av projekten som samlats i Portfölj. De har ännu ingen offentlig URL, repo eller kund bakom sig, så de hålls separata från de dokumenterade casen.",
    "Why a separate page": "Varför en separat sida",
    "The Portfolio page is deliberately limited to projects that can be verified. What's listed here are directions and concepts in development, not finished deliverables.":
      "Portföljsidan är medvetet begränsad till projekt som kan verifieras. Det som listas här är riktningar och koncept under utveckling, inte färdiga leveranser.",
    "Discuss an idea": "Prata om en idé",

    // apps page
    "Released apps and active product directions from UnderStack, including Food Cost Calculator, WasteTrackr and ServiceOS.":
      "Släppta appar och aktiva produktinriktningar från UnderStack, inklusive Food Cost Calculator, WasteTrackr och ServiceOS.",
    "Apps and product pipeline.": "Appar och produktpipeline.",
    "A view of released apps and active product development inside the UnderStack ecosystem.":
      "En översikt över släppta appar och aktiv produktutveckling inom UnderStack-ekosystemet.",
    "Food Cost Calculator and WasteTrackr are documented as released restaurant utility apps.":
      "Food Cost Calculator och WasteTrackr är dokumenterade som släppta restaurangverktygsappar.",
    "ServiceOS and additional UnderStack utilities are marked as products in development.":
      "ServiceOS och ytterligare UnderStack-verktyg är markerade som produkter under utveckling.",

    // marketplace page
    "Code assets, templates and reusable developer products from UnderStack.": "Kodresurser, mallar och återanvändbara utvecklarprodukter från UnderStack.",
    "Marketplace for code assets and reusable software.": "Marketplace för kodresurser och återanvändbar mjukvara.",
    "UnderStack is developing a marketplace direction with templates, packaged apps and reusable software assets.":
      "UnderStack utvecklar en marketplace-inriktning med mallar, paketerade appar och återanvändbara mjukvaruresurser.",
    "The Codester profile is used to distribute templates, apps and reusable code assets.":
      "Codester-profilen används för att distribuera mallar, appar och återanvändbara kodresurser.",

    // insight default sections
    "There is no single correct price or solution. The right decision depends on goals, complexity, integrations, content, operations and how important the system is to the business.":
      "Det finns inget enskilt rätt pris eller lösning. Det rätta beslutet beror på mål, komplexitet, integrationer, innehåll, drift och hur viktigt systemet är för verksamheten.",
    "The biggest drivers are user flows, data models, integrations, permission levels, design quality, SEO needs, performance and the need for ongoing iteration.":
      "De största drivkrafterna är användarflöden, datamodeller, integrationer, behörighetsnivåer, designkvalitet, SEO-behov, prestanda och behovet av löpande iteration.",
    "Scope and user roles": "Omfattning och användarroller",
    "Data and integrations": "Data och integrationer",
    "Design and content": "Design och innehåll",
    "Operations, security and maintenance": "Drift, säkerhet och underhåll",
    "Start with a small, precise scope and expand based on real use. That reduces risk and makes the investment easier to control.":
      "Börja med ett litet, precist omfång och bygg vidare baserat på faktisk användning. Det minskar risken och gör investeringen lättare att kontrollera.",

    // detailed insight: business website cost
    "Start with the decision, not a template": "Börja med beslutet, inte mallen",
    "A useful website budget starts with the job the site needs to do. A focused brochure site, a content-heavy marketing platform and a customer-facing web application may all look like websites from the outside, but they require very different planning, design and engineering work.":
      "En användbar webbplatsbudget börjar med vad webbplatsen faktiskt ska göra. En fokuserad broschyrsida, en innehållstung marknadsföringsplattform och en kundvänd webbapplikation kan alla se ut som webbplatser utifrån, men de kräver mycket olika planering, design och utvecklingsarbete.",
    "What actually changes the scope?": "Vad påverkar egentligen omfånget?",
    "The largest cost drivers are usually not visual details. They are the number of user journeys, the quality and availability of content, integrations with existing systems, language requirements, performance expectations, accessibility, analytics and the amount of custom functionality required after launch.":
      "De största kostnadsdrivarna är oftast inte visuella detaljer. Det är antalet användarresor, kvaliteten och tillgängligheten av innehåll, integrationer med befintliga system, språkkrav, prestandaförväntningar, tillgänglighet, analys och mängden skräddarsydd funktionalitet som krävs efter lansering.",
    "Information architecture, content and conversion paths": "Informationsarkitektur, innehåll och konverteringsvägar",
    "Design depth and responsive behaviour": "Designdjup och responsivt beteende",
    "CMS, forms, booking, payments or CRM integrations": "CMS, formulär, bokning, betalningar eller CRM-integrationer",
    "SEO migration, analytics and technical performance": "SEO-migrering, analys och teknisk prestanda",
    "Custom customer areas, workflows or data models": "Skräddarsydda kundområden, arbetsflöden eller datamodeller",
    "Ongoing ownership, maintenance and iteration": "Löpande ägarskap, underhåll och iteration",
    "A practical way to budget": "Ett praktiskt sätt att budgetera",
    "Rather than asking for a single price before the scope is clear, split the work into three decisions: what must be true at launch, what can be measured after launch, and what belongs in a later iteration. This creates a credible first release without hiding future technical or content work inside a vague fixed quote.":
      "Istället för att be om ett enda pris innan omfånget är klart, dela upp arbetet i tre beslut: vad som måste vara på plats vid lansering, vad som kan mätas efter lansering, och vad som hör hemma i en senare iteration. Det skapar en trovärdig första lansering utan att dölja framtida tekniskt arbete eller innehållsarbete i en vag fast offert.",
    "When a website becomes a web platform": "När en webbplats blir en webbplattform",
    "A project stops being a conventional website when it needs user accounts, operational workflows, structured data, permissions, internal tools or recurring integrations. At that point, the right comparison is not between visual packages but between a lightweight product architecture and the operational value it needs to support.":
      "Ett projekt slutar vara en konventionell webbplats när det behöver användarkonton, operativa arbetsflöden, strukturerad data, behörigheter, interna verktyg eller återkommande integrationer. Då handlar rätt jämförelse inte om visuella paket utan om en lätt produktarkitektur och det operativa värde den behöver stödja.",
    "Questions worth answering before requesting a proposal": "Frågor värda att besvara innan du begär en offert",
    "A stronger brief helps both sides make better decisions. Define the business outcome, essential audience journeys, the content that exists today, systems that must connect, who owns decisions and what should be measurable after launch. That is more useful than selecting features from a generic checklist.":
      "Ett starkare underlag hjälper båda parter att fatta bättre beslut. Definiera det affärsmässiga resultatet, viktiga målgruppsresor, det innehåll som finns idag, system som måste kopplas ihop, vem som äger besluten och vad som ska kunna mätas efter lansering. Det är mer användbart än att välja funktioner från en generisk checklista.",
    "Is a template website always the lower-cost option?": "Är en mallbaserad webbplats alltid det billigare alternativet?",
    "It can reduce the initial build effort, especially for a simple site with ready content. It becomes less efficient when the business needs a distinct conversion flow, reliable integrations, unusual content structure or functionality that the template was not designed to support.":
      "Det kan minska den initiala byggnadsinsatsen, särskilt för en enkel webbplats med färdigt innehåll. Det blir mindre effektivt när verksamheten behöver ett distinkt konverteringsflöde, pålitliga integrationer, ovanlig innehållsstruktur eller funktionalitet som mallen inte var byggd för att stödja.",
    "Should SEO be part of the initial website scope?": "Ska SEO vara en del av det initiala webbplatsomfånget?",
    "Yes. Page structure, redirects, metadata, content migration, performance and analytics are easier to handle during the build than after a site has already been launched and indexed.":
      "Ja. Sidstruktur, omdirigeringar, metadata, innehållsmigrering, prestanda och analys är lättare att hantera under byggfasen än efter att en webbplats redan har lanserats och indexerats.",
    "How should a business compare website proposals?": "Hur bör ett företag jämföra webbplatsofferter?",
    "Compare the defined outcome, scope boundaries, content responsibilities, technical ownership, launch process and what happens after launch. A proposal with a lower headline figure can still create more work later if these points are unclear.":
      "Jämför det definierade resultatet, omfångsgränserna, ansvaret för innehåll, tekniskt ägarskap, lanseringsprocessen och vad som händer efter lansering. En offert med en lägre summa i rubriken kan ändå skapa mer arbete senare om dessa punkter är otydliga.",

    // insight index + article list
    "Insights | UnderStack guides on software, AI and web": "Insikter | UnderStack-guider om mjukvara, AI och webb",
    "Guides about software development, AI solutions, restaurant software and web platforms in Denmark and Europe.":
      "Guider om mjukvaruutveckling, AI-lösningar, restaurangprogramvara och webbplattformar i Danmark och Europa.",
    "Insights on software, web, AI and digital products.": "Insikter om mjukvara, webb, AI och digitala produkter.",
    "Content hub": "Innehållsnav",
    "Practical articles for companies making better decisions about software systems and digital products.":
      "Praktiska artiklar för företag som ska fatta bättre beslut om mjukvarusystem och digitala produkter.",
    "What you'll find here": "Vad du hittar här",
    "Practical articles about pricing, technology choices and decisions companies can use before starting a software project.":
      "Praktiska artiklar om prissättning, teknikval och beslut som företag kan använda innan de startar ett mjukvaruprojekt.",
    "How much does software development cost in Denmark?": "Hur mycket kostar mjukvaruutveckling i Danmark?",
    "A practical guide to the cost drivers behind software development in Denmark: scope, integrations, UX, data and maintenance.":
      "En praktisk guide till kostnadsdrivarna bakom mjukvaruutveckling i Danmark: omfattning, integrationer, UX, data och underhåll.",
    "How much does a business website cost in Denmark?": "Hur mycket kostar en företagswebbplats i Danmark?",
    "Website pricing in Denmark depends on content, design, technical complexity, SEO and integrations. This guide explains the main tradeoffs.":
      "Prissättning av webbplatser i Danmark beror på innehåll, design, teknisk komplexitet, SEO och integrationer. Den här guiden förklarar de viktigaste avvägningarna.",
    "When should a company choose custom software instead of SaaS? A practical comparison for operational systems and digital products.":
      "När bör ett företag välja skräddarsydd mjukvara istället för SaaS? En praktisk jämförelse för operativa system och digitala produkter.",
    "Restaurant management software in Denmark": "Restauranghanteringsmjukvara i Danmark",
    "Restaurant management software should support food cost, inventory, kitchen workflows, waste tracking and service operations.":
      "Restauranghanteringsmjukvara ska stödja food cost, lager, köksarbetsflöden, svinnkontroll och servicedrift.",
    "AI automation for European businesses": "AI-automatisering för europeiska företag",
    "AI automation works best when it is tied to specific workflows, human review and measurable operational friction.":
      "AI-automatisering fungerar bäst när den är kopplad till specifika arbetsflöden, mänsklig granskning och mätbar operativ friktion.",

    // screenshot captions
    "Design configuration": "Designinställningar",
    "Restaurant access": "Restaurangåtkomst",
    "Before UnderStack": "Före UnderStack",
    "Modernized homepage": "Moderniserad startsida",
    "Modernized sign-in": "Moderniserad inloggning",
  },
  de: {
    "UnderStack | Software company in Aarhus, Denmark": "UnderStack | Softwarestudio in Aarhus, Dänemark",
    "Software, websites and digital products built in Aarhus.": "Software, Websites und digitale Produkte aus Aarhus.",
    "Independent software studio · Aarhus": "Unabhängiges Softwarestudio · Aarhus",
    "UnderStack designs and develops websites, SaaS products and custom software for companies in Denmark and across Europe.": "UnderStack gestaltet und entwickelt Websites, SaaS-Produkte und individuelle Software für Unternehmen in Dänemark und ganz Europa.",
    "UnderStack is an independent software studio in Aarhus, designing websites, SaaS products and custom software for companies in Denmark and Europe.": "UnderStack ist ein unabhängiges Softwarestudio in Aarhus und gestaltet Websites, SaaS-Produkte sowie individuelle Software für Unternehmen in Dänemark und Europa.",
    "Websites, custom business software and AI-assisted workflows, built with React, TypeScript and modern web tooling.": "Websites, individuelle Unternehmenssoftware und KI-gestützte Arbeitsabläufe, entwickelt mit React, TypeScript und moderner Webtechnologie.",
    "This site's own codebase is public on GitHub, so you can see the quality before you sign anything.": "Der Quellcode dieser Website ist auf GitHub öffentlich, damit Sie die Qualität vor einer Entscheidung beurteilen können.",
    "UnderStack is Diego Posleman — an independent software studio based in Aarhus.": "UnderStack ist Diego Posleman — ein unabhängiges Softwarestudio aus Aarhus.",
    "You work directly with the person designing and building your product: no account managers, unnecessary layers or long communication chains.": "Sie arbeiten direkt mit der Person, die Ihr Produkt gestaltet und entwickelt: ohne Account Manager, unnötige Ebenen oder lange Kommunikationswege.",
    "See selected code on GitHub (github.com/UnderStack-Dk) or reach out directly to talk about a project.": "Ausgewählten Code finden Sie auf GitHub (github.com/UnderStack-Dk); für ein Projekt können Sie uns direkt schreiben.",
    "Discuss your project": "Ihr Projekt besprechen",
    "Web development": "Webentwicklung",
    "App development": "App-Entwicklung",
    "AI solutions": "KI-Lösungen",
    "Restaurant software": "Restaurantsoftware",
    "Software development": "Softwareentwicklung",
    "What we build": "Was wir entwickeln",
    "Built in Aarhus. Small by design.": "In Aarhus entwickelt. Bewusst unabhängig.",
    "Need a website or a small custom tool?": "Brauchen Sie eine Website oder ein kleines individuelles Tool?",
    "Websites & Digital Projects for Individuals | UnderStack": "Websites und digitale Projekte für Privatpersonen | UnderStack",
    "Personal websites, portfolios, small business websites and custom digital tools from UnderStack. Transparent pricing and projects starting from 1,500 DKK.": "Persönliche Websites, Portfolios, Websites für kleine Unternehmen und individuelle digitale Tools von UnderStack. Transparente Preise und Projekte ab 1.500 DKK.",
    "UnderStack also works with individuals, freelancers and small businesses. Tell us what you need, your approximate budget and how soon you need it, and we will tell you what makes sense to build.": "UnderStack arbeitet auch mit Privatpersonen, Freelancern und kleinen Unternehmen. Sagen Sie uns, was Sie benötigen, welches Budget Sie ungefähr haben und wann es fertig sein soll; wir empfehlen eine passende Lösung.",
    "UnderStack For You": "UnderStack für Sie",
    "Get a quote": "Angebot anfragen",
    "Tell us your idea": "Erzählen Sie uns von Ihrer Idee",
    "Contact us": "Kontaktieren Sie uns",
    "Questions and answers": "Fragen und Antworten",
    "Related pages": "Verwandte Seiten",
    "Explore related services": "Verwandte Leistungen entdecken",
    "Read guides": "Leitfäden lesen",
    "Talk to UnderStack": "Mit UnderStack sprechen",
    "Contact the product team": "Produktteam kontaktieren",
    "View apps": "Apps ansehen",
    "Documented products": "Dokumentierte Produkte",
    "Product": "Produkt",
    "Features": "Funktionen",
    "Technical direction": "Technische Ausrichtung",
    "Short answer": "Kurzantwort",
    "What drives complexity?": "Was bestimmt die Komplexität?",
    "Next step": "Nächster Schritt",
    "Insight": "Einblick",
    "Guide": "Leitfaden",
    "Cases": "Projekte",
    "Portfolio": "Portfolio",
    "Marketplace": "Marktplatz",
    "Apps": "Apps",
    "Contact": "Kontakt",
    "Released": "Veröffentlicht",
    "In development": "In Entwicklung",
    "Direction": "Ausrichtung",

    // Service pages — shared process/stack sections
    "How we work": "So arbeiten wir",
    "We define business goals, users and operational workflows before implementation. Delivery runs in focused iterations with clear architecture, strong UX, maintainable code and launch-ready quality.":
      "Wir definieren Geschäftsziele, Nutzer und Arbeitsabläufe vor der Umsetzung. Die Lieferung erfolgt in fokussierten Iterationen mit klarer Architektur, starker UX, wartbarem Code und startbereiter Qualität.",
    "Strategy and scope": "Strategie und Umfang",
    "UX and technical architecture": "UX und technische Architektur",
    "Frontend, backend and integrations": "Frontend, Backend und Integrationen",
    "QA, launch and improvement": "QA, Launch und Weiterentwicklung",
    "Technology and delivery": "Technologie und Umsetzung",
    "UnderStack builds web platforms and software systems with React, TypeScript, Node.js and API integrations. The stack follows the requirements of the product.":
      "UnderStack entwickelt Webplattformen und Softwaresysteme mit React, TypeScript, Node.js und API-Integrationen. Der Technologie-Stack richtet sich nach den Anforderungen des Produkts.",

    // web-development
    "Web development in Denmark | Websites and web platforms": "Webentwicklung in Dänemark | Websites und Webplattformen",
    "Web development in Denmark for companies that need a clear, responsive business website or a practical web platform built to perform.":
      "Webentwicklung in Dänemark für Unternehmen, die eine klare, responsive Unternehmenswebsite oder eine praxisnahe, leistungsstarke Webplattform benötigen.",
    "Web development in Denmark for websites that make your offer clear.": "Webentwicklung in Dänemark für Websites, die Ihr Angebot klar vermitteln.",
    "Web development Denmark": "Webentwicklung Dänemark",
    "UnderStack provides web development in Denmark for company websites and web platforms, with responsive design, technical SEO, analytics and the integrations your business actually needs.":
      "UnderStack bietet Webentwicklung in Dänemark für Unternehmenswebsites und Webplattformen – mit responsivem Design, technischem SEO, Analyse und den Integrationen, die Ihr Unternehmen wirklich braucht.",
    "Web development that supports the business": "Webentwicklung, die das Geschäft unterstützt",
    "Many business websites look acceptable but fail to explain the offer, build trust or convert qualified visitors. We build clear structure, performance, SEO foundations and conversion paths into every website or web platform.":
      "Viele Unternehmenswebsites sehen ordentlich aus, erklären das Angebot aber nicht klar, schaffen kein Vertrauen und wandeln qualifizierte Besucher nicht um. Wir integrieren klare Struktur, Performance, SEO-Grundlagen und Conversion-Pfade in jede Website oder Webplattform.",
    "A website when you need one, a platform when you need more": "Eine Website, wenn Sie das brauchen – eine Plattform, wenn Sie mehr brauchen",
    "A focused business website can be the right place to start. When the work needs user accounts, data, workflows or recurring integrations, we can extend the same foundation into a web platform without losing clarity or speed.":
      "Eine fokussierte Unternehmenswebsite kann der richtige Ausgangspunkt sein. Wenn Benutzerkonten, Daten, Arbeitsabläufe oder wiederkehrende Integrationen nötig werden, bauen wir dieselbe Grundlage zu einer Webplattform aus, ohne Klarheit oder Geschwindigkeit zu verlieren.",
    "Business website cost": "Kosten einer Unternehmenswebsite",
    "Custom software": "Individuelle Software",
    "Start a project": "Projekt starten",

    // software-development
    "Software development Denmark | UnderStack": "Softwareentwicklung Dänemark | UnderStack",
    "Software development in Denmark for custom business systems, internal tools, platforms and digital products.":
      "Softwareentwicklung in Dänemark für individuelle Unternehmenssysteme, interne Tools, Plattformen und digitale Produkte.",
    "Custom software for workflows that generic tools do not fit.": "Individuelle Software für Arbeitsabläufe, die generische Tools nicht abdecken.",
    "Software development Denmark": "Softwareentwicklung Dänemark",
    "UnderStack builds internal systems, business software and product platforms around real workflows, data and integrations.":
      "UnderStack entwickelt interne Systeme, Unternehmenssoftware und Produktplattformen rund um reale Arbeitsabläufe, Daten und Integrationen.",
    "Built around real workflows": "Entwickelt rund um reale Arbeitsabläufe",
    "We build dashboards, internal systems, API layers, integrations, SaaS products and web apps for teams that need software aligned with how they actually work.":
      "Wir entwickeln Dashboards, interne Systeme, API-Schichten, Integrationen, SaaS-Produkte und Web-Apps für Teams, die Software brauchen, die zu ihrer tatsächlichen Arbeitsweise passt.",
    "Software development cost": "Kosten der Softwareentwicklung",

    // custom-software
    "Custom software Denmark and Europe | UnderStack": "Individuelle Software Dänemark und Europa | UnderStack",
    "Custom business software for companies in Denmark and Europe: platforms, tools, integrations and scalable systems.":
      "Individuelle Unternehmenssoftware für Unternehmen in Dänemark und Europa: Plattformen, Tools, Integrationen und skalierbare Systeme.",
    "Custom software for companies that have outgrown standard tools.": "Individuelle Software für Unternehmen, die Standardtools entwachsen sind.",
    "Custom software Denmark": "Individuelle Software Dänemark",
    "UnderStack builds custom business software for workflows, integrations, data, internal operations and product ideas.":
      "UnderStack entwickelt individuelle Unternehmenssoftware für Arbeitsabläufe, Integrationen, Daten, interne Abläufe und Produktideen.",
    "When SaaS is not enough": "Wenn SaaS nicht ausreicht",
    "Custom software makes sense when teams rely on manual processes, disconnected tools or workflows that off-the-shelf software cannot support cleanly.":
      "Individuelle Software ist sinnvoll, wenn Teams auf manuelle Prozesse, isolierte Tools oder Arbeitsabläufe angewiesen sind, die Standardsoftware nicht sauber abbilden kann.",
    "Custom software vs SaaS": "Individuelle Software vs. SaaS",
    "Plan your system": "Ihr System planen",

    // app-development
    "App development Denmark | Web apps and digital products": "App-Entwicklung Dänemark | Web-Apps und digitale Produkte",
    "App development in Denmark for companies building web apps, internal tools, mobile products and digital services.":
      "App-Entwicklung in Dänemark für Unternehmen, die Web-Apps, interne Tools, mobile Produkte und digitale Dienste entwickeln.",
    "App development in Denmark with product thinking and technical discipline.": "App-Entwicklung in Dänemark mit Produktdenken und technischer Disziplin.",
    "App development Denmark": "App-Entwicklung Dänemark",
    "UnderStack helps turn app ideas into useful digital products with clear scope, strong UX and maintainable architecture.":
      "UnderStack hilft dabei, App-Ideen in nutzbare digitale Produkte zu verwandeln – mit klarem Umfang, starker UX und wartbarer Architektur.",
    "From concept to usable product": "Vom Konzept zum nutzbaren Produkt",
    "We help with product scope, prototypes, user flows, frontend, backend and launch. For many companies, a web app is the right first product before native mobile development.":
      "Wir unterstützen bei Produktumfang, Prototypen, Nutzerflüssen, Frontend, Backend und Launch. Für viele Unternehmen ist eine Web-App das richtige erste Produkt, bevor native mobile Entwicklung sinnvoll wird.",
    "App cost guide": "Leitfaden zu App-Kosten",
    "AI development": "KI-Entwicklung",
    "Discuss your app": "Ihre App besprechen",

    // ai-development
    "AI development for companies | Denmark and Europe": "KI-Entwicklung für Unternehmen | Dänemark und Europa",
    "AI development for companies: automation, internal assistants, workflows and AI-enabled software systems.":
      "KI-Entwicklung für Unternehmen: Automatisierung, interne Assistenten, Arbeitsabläufe und KI-gestützte Softwaresysteme.",
    "AI development for companies that need practical automation, not hype.": "KI-Entwicklung für Unternehmen, die praktische Automatisierung brauchen, keinen Hype.",
    "AI solutions for business": "KI-Lösungen für Unternehmen",
    "UnderStack builds applied AI workflows, internal tools and product features where AI solves concrete operational tasks.":
      "UnderStack entwickelt angewandte KI-Arbeitsabläufe, interne Tools und Produktfunktionen, bei denen KI konkrete betriebliche Aufgaben löst.",
    "AI for specific tasks": "KI für konkrete Aufgaben",
    "AI is useful for automation, document processing, search, classification and assistants when it solves a clear workflow problem.":
      "KI ist nützlich für Automatisierung, Dokumentenverarbeitung, Suche, Klassifizierung und Assistenten, wenn sie ein klares Prozessproblem löst.",
    "AI automation article": "Artikel zur KI-Automatisierung",
    "Plan an AI workflow": "KI-Workflow planen",

    // restaurant-software (en)
    "Restaurant software Denmark | Kitchen and AI operations": "Restaurantsoftware Dänemark | Küche und KI-Betrieb",
    "Restaurant software for Denmark and Europe: food cost, inventory, kitchen management, operations and practical AI workflows.":
      "Restaurantsoftware für Dänemark und Europa: Food Cost, Lagerverwaltung, Küchenmanagement, Betrieb und praxisnahe KI-Workflows.",
    "Restaurant software for kitchens, operators and hospitality teams.": "Restaurantsoftware für Küchen, Betreiber und Gastronomieteams.",
    "Restaurant software Denmark": "Restaurantsoftware Dänemark",
    "UnderStack builds restaurant software concepts and products around food cost, waste tracking, inventory, kitchen workflows and practical service support.":
      "UnderStack entwickelt Restaurantsoftware-Konzepte und -Produkte rund um Food Cost, Wastetracking, Lagerverwaltung, Küchenabläufe und praxisnahe Serviceunterstützung.",
    "Operational problems we address": "Betriebliche Probleme, die wir lösen",
    "Restaurants need better visibility into food cost, waste, pricing, inventory, service flow and day-to-day execution. Software should support the pace of the kitchen instead of adding admin load.":
      "Restaurants brauchen mehr Überblick über Food Cost, Verschwendung, Preisgestaltung, Lagerbestand, Serviceablauf und den täglichen Betrieb. Software sollte das Tempo der Küche unterstützen, statt zusätzlichen Verwaltungsaufwand zu schaffen.",
    "GastroApp is UnderStack's restaurant software direction for food cost, recipes, inventory and utility workflows in the kitchen.":
      "GastroApp ist UnderStacks Restaurantsoftware-Richtung für Food Cost, Rezepte, Lagerbestand und praktische Arbeitsabläufe in der Küche.",
    "GastroApp case": "GastroApp-Projekt",
    "Restaurant software guide": "Leitfaden zu Restaurantsoftware",
    "AI restaurant operations": "KI im Restaurantbetrieb",
    "Explore restaurant solutions": "Restaurantlösungen entdecken",

    // case index
    "Diego Posleman builds and runs each of these products himself. You can see the code on GitHub or visit the product directly through the links below.":
      "Diego Posleman entwickelt und betreibt jedes dieser Produkte selbst. Sie können den Code auf GitHub ansehen oder das Produkt direkt über die untenstehenden Links besuchen.",
    "A small set of projects — each backed by code, a live URL or a named client, instead of a long list.":
      "Eine kleine Auswahl an Projekten – jedes mit Code, einer Live-URL oder einem namentlich genannten Kunden dahinter, statt einer langen Liste.",
    "Cases | UnderStack software products": "Projekte | UnderStack Softwareprodukte",
    "UnderStack cases: GastroApp, UnderStack Pocket AI, Life and platform modernization for Peritar (ASEPCO).":
      "UnderStack-Projekte: GastroApp, UnderStack Pocket AI, Life und Plattformmodernisierung für Peritar (ASEPCO).",
    "Cases from UnderStack.": "Projekte von UnderStack.",

    // case details
    "Restaurant operations software built from firsthand hospitality experience. Connects recipes, food cost, inventory, purchasing, production, reports and day-to-day kitchen operations in one system.":
      "Restaurantbetriebssoftware, entwickelt aus eigener Erfahrung im Gastgewerbe. Verbindet Rezepte, Food Cost, Lagerbestand, Einkauf, Produktion, Berichte und den täglichen Küchenbetrieb in einem System.",
    "Recipes and food costing": "Rezepte und Food Costing",
    "Inventory, stock and purchasing": "Lager, Bestand und Einkauf",
    "Production, events and closeout": "Produktion, Events und Tagesabschluss",
    "Reports, role-based access and multi-restaurant management": "Berichte, rollenbasierter Zugriff und Mehrfachrestaurant-Verwaltung",
    "One operations product where kitchen teams work with recipes, stock and purchasing in the same system.":
      "Ein einheitliches Betriebsprodukt, in dem Küchenteams mit Rezepten, Lagerbestand und Einkauf im selben System arbeiten.",
    "Completed Android assistant in Google Play review, built around a local-first architecture for private, controllable AI workflows on mobile.":
      "Fertiggestellter Android-Assistent im Google-Play-Review, aufgebaut auf einer local-first-Architektur für private, kontrollierbare KI-Workflows auf dem Smartphone.",
    "Local-first data handling": "Local-first Datenverarbeitung",
    "Persistent memory and tool routing": "Persistenter Speicher und Tool-Routing",
    "Per-app permissions": "App-spezifische Berechtigungen",
    "Automations with auditability": "Automatisierungen mit Nachvollziehbarkeit",
    "Data and approvals stay on the device, while tools and automations require explicit permissions.":
      "Daten und Freigaben verbleiben auf dem Gerät, während Tools und Automatisierungen ausdrückliche Berechtigungen erfordern.",
    "Completed local-first personal operating system for tasks, notes, bills, receipts, documents and everyday planning. The product is in Google Play review.":
      "Fertiggestelltes local-first persönliches Betriebssystem für Aufgaben, Notizen, Rechnungen, Quittungen, Dokumente und Alltagsplanung. Das Produkt befindet sich im Google-Play-Review.",
    "Tasks, notes and reminders": "Aufgaben, Notizen und Erinnerungen",
    "Bills, receipts and OCR": "Rechnungen, Quittungen und OCR",
    "Subscriptions and document archive": "Abonnements und Dokumentenarchiv",
    "Shopping lists and ADHD-friendly organisation": "Einkaufslisten und ADHS-freundliche Organisation",
    "The product keeps personal information on the phone instead of turning everyday data into an external dashboard.":
      "Das Produkt behält persönliche Informationen auf dem Smartphone, statt Alltagsdaten in ein externes Dashboard zu verwandeln.",
    "A professional platform used for expert assessment workflows for ASEPCO in Mendoza, Argentina, now undergoing a major technical modernization by UnderStack for a named client.":
      "Eine professionelle Plattform für Gutachten-Workflows für ASEPCO in Mendoza, Argentinien, die derzeit von UnderStack für einen namentlich genannten Kunden umfassend technisch modernisiert wird.",
    "Legacy PHP to TypeScript modernization": "Modernisierung von Legacy-PHP zu TypeScript",
    "Frontend and backend modernization": "Modernisierung von Frontend und Backend",
    "UI/UX modernization": "UI/UX-Modernisierung",
    "Maintainable code structure": "Wartbare Codestruktur",
    "Scalable architecture preparation": "Vorbereitung auf eine skalierbare Architektur",
    "The modernization is ongoing for an active client and is documented as work in progress, not a finished result.":
      "Die Modernisierung läuft laufend für einen aktiven Kunden und ist als laufende Arbeit dokumentiert, nicht als abgeschlossenes Ergebnis.",
    "Related service": "Verwandte Leistung",
    "All cases": "Alle Projekte",
    "Discuss a similar system": "Ähnliches System besprechen",
    "product and status.": "Produkt und Status.",
    "The product": "Das Produkt",
    "Capabilities": "Funktionen",
    "The capabilities below are built or part of the current product direction.":
      "Die unten stehenden Funktionen sind entwickelt oder Teil der aktuellen Produktausrichtung.",

    // portfolio page
    "A small, deliberately limited set of projects — not a full list of everything in progress. Other products in development live on a separate page.":
      "Eine kleine, bewusst begrenzte Auswahl an Projekten – keine vollständige Liste aller laufenden Arbeiten. Weitere Produkte in Entwicklung finden Sie auf einer separaten Seite.",
    "Software built for real-world operations.": "Software für den realen Betrieb entwickelt.",
    "GastroApp and Peritar (ASEPCO) are in active use by real users. Life and UnderStack Pocket AI are completed products in Google Play review. Earlier-stage concepts are kept on a separate page instead of mixed in here.":
      "GastroApp und Peritar (ASEPCO) sind bei echten Nutzern im aktiven Einsatz. Life und UnderStack Pocket AI sind fertiggestellte Produkte im Google-Play-Review. Konzepte in früheren Phasen sind auf einer separaten Seite gesammelt, statt hier vermischt zu werden.",
    "Other projects in development": "Weitere Projekte in Entwicklung",

    // archive page
    "Other projects in development | UnderStack": "Weitere Projekte in Entwicklung | UnderStack",
    "Early-stage concepts and products in development from UnderStack, without public evidence yet such as code, a URL or a client.":
      "Frühe Konzepte und Produkte von UnderStack in Entwicklung, noch ohne öffentlichen Nachweis wie Code, eine URL oder einen Kunden.",
    "Other projects in development.": "Weitere Projekte in Entwicklung.",
    "These are early-stage concepts and products I'm working on alongside the projects collected in Portfolio. They do not yet have a public URL, a repo or a client behind them, so they're kept separate from the documented cases.":
      "Das sind frühe Konzepte und Produkte, an denen ich neben den in Portfolio gesammelten Projekten arbeite. Sie haben noch keine öffentliche URL, kein Repository und keinen Kunden dahinter und werden daher getrennt von den dokumentierten Projekten geführt.",
    "Why a separate page": "Warum eine separate Seite",
    "The Portfolio page is deliberately limited to projects that can be verified. What's listed here are directions and concepts in development, not finished deliverables.":
      "Die Portfolio-Seite ist bewusst auf verifizierbare Projekte beschränkt. Was hier aufgeführt ist, sind Richtungen und Konzepte in Entwicklung, keine fertigen Ergebnisse.",
    "Discuss an idea": "Über eine Idee sprechen",

    // apps page
    "Released apps and active product directions from UnderStack, including Food Cost Calculator, WasteTrackr and ServiceOS.":
      "Veröffentlichte Apps und aktive Produktrichtungen von UnderStack, darunter Food Cost Calculator, WasteTrackr und ServiceOS.",
    "Apps and product pipeline.": "Apps und Produkt-Pipeline.",
    "A view of released apps and active product development inside the UnderStack ecosystem.":
      "Ein Überblick über veröffentlichte Apps und aktive Produktentwicklung im UnderStack-Ökosystem.",
    "Food Cost Calculator and WasteTrackr are documented as released restaurant utility apps.":
      "Food Cost Calculator und WasteTrackr sind als veröffentlichte Restaurant-Utility-Apps dokumentiert.",
    "ServiceOS and additional UnderStack utilities are marked as products in development.":
      "ServiceOS und weitere UnderStack-Tools sind als Produkte in Entwicklung markiert.",

    // marketplace page
    "Code assets, templates and reusable developer products from UnderStack.": "Code-Assets, Vorlagen und wiederverwendbare Entwicklerprodukte von UnderStack.",
    "Marketplace for code assets and reusable software.": "Marketplace für Code-Assets und wiederverwendbare Software.",
    "UnderStack is developing a marketplace direction with templates, packaged apps and reusable software assets.":
      "UnderStack entwickelt eine Marketplace-Richtung mit Vorlagen, verpackten Apps und wiederverwendbaren Software-Assets.",
    "The Codester profile is used to distribute templates, apps and reusable code assets.":
      "Das Codester-Profil wird genutzt, um Vorlagen, Apps und wiederverwendbare Code-Assets zu vertreiben.",

    // insight default sections
    "There is no single correct price or solution. The right decision depends on goals, complexity, integrations, content, operations and how important the system is to the business.":
      "Es gibt keinen einzig richtigen Preis oder keine einzig richtige Lösung. Die richtige Entscheidung hängt von Zielen, Komplexität, Integrationen, Inhalten, Betrieb und der Bedeutung des Systems für das Unternehmen ab.",
    "The biggest drivers are user flows, data models, integrations, permission levels, design quality, SEO needs, performance and the need for ongoing iteration.":
      "Die größten Treiber sind Nutzerflüsse, Datenmodelle, Integrationen, Berechtigungsstufen, Designqualität, SEO-Anforderungen, Performance und der Bedarf an laufender Iteration.",
    "Scope and user roles": "Umfang und Nutzerrollen",
    "Data and integrations": "Daten und Integrationen",
    "Design and content": "Design und Inhalte",
    "Operations, security and maintenance": "Betrieb, Sicherheit und Wartung",
    "Start with a small, precise scope and expand based on real use. That reduces risk and makes the investment easier to control.":
      "Beginnen Sie mit einem kleinen, präzisen Umfang und erweitern Sie ihn basierend auf realer Nutzung. Das reduziert Risiko und macht die Investition leichter steuerbar.",

    // detailed insight: business website cost
    "Start with the decision, not a template": "Beginnen Sie mit der Entscheidung, nicht mit einer Vorlage",
    "A useful website budget starts with the job the site needs to do. A focused brochure site, a content-heavy marketing platform and a customer-facing web application may all look like websites from the outside, but they require very different planning, design and engineering work.":
      "Ein sinnvolles Website-Budget beginnt mit der Aufgabe, die die Website erfüllen soll. Eine fokussierte Broschürenseite, eine inhaltsstarke Marketingplattform und eine kundenorientierte Webanwendung mögen von außen alle wie Websites aussehen, erfordern aber sehr unterschiedliche Planung, Gestaltung und technische Umsetzung.",
    "What actually changes the scope?": "Was verändert den Umfang tatsächlich?",
    "The largest cost drivers are usually not visual details. They are the number of user journeys, the quality and availability of content, integrations with existing systems, language requirements, performance expectations, accessibility, analytics and the amount of custom functionality required after launch.":
      "Die größten Kostentreiber sind meist keine visuellen Details. Es sind die Anzahl der Nutzerreisen, die Qualität und Verfügbarkeit von Inhalten, Integrationen mit bestehenden Systemen, Sprachanforderungen, Performance-Erwartungen, Barrierefreiheit, Analytics und der Umfang an individueller Funktionalität nach dem Launch.",
    "Information architecture, content and conversion paths": "Informationsarchitektur, Inhalte und Conversion-Pfade",
    "Design depth and responsive behaviour": "Design-Tiefe und responsives Verhalten",
    "CMS, forms, booking, payments or CRM integrations": "CMS-, Formular-, Buchungs-, Zahlungs- oder CRM-Integrationen",
    "SEO migration, analytics and technical performance": "SEO-Migration, Analytics und technische Performance",
    "Custom customer areas, workflows or data models": "Individuelle Kundenbereiche, Arbeitsabläufe oder Datenmodelle",
    "Ongoing ownership, maintenance and iteration": "Laufende Verantwortung, Wartung und Iteration",
    "A practical way to budget": "Ein praktischer Ansatz für die Budgetierung",
    "Rather than asking for a single price before the scope is clear, split the work into three decisions: what must be true at launch, what can be measured after launch, and what belongs in a later iteration. This creates a credible first release without hiding future technical or content work inside a vague fixed quote.":
      "Statt vor einem klaren Umfang nach einem einzigen Preis zu fragen, teilen Sie die Arbeit in drei Entscheidungen auf: Was muss beim Launch stehen, was lässt sich nach dem Launch messen, und was gehört in eine spätere Iteration. So entsteht ein glaubwürdiger erster Release, ohne künftige technische Arbeit oder Content-Arbeit in einem vagen Festpreis zu verstecken.",
    "When a website becomes a web platform": "Wenn aus einer Website eine Webplattform wird",
    "A project stops being a conventional website when it needs user accounts, operational workflows, structured data, permissions, internal tools or recurring integrations. At that point, the right comparison is not between visual packages but between a lightweight product architecture and the operational value it needs to support.":
      "Ein Projekt hört auf, eine konventionelle Website zu sein, sobald Benutzerkonten, operative Arbeitsabläufe, strukturierte Daten, Berechtigungen, interne Tools oder wiederkehrende Integrationen benötigt werden. Dann geht es beim Vergleich nicht mehr um visuelle Pakete, sondern um eine schlanke Produktarchitektur und den operativen Wert, den sie unterstützen muss.",
    "Questions worth answering before requesting a proposal": "Fragen, die vor einer Angebotsanfrage beantwortet werden sollten",
    "A stronger brief helps both sides make better decisions. Define the business outcome, essential audience journeys, the content that exists today, systems that must connect, who owns decisions and what should be measurable after launch. That is more useful than selecting features from a generic checklist.":
      "Ein stärkeres Briefing hilft beiden Seiten, bessere Entscheidungen zu treffen. Definieren Sie das geschäftliche Ergebnis, wesentliche Zielgruppenreisen, die heute vorhandenen Inhalte, Systeme, die verbunden werden müssen, wer Entscheidungen verantwortet und was nach dem Launch messbar sein soll. Das ist nützlicher, als Funktionen von einer generischen Checkliste auszuwählen.",
    "Is a template website always the lower-cost option?": "Ist eine Website auf Vorlagenbasis immer die günstigere Option?",
    "It can reduce the initial build effort, especially for a simple site with ready content. It becomes less efficient when the business needs a distinct conversion flow, reliable integrations, unusual content structure or functionality that the template was not designed to support.":
      "Sie kann den anfänglichen Erstellungsaufwand reduzieren, besonders bei einer einfachen Website mit fertigen Inhalten. Sie wird weniger effizient, wenn das Unternehmen einen eigenen Conversion-Flow, zuverlässige Integrationen, eine ungewöhnliche Inhaltsstruktur oder Funktionen benötigt, für die die Vorlage nicht ausgelegt war.",
    "Should SEO be part of the initial website scope?": "Sollte SEO Teil des ursprünglichen Website-Umfangs sein?",
    "Yes. Page structure, redirects, metadata, content migration, performance and analytics are easier to handle during the build than after a site has already been launched and indexed.":
      "Ja. Seitenstruktur, Weiterleitungen, Metadaten, Content-Migration, Performance und Analytics lassen sich während der Entwicklung leichter handhaben als nach dem Launch und der Indexierung einer Website.",
    "How should a business compare website proposals?": "Wie sollte ein Unternehmen Website-Angebote vergleichen?",
    "Compare the defined outcome, scope boundaries, content responsibilities, technical ownership, launch process and what happens after launch. A proposal with a lower headline figure can still create more work later if these points are unclear.":
      "Vergleichen Sie das definierte Ergebnis, die Umfangsgrenzen, die Verantwortlichkeiten für Inhalte, die technische Verantwortung, den Launch-Prozess und was nach dem Launch passiert. Ein Angebot mit einer niedrigeren Kopfzahl kann später trotzdem mehr Arbeit verursachen, wenn diese Punkte unklar sind.",

    // insight index + article list
    "Insights | UnderStack guides on software, AI and web": "Einblicke | UnderStack-Leitfäden zu Software, KI und Web",
    "Guides about software development, AI solutions, restaurant software and web platforms in Denmark and Europe.":
      "Leitfäden zu Softwareentwicklung, KI-Lösungen, Restaurantsoftware und Webplattformen in Dänemark und Europa.",
    "Insights on software, web, AI and digital products.": "Einblicke zu Software, Web, KI und digitalen Produkten.",
    "Content hub": "Content-Hub",
    "Practical articles for companies making better decisions about software systems and digital products.":
      "Praktische Artikel für Unternehmen, die bessere Entscheidungen über Softwaresysteme und digitale Produkte treffen möchten.",
    "What you'll find here": "Was Sie hier finden",
    "Practical articles about pricing, technology choices and decisions companies can use before starting a software project.":
      "Praktische Artikel über Preisgestaltung, Technologieentscheidungen und Entscheidungen, die Unternehmen vor dem Start eines Softwareprojekts nutzen können.",
    "How much does software development cost in Denmark?": "Wie viel kostet Softwareentwicklung in Dänemark?",
    "A practical guide to the cost drivers behind software development in Denmark: scope, integrations, UX, data and maintenance.":
      "Ein praktischer Leitfaden zu den Kostentreibern der Softwareentwicklung in Dänemark: Umfang, Integrationen, UX, Daten und Wartung.",
    "How much does a business website cost in Denmark?": "Wie viel kostet eine Unternehmenswebsite in Dänemark?",
    "Website pricing in Denmark depends on content, design, technical complexity, SEO and integrations. This guide explains the main tradeoffs.":
      "Die Preisgestaltung für Websites in Dänemark hängt von Inhalten, Design, technischer Komplexität, SEO und Integrationen ab. Dieser Leitfaden erklärt die wichtigsten Abwägungen.",
    "When should a company choose custom software instead of SaaS? A practical comparison for operational systems and digital products.":
      "Wann sollte ein Unternehmen individuelle Software statt SaaS wählen? Ein praktischer Vergleich für Betriebssysteme und digitale Produkte.",
    "Restaurant management software in Denmark": "Restaurant-Management-Software in Dänemark",
    "Restaurant management software should support food cost, inventory, kitchen workflows, waste tracking and service operations.":
      "Restaurant-Management-Software sollte Food Cost, Lagerbestand, Küchenabläufe, Waste-Tracking und Servicebetrieb unterstützen.",
    "AI automation for European businesses": "KI-Automatisierung für europäische Unternehmen",
    "AI automation works best when it is tied to specific workflows, human review and measurable operational friction.":
      "KI-Automatisierung funktioniert am besten, wenn sie mit konkreten Arbeitsabläufen, menschlicher Kontrolle und messbarer betrieblicher Reibung verknüpft ist.",

    // screenshot captions
    "Design configuration": "Design-Konfiguration",
    "Restaurant access": "Restaurantzugriff",
    "Before UnderStack": "Vor UnderStack",
    "Modernized homepage": "Modernisierte Startseite",
    "Modernized sign-in": "Modernisierte Anmeldung",
  },
};

const words: Record<Locale, Record<string, string>> = {
  se: {
    "a": "en", "active": "aktiv", "additional": "ytterligare", "all": "alla", "also": "också", "an": "en", "and": "och", "any": "några", "app": "app", "apps": "appar", "are": "är", "around": "runt", "as": "som", "at": "på", "available": "tillgänglig", "based": "baserad", "be": "vara", "before": "innan", "better": "bättre", "business": "verksamhet", "businesses": "företag", "built": "byggd", "build": "bygger", "building": "bygger", "by": "av", "can": "kan", "case": "case", "cases": "case", "change": "ändra", "choices": "val", "clear": "tydlig", "client": "kund", "code": "kod", "companies": "företag", "company": "företag", "complete": "fullständig", "completed": "slutförd", "content": "innehåll", "cost": "kostnad", "create": "skapa", "current": "nuvarande", "custom": "skräddarsydd", "customers": "kunder", "daily": "daglig", "data": "data", "decision": "beslut", "denmark": "Danmark", "design": "design", "designing": "designar", "designs": "designar", "details": "detaljer", "develop": "utveckla", "developed": "utvecklad", "developing": "utvecklar", "development": "utveckling", "digital": "digital", "does": "gör", "each": "varje", "europe": "Europa", "every": "varje", "existing": "befintlig", "experience": "erfarenhet", "focused": "fokuserad", "for": "för", "from": "från", "goals": "mål", "has": "har", "help": "hjälpa", "how": "hur", "improve": "förbättra", "in": "i", "including": "inklusive", "independent": "oberoende", "inside": "inom", "into": "till", "is": "är", "it": "det", "its": "dess", "large": "stor", "launch": "lansering", "local": "lokal", "maintainable": "underhållbar", "modern": "modern", "more": "mer", "need": "behöva", "needs": "behöver", "new": "ny", "of": "av", "on": "på", "one": "en", "only": "endast", "or": "eller", "our": "vår", "people": "människor", "platform": "plattform", "practical": "praktisk", "professional": "professionell", "products": "produkter", "project": "projekt", "projects": "projekt", "provide": "erbjuda", "public": "offentlig", "quality": "kvalitet", "real": "verklig", "restaurant": "restaurang", "restaurants": "restauranger", "right": "rätt", "run": "driva", "running": "drift", "same": "samma", "see": "se", "service": "tjänst", "services": "tjänster", "small": "litet", "software": "mjukvara", "studio": "studio", "strong": "stark", "suitable": "lämplig", "systems": "system", "the": "den", "than": "än", "that": "som", "their": "deras", "them": "dem", "this": "denna", "through": "genom", "to": "att", "together": "tillsammans", "tools": "verktyg", "two": "två", "up": "upp", "use": "använda", "users": "användare", "web": "webb", "website": "webbplats", "websites": "webbplatser", "well": "väl", "what": "vad", "when": "när", "where": "där", "which": "vilken", "who": "som", "will": "kommer", "with": "med", "without": "utan", "work": "arbete", "workflows": "arbetsflöden", "your": "din",
    "recipes": "recept", "recipe": "recept", "inventory": "lager", "purchasing": "inköp", "production": "produktion", "reports": "rapporter", "report": "rapport", "hospitality": "hospitality", "firsthand": "egen", "operations": "drift", "operational": "operativ", "kitchen": "kök", "kitchens": "kök", "waste": "svinn", "pricing": "prissättning", "flow": "flöde", "execution": "genomförande", "day-to-day": "daglig", "assistant": "assistent", "assistants": "assistenter", "memory": "minne", "routing": "dirigering", "permissions": "behörigheter", "permission": "behörighet", "approvals": "godkännanden", "approval": "godkännande", "explicit": "uttrycklig", "device": "enhet", "documents": "dokument", "document": "dokument", "bills": "räkningar", "receipts": "kvitton", "subscriptions": "abonnemang", "shopping": "inköp", "notes": "anteckningar", "reminders": "påminnelser", "tasks": "uppgifter", "organisation": "organisation", "organization": "organisation", "everyday": "vardaglig", "planning": "planering", "assessment": "bedömning", "legacy": "legacy", "migration": "migrering", "modernization": "modernisering", "frontend": "frontend", "backend": "backend", "architecture": "arkitektur", "scalable": "skalbar", "structure": "struktur", "maintenance": "underhåll", "workforce": "personal", "scheduling": "schemaläggning", "availability": "tillgänglighet", "leave": "ledighet", "vacation": "semester", "contractual": "avtalsmässig", "limits": "gränser", "attendance": "närvaro", "notifications": "aviseringar", "replacement": "ersättning", "geofenced": "geofence-baserad", "desktop": "skrivbord", "agent": "agent", "diagnostics": "diagnostik", "patching": "patchning", "verified": "verifierad", "dashboard": "dashboard", "daemon": "daemon", "registration": "registrering", "storage": "lagring", "logs": "loggar", "profiles": "profiler", "status": "status", "selection": "val", "chat": "chatt", "whitelisted": "vitlistad", "commands": "kommandon", "pairing": "parkoppling", "token-protected": "tokenskyddad", "tunneled": "tunnlad", "connection": "anslutning", "installer": "installationsprogram", "prepared": "förberedd", "creative": "kreativ", "transforming": "transformera", "animating": "animera", "visual": "visuell", "generative": "generativa", "models": "modeller", "editing": "redigering", "library": "bibliotek", "real-time": "realtid", "retaining": "spara", "recordings": "inspelningar", "microphone": "mikrofon", "transcription": "transkription", "rolling": "löpande", "context": "kontext", "detection": "detektering", "suggested": "föreslagna", "answers": "svar", "conscious": "medveten", "session": "session", "programming": "programmering", "education": "utbildning", "autistic": "autistiska", "children": "barn", "sensory": "sensorisk", "settings": "inställningar", "feedback": "feedback", "supported": "stödd", "learning": "inlärning", "paths": "vägar", "focus": "fokus", "mode": "läge", "friendly": "vänlig", "error": "fel", "handling": "hantering", "editor": "redigerare", "guided": "guidad", "tutor": "handledare", "parent": "förälder", "multilingual": "flerspråkig", "servings": "portioner", "yield": "utbyte", "selling": "försäljnings", "price": "pris", "margin": "marginal", "persistence": "lagring", "logging": "registrering", "history": "historik", "filters": "filter", "insight": "insikt", "line": "linje", "engineering": "engineering", "checklist": "checklista", "shift": "skift", "optional": "valfri", "utilities": "verktyg", "reply": "svar", "obligations": "förpliktelser", "triggered": "utlöst", "intentional": "avsiktlig", "resurfacing": "återkallning", "commitments": "åtaganden", "talking": "samtal", "points": "punkter", "capture": "insamling", "safety": "säkerhet", "roles": "roller", "location": "plats", "zones": "zoner", "alerts": "larm", "health": "hälsa", "controls": "kontroller", "foundation": "grund", "identity": "identitet", "boundaries": "gränser", "manifests": "manifest", "audited": "granskad", "cross-product": "tvärprodukt",
  },
  de: {
    "a": "eine", "active": "aktive", "additional": "zusätzliche", "all": "alle", "also": "auch", "an": "ein", "and": "und", "any": "jede", "app": "App", "apps": "Apps", "are": "sind", "around": "rund", "as": "als", "at": "bei", "available": "verfügbar", "based": "basiert", "be": "sein", "before": "bevor", "better": "besser", "business": "Unternehmen", "businesses": "Unternehmen", "built": "entwickelt", "build": "entwickeln", "building": "entwickeln", "by": "von", "can": "kann", "case": "Projekt", "cases": "Projekte", "change": "ändern", "choices": "Entscheidungen", "clear": "klar", "client": "Kunde", "code": "Code", "companies": "Unternehmen", "company": "Unternehmen", "complete": "vollständig", "completed": "abgeschlossen", "content": "Inhalte", "cost": "Kosten", "create": "erstellen", "current": "aktuell", "custom": "individuell", "customers": "Kunden", "daily": "täglich", "data": "Daten", "decision": "Entscheidung", "denmark": "Dänemark", "design": "Design", "designing": "gestaltet", "designs": "gestaltet", "details": "Details", "develop": "entwickeln", "developed": "entwickelt", "developing": "entwickelt", "development": "Entwicklung", "digital": "digital", "does": "macht", "each": "jede", "europe": "Europa", "every": "jede", "existing": "bestehende", "experience": "Erfahrung", "focused": "fokussiert", "for": "für", "from": "von", "goals": "Ziele", "has": "hat", "help": "helfen", "how": "wie", "improve": "verbessern", "in": "in", "including": "einschließlich", "independent": "unabhängig", "inside": "innerhalb", "into": "in", "is": "ist", "it": "es", "its": "seine", "large": "groß", "launch": "Start", "local": "lokal", "maintainable": "wartbar", "modern": "modern", "more": "mehr", "need": "benötigen", "needs": "benötigt", "new": "neu", "of": "von", "on": "auf", "one": "ein", "only": "nur", "or": "oder", "our": "unser", "people": "Menschen", "platform": "Plattform", "practical": "praktisch", "professional": "professionell", "products": "Produkte", "project": "Projekt", "projects": "Projekte", "provide": "anbieten", "public": "öffentlich", "quality": "Qualität", "real": "real", "restaurant": "Restaurant", "restaurants": "Restaurants", "right": "richtig", "run": "betreiben", "running": "Betrieb", "same": "gleich", "see": "sehen", "service": "Leistung", "services": "Leistungen", "small": "klein", "software": "Software", "studio": "Studio", "strong": "stark", "suitable": "geeignet", "systems": "Systeme", "the": "die", "than": "als", "that": "dass", "their": "ihre", "them": "sie", "this": "dieses", "through": "durch", "to": "zu", "together": "zusammen", "tools": "Tools", "two": "zwei", "up": "auf", "use": "nutzen", "users": "Nutzer", "web": "Web", "website": "Website", "websites": "Websites", "well": "gut", "what": "was", "when": "wann", "where": "wo", "which": "welche", "who": "wer", "will": "wird", "with": "mit", "without": "ohne", "work": "Arbeit", "workflows": "Arbeitsabläufe", "your": "Ihre",
    "recipes": "Rezepte", "recipe": "Rezept", "inventory": "Lagerbestand", "purchasing": "Einkauf", "production": "Produktion", "reports": "Berichte", "report": "Bericht", "hospitality": "Gastgewerbe", "firsthand": "eigene", "operations": "Betrieb", "operational": "betrieblich", "kitchen": "Küche", "kitchens": "Küchen", "waste": "Verschwendung", "pricing": "Preisgestaltung", "flow": "Ablauf", "execution": "Umsetzung", "day-to-day": "täglich", "assistant": "Assistent", "assistants": "Assistenten", "memory": "Speicher", "routing": "Routing", "permissions": "Berechtigungen", "permission": "Berechtigung", "approvals": "Freigaben", "approval": "Freigabe", "explicit": "ausdrücklich", "device": "Gerät", "documents": "Dokumente", "document": "Dokument", "bills": "Rechnungen", "receipts": "Quittungen", "subscriptions": "Abonnements", "shopping": "Einkäufe", "notes": "Notizen", "reminders": "Erinnerungen", "tasks": "Aufgaben", "organisation": "Organisation", "organization": "Organisation", "everyday": "alltäglich", "planning": "Planung", "assessment": "Begutachtung", "legacy": "Legacy", "migration": "Migration", "modernization": "Modernisierung", "frontend": "Frontend", "backend": "Backend", "architecture": "Architektur", "scalable": "skalierbar", "structure": "Struktur", "maintenance": "Wartung", "workforce": "Personal", "scheduling": "Planung", "availability": "Verfügbarkeit", "leave": "Urlaub", "vacation": "Urlaub", "contractual": "vertraglich", "limits": "Grenzen", "attendance": "Anwesenheit", "notifications": "Benachrichtigungen", "replacement": "Vertretung", "geofenced": "geofence-basiert", "desktop": "Desktop", "agent": "Agent", "diagnostics": "Diagnose", "patching": "Patching", "verified": "verifiziert", "engineering": "Engineering", "dashboard": "Dashboard", "daemon": "Daemon", "registration": "Registrierung", "storage": "Speicherung", "logs": "Logs", "profiles": "Profile", "status": "Status", "selection": "Auswahl", "chat": "Chat", "whitelisted": "Whitelisted", "commands": "Befehle", "pairing": "Kopplung", "token-protected": "tokengeschützt", "tunneled": "getunnelt", "connection": "Verbindung", "installer": "Installer", "prepared": "vorbereitet", "creative": "kreativ", "transforming": "transformieren", "editing": "bearbeiten", "animating": "animieren", "visual": "visuell", "generative": "generative", "models": "Modelle", "library": "Bibliothek", "real-time": "Echtzeit", "retaining": "speichern", "recordings": "Aufnahmen", "microphone": "Mikrofon", "transcription": "Transkription", "rolling": "fortlaufend", "context": "Kontext", "detection": "Erkennung", "suggested": "vorgeschlagene", "answers": "Antworten", "conscious": "bewusst", "session": "Sitzung", "programming": "Programmierung", "education": "Bildung", "autistic": "autistische", "children": "Kinder", "sensory": "sensorisch", "settings": "Einstellungen", "feedback": "Feedback", "supported": "unterstützt", "learning": "Lern", "paths": "Pfade", "focus": "Fokus", "mode": "Modus", "friendly": "freundlich", "error": "Fehler", "handling": "Behandlung", "editor": "Editor", "guided": "geführt", "tutor": "Tutor", "parent": "Eltern", "multilingual": "mehrsprachig", "servings": "Portionen", "yield": "Ausbeute", "selling": "Verkaufs", "price": "Preis", "margin": "Marge", "persistence": "Speicherung", "logging": "Erfassung", "history": "Historie", "filters": "Filter", "insight": "Einblick", "line": "Linie", "checklist": "Checkliste", "shift": "Schicht", "optional": "optional", "utilities": "Tools", "reply": "Antwort", "obligations": "Verpflichtungen", "triggered": "ausgelöst", "intentional": "bewusst", "resurfacing": "Wiederauftauchen", "commitments": "Verpflichtungen", "talking": "Gesprächs", "points": "Punkte", "capture": "Erfassung", "safety": "Sicherheit", "roles": "Rollen", "location": "Standort", "zones": "Zonen", "alerts": "Alarme", "health": "Zustand", "controls": "Einstellungen", "foundation": "Grundlage", "identity": "Identität", "boundaries": "Grenzen", "manifests": "Manifeste", "audited": "auditiert", "cross-product": "produktübergreifend",
  },
};

function retainCase(source: string, replacement: string) {
  if (source === source.toUpperCase()) return replacement.toUpperCase();
  if (source[0] === source[0]?.toUpperCase()) return replacement[0]?.toUpperCase() + replacement.slice(1);
  return replacement;
}

/**
 * Public content is generated statically from the editorial English source.
 * Names, product identifiers and technical proper nouns remain unchanged.
 */
export function localizeText(value: string, language: Language) {
  if (language === "dk" || language === "en") return value;
  const locale = language as Locale;
  let result = value;

  // Phrase-level translations are swapped in as placeholders first, so the
  // word-level pass below (which scans for leftover English) never re-matches
  // already-translated Swedish/German text against the English dictionary.
  const placeholders: string[] = [];
  for (const [source, translation] of Object.entries(phrases[locale]).sort(([a], [b]) => b.length - a.length)) {
    if (!result.includes(source)) continue;
    result = result.replaceAll(source, () => {
      placeholders.push(translation);
      return `${placeholders.length - 1}`;
    });
  }

  result = result.replace(/\b[A-Za-z][A-Za-z-]*\b/g, (word) => {
    const translation = words[locale][word.toLowerCase()];
    return translation ? retainCase(word, translation) : word;
  });

  return result.replace(/(\d+)/g, (_, index) => placeholders[Number(index)]);
}
