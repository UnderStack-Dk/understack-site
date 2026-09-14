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
  },
};

const words: Record<Locale, Record<string, string>> = {
  se: {
    "a": "en", "active": "aktiv", "additional": "ytterligare", "all": "alla", "also": "också", "an": "en", "and": "och", "any": "några", "app": "app", "apps": "appar", "are": "är", "around": "runt", "as": "som", "at": "på", "available": "tillgänglig", "based": "baserad", "be": "vara", "before": "innan", "better": "bättre", "business": "verksamhet", "businesses": "företag", "built": "byggd", "build": "bygger", "building": "bygger", "by": "av", "can": "kan", "case": "case", "cases": "case", "change": "ändra", "choices": "val", "clear": "tydlig", "client": "kund", "code": "kod", "companies": "företag", "company": "företag", "complete": "fullständig", "completed": "slutförd", "content": "innehåll", "cost": "kostnad", "create": "skapa", "current": "nuvarande", "custom": "skräddarsydd", "customers": "kunder", "daily": "daglig", "data": "data", "decision": "beslut", "denmark": "Danmark", "design": "design", "designing": "designar", "designs": "designar", "details": "detaljer", "develop": "utveckla", "developed": "utvecklad", "developing": "utvecklar", "development": "utveckling", "digital": "digital", "does": "gör", "each": "varje", "europe": "Europa", "every": "varje", "existing": "befintlig", "experience": "erfarenhet", "focused": "fokuserad", "for": "för", "from": "från", "goals": "mål", "has": "har", "help": "hjälpa", "how": "hur", "improve": "förbättra", "in": "i", "including": "inklusive", "independent": "oberoende", "inside": "inom", "into": "till", "is": "är", "it": "det", "its": "dess", "large": "stor", "launch": "lansering", "local": "lokal", "maintainable": "underhållbar", "modern": "modern", "more": "mer", "need": "behöva", "needs": "behöver", "new": "ny", "of": "av", "on": "på", "one": "en", "only": "endast", "or": "eller", "our": "vår", "people": "människor", "platform": "plattform", "practical": "praktisk", "professional": "professionell", "products": "produkter", "project": "projekt", "projects": "projekt", "provide": "erbjuda", "public": "offentlig", "quality": "kvalitet", "real": "verklig", "restaurant": "restaurang", "restaurants": "restauranger", "right": "rätt", "run": "driva", "running": "drift", "same": "samma", "see": "se", "service": "tjänst", "services": "tjänster", "small": "litet", "software": "mjukvara", "studio": "studio", "strong": "stark", "suitable": "lämplig", "systems": "system", "the": "den", "than": "än", "that": "som", "their": "deras", "them": "dem", "this": "denna", "through": "genom", "to": "att", "together": "tillsammans", "tools": "verktyg", "two": "två", "up": "upp", "use": "använda", "users": "användare", "web": "webb", "website": "webbplats", "websites": "webbplatser", "well": "väl", "what": "vad", "when": "när", "where": "där", "which": "vilken", "who": "som", "will": "kommer", "with": "med", "without": "utan", "work": "arbete", "workflows": "arbetsflöden", "your": "din",
  },
  de: {
    "a": "eine", "active": "aktive", "additional": "zusätzliche", "all": "alle", "also": "auch", "an": "ein", "and": "und", "any": "jede", "app": "App", "apps": "Apps", "are": "sind", "around": "rund", "as": "als", "at": "bei", "available": "verfügbar", "based": "basiert", "be": "sein", "before": "bevor", "better": "besser", "business": "Unternehmen", "businesses": "Unternehmen", "built": "entwickelt", "build": "entwickeln", "building": "entwickeln", "by": "von", "can": "kann", "case": "Projekt", "cases": "Projekte", "change": "ändern", "choices": "Entscheidungen", "clear": "klar", "client": "Kunde", "code": "Code", "companies": "Unternehmen", "company": "Unternehmen", "complete": "vollständig", "completed": "abgeschlossen", "content": "Inhalte", "cost": "Kosten", "create": "erstellen", "current": "aktuell", "custom": "individuell", "customers": "Kunden", "daily": "täglich", "data": "Daten", "decision": "Entscheidung", "denmark": "Dänemark", "design": "Design", "designing": "gestaltet", "designs": "gestaltet", "details": "Details", "develop": "entwickeln", "developed": "entwickelt", "developing": "entwickelt", "development": "Entwicklung", "digital": "digital", "does": "macht", "each": "jede", "europe": "Europa", "every": "jede", "existing": "bestehende", "experience": "Erfahrung", "focused": "fokussiert", "for": "für", "from": "von", "goals": "Ziele", "has": "hat", "help": "helfen", "how": "wie", "improve": "verbessern", "in": "in", "including": "einschließlich", "independent": "unabhängig", "inside": "innerhalb", "into": "in", "is": "ist", "it": "es", "its": "seine", "large": "groß", "launch": "Start", "local": "lokal", "maintainable": "wartbar", "modern": "modern", "more": "mehr", "need": "benötigen", "needs": "benötigt", "new": "neu", "of": "von", "on": "auf", "one": "ein", "only": "nur", "or": "oder", "our": "unser", "people": "Menschen", "platform": "Plattform", "practical": "praktisch", "professional": "professionell", "products": "Produkte", "project": "Projekt", "projects": "Projekte", "provide": "anbieten", "public": "öffentlich", "quality": "Qualität", "real": "real", "restaurant": "Restaurant", "restaurants": "Restaurants", "right": "richtig", "run": "betreiben", "running": "Betrieb", "same": "gleich", "see": "sehen", "service": "Leistung", "services": "Leistungen", "small": "klein", "software": "Software", "studio": "Studio", "strong": "stark", "suitable": "geeignet", "systems": "Systeme", "the": "die", "than": "als", "that": "dass", "their": "ihre", "them": "sie", "this": "dieses", "through": "durch", "to": "zu", "together": "zusammen", "tools": "Tools", "two": "zwei", "up": "auf", "use": "nutzen", "users": "Nutzer", "web": "Web", "website": "Website", "websites": "Websites", "well": "gut", "what": "was", "when": "wann", "where": "wo", "which": "welche", "who": "wer", "will": "wird", "with": "mit", "without": "ohne", "work": "Arbeit", "workflows": "Arbeitsabläufe", "your": "Ihre",
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

  for (const [source, translation] of Object.entries(phrases[locale]).sort(([a], [b]) => b.length - a.length)) {
    result = result.replaceAll(source, translation);
  }

  return result.replace(/\b[A-Za-z][A-Za-z-]*\b/g, (word) => {
    const translation = words[locale][word.toLowerCase()];
    return translation ? retainCase(word, translation) : word;
  });
}
