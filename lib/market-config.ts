import type { MarketCode } from "./market";

export type MarketConfig = {
  code: MarketCode;
  locale: string; // BCP-47 locale
  currency: string; // ISO 4217
  currencySymbol: string;
  phoneCountryCode: string; // E.164 prefix
};

export const MARKET_CONFIG: Record<MarketCode, MarketConfig> = {
  NG: {
    code: "NG",
    locale: "en-NG",
    currency: "NGN",
    currencySymbol: "₦",
    phoneCountryCode: "+234",
  },
  GB: {
    code: "GB",
    locale: "en-GB",
    currency: "GBP",
    currencySymbol: "£",
    phoneCountryCode: "+44",
  },
  ZA: {
    code: "ZA",
    locale: "en-ZA",
    currency: "ZAR",
    currencySymbol: "R",
    phoneCountryCode: "+27",
  },
};

export function getMarketConfig(code: MarketCode): MarketConfig {
  return MARKET_CONFIG[code] ?? MARKET_CONFIG.GB;
}
