import type { Language } from "../seoContent";

export const COMPANY_PHONE_DISPLAY = "+45 91 40 67 22";
export const COMPANY_PHONE_INTERNATIONAL = "+4591406722";

const smsMessages: Record<Language, string> = {
  dk: "Hej UnderStack,\n\nJeg er interesseret i at høre mere om et projekt.",
  en: "Hi UnderStack,\n\nI'm interested in discussing a project.",
  se: "Hej UnderStack,\n\nJag är intresserad av att prata om ett projekt.",
  de: "Hallo UnderStack,\n\nich möchte gern über ein Projekt sprechen.",
};

export function smsHref(language: Language) {
  const usesAppleSmsSeparator =
    typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = usesAppleSmsSeparator ? "&" : "?";

  return `sms:${COMPANY_PHONE_INTERNATIONAL}${separator}body=${encodeURIComponent(smsMessages[language])}`;
}
