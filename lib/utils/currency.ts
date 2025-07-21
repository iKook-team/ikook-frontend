export function getCurrencySymbol(user?: { currency?: string; country?: string }): string {
  if (user?.currency) {
    if (user.currency === "NGN") return "₦";
    if (user.currency === "ZAR") return "R";
    if (user.currency === "GBP") return "£";
  }
  if (user?.country) {
    if (user.country === "Nigeria") return "₦";
    if (user.country === "South Africa") return "R";
    if (user.country === "United Kingdom") return "£";
  }
  return "₦";
} 