/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { Language } from "../seoContent";

export type CurrencyCode = "DKK" | "SEK" | "NOK" | "EUR" | "GBP" | "USD";

type CurrencyContextValue = {
  currency: CurrencyCode;
  currencyOptions: { value: CurrencyCode; label: string }[];
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (dkkAmount: number, language: Language) => string;
};

const STORAGE_KEY = "understack-currency";
const currencyOptions = [
  { value: "DKK", label: "DKK - Danish krone" },
  { value: "SEK", label: "SEK - Swedish krona" },
  { value: "NOK", label: "NOK - Norwegian krone" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British pound" },
  { value: "USD", label: "USD - US dollar" },
] as const;

const fallbackRates: Record<CurrencyCode, number> = {
  DKK: 1,
  EUR: 0.13378,
  NOK: 1.4311,
  SEK: 1.4916,
  GBP: 0.11492,
  USD: 0.15588,
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrencyCode(value: string | null): value is CurrencyCode {
  return value === "DKK" || value === "SEK" || value === "NOK" || value === "EUR" || value === "GBP" || value === "USD";
}

function localeFor(language: Language) {
  return language === "dk" ? "da-DK" : language === "se" ? "sv-SE" : "en-DK";
}

function formatAmount(value: number, currency: CurrencyCode, language: Language) {
  const locale = localeFor(language);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("DKK");
  const [rates, setRates] = useState(fallbackRates);

  useEffect(() => {
    const savedCurrency = window.localStorage.getItem(STORAGE_KEY);
    const restoreSavedCurrency = window.setTimeout(() => {
      if (isCurrencyCode(savedCurrency)) setCurrencyState(savedCurrency);
    }, 0);
    let active = true;
    fetch("/api/exchange-rates")
      .then(async (response) => {
        if (!response.ok) throw new Error("Exchange rates unavailable");
        return response.json() as Promise<{ rates?: Partial<Record<CurrencyCode, number>> }>;
      })
      .then((payload) => {
        if (!active || !payload.rates) return;
        const nextRates = { ...fallbackRates };
        for (const code of Object.keys(fallbackRates) as CurrencyCode[]) {
          const rate = payload.rates[code];
          if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) nextRates[code] = rate;
        }
        setRates(nextRates);
      })
      .catch(() => {
        // The displayed DKK base price remains valid when the live rate is unavailable.
      });

    return () => {
      active = false;
      window.clearTimeout(restoreSavedCurrency);
    };
  }, []);

  const value = useMemo<CurrencyContextValue>(() => ({
    currency,
    currencyOptions: [...currencyOptions],
    setCurrency(nextCurrency) {
      setCurrencyState(nextCurrency);
      window.localStorage.setItem(STORAGE_KEY, nextCurrency);
    },
    formatPrice(dkkAmount, language) {
      const base = `DKK ${new Intl.NumberFormat(localeFor(language)).format(dkkAmount)}`;
      if (currency === "DKK") return base;

      const converted = formatAmount(dkkAmount * rates[currency], currency, language);
      return `${base} (${language === "dk" || language === "se" ? "ca." : "approx."} ${converted})`;
    },
  }), [currency, rates]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
