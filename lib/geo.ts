export async function getCountryCodeFromIP(ip?: string): Promise<string | undefined> {
  try {
    // Using ipapi.co which supports no-auth simple lookups
    // If ip is provided, call the ip-specific endpoint; otherwise autodetect
    const endpoint = ip ? `https://ipapi.co/${encodeURIComponent(ip)}/json/` : `https://ipapi.co/json/`;
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { country_code?: string };
    return (data.country_code || "").toUpperCase() || undefined;
  } catch {
    return undefined;
  }
}
