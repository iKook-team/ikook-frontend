import type { MarketCode } from "./market";

import { getMarketConfig } from "./market-config";

export function formatCurrency(
  amount: number,
  market: MarketCode,
  options?: Intl.NumberFormatOptions,
): string {
  const cfg = getMarketConfig(market);

  return new Intl.NumberFormat(cfg.locale, {
    style: "currency",
    currency: cfg.currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
    ...options,
  }).format(amount);
}

export function formatNumber(
  value: number,
  market: MarketCode,
  options?: Intl.NumberFormatOptions,
): string {
  const cfg = getMarketConfig(market);

  return new Intl.NumberFormat(cfg.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
    ...options,
  }).format(value);
}

export function formatDate(
  date: Date | string | number,
  market: MarketCode,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  const cfg = getMarketConfig(market);

  return new Intl.DateTimeFormat(cfg.locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  }).format(d);
}

export function getDialCode(market: MarketCode): string {
  return getMarketConfig(market).phoneCountryCode;
}
