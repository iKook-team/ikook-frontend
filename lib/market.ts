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
      return "NG"; // default to NG if outside the three markets
  }
}
