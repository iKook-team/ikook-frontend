import type { MarketCode } from "./market";

// Valid locations per market (mirror of backend City TextChoices)
export const NG_LOCATIONS: string[] = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

export const ZA_LOCATIONS: string[] = [
  "Eastern Cape","Free State","Gauteng","Kwazulu Natal","Limpopo","Mpumalanga",
  "North West","Northen Cape","Western Cape",
];

export const GB_LOCATIONS: string[] = [
  "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Bristol",
  "Sheffield", "Edinburgh", "Leicester", "Coventry", "Bradford", "Cardiff", "Belfast",
  "Nottingham", "Newcastle upon Tyne", "Southampton", "Portsmouth", "Brighton", "Plymouth",
  "Derby", "Stoke-on-Trent", "Wolverhampton", "Reading", "Northampton", "Milton Keynes",
  "Swindon", "Aberdeen", "Dundee", "York", "Cambridge", "Oxford",
];

export function getLocationsForMarket(market: MarketCode): string[] {
  switch (market) {
    case "NG":
      return NG_LOCATIONS;
    case "ZA":
      return ZA_LOCATIONS;
    case "GB":
    default:
      return GB_LOCATIONS;
  }
}

// Country-name based helpers (for forms that use country labels)
export function getLocationsForCountry(country: string): string[] {
  if (country === "Nigeria") return NG_LOCATIONS;
  if (country === "South Africa") return ZA_LOCATIONS;
  // Default to UK
  return GB_LOCATIONS; // "United Kingdom"
}

export function getCityOptionsFromCountry(country: string): { value: string; label: string }[] {
  return getLocationsForCountry(country).map((v) => ({ value: v, label: v }));
}
