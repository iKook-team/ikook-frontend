export type MarketCode = "NG" | "GB" | "ZA";

export function mapCountryCodeToMarket(code?: string): MarketCode {
  switch ((code || "").toUpperCase()) {
    case "NG":
      return "NG";
    case "GB":
    case "UK": // handle non-ISO input just in case
      return "GB";
    case "ZA":
      return "ZA";
    default:
      return "GB"; // default to UK if outside the three markets
  }
}
