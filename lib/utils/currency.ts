import { MARKET_CONFIG } from "../market-config";

export function getCurrencySymbol(
  data?: {
    currency?: string;
    country?: string;
    chef?: {
      currency?: string;
      country?: string;
    };
  },
  market?: string,
): string {
  // 1. Try direct currency
  const currency = data?.currency || data?.chef?.currency;
  if (currency) {
    const c = String(currency).toUpperCase();
    if (c === "NGN" || c === "₦") return "₦";
    if (c === "ZAR" || c === "R") return "R";
    if (c === "GBP" || c === "£") return "£";
  }

  // 2. Try direct country
  const country = data?.country || data?.chef?.country;
  if (country) {
    const co = String(country).toLowerCase();
    if (co === "nigeria" || co === "ng") return "₦";
    if (co === "south africa" || co === "za" || co === "southafrica") return "R";
    if (co === "united kingdom" || co === "uk" || co === "gb") return "£";
  }

  // 3. Fallback to market
  if (market) {
    const m = String(market).toUpperCase();
    if (m === "NG") return "₦";
    if (m === "ZA") return "R";
    if (m === "GB" || m === "UK") return "£";
  }

  // 4. Global default based on common knowledge of the app's primary market
  return "₦";
}
