import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import { COMPANY_PHONE_DISPLAY, smsHref } from "../lib/contact";
import type { Language } from "../seoContent";

type SmsContactLinkProps = {
  language: Language;
  location: string;
  className?: string;
  children: React.ReactNode;
};

export function SmsContactLink({ language, location, className, children }: SmsContactLinkProps) {
  return (
    <a
      href={smsHref(language)}
      data-analytics-location={location}
      className={className}
    >
      {children}
    </a>
  );
}

export function CopyPhoneButton({ language, className }: { language: Language; className?: string }) {
  const [copied, setCopied] = useState(false);
  const label = copied
    ? language === "dk"
      ? "Kopieret"
      : language === "se"
        ? "Kopierat"
        : "Copied"
    : language === "dk"
      ? "Kopiér nummer"
      : language === "se"
        ? "Kopiera nummer"
        : "Copy number";

  async function copyPhoneNumber() {
    try {
      await navigator.clipboard.writeText(COMPANY_PHONE_DISPLAY);
      setCopied(true);
      trackEvent("phone_copy", { location: "footer" });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copyPhoneNumber} className={className} aria-label={label}>
      {label}
    </button>
  );
}
