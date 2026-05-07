// NOK kainų ir kitų formatų utility
// Pastaba: brand strategija — viena valiuta NOK; visi `formatPrice` callai naudoja šį wrapper'į.

const NOK_FORMATTER = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: 'NOK',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(value) {
  if (value === null || value === undefined || isNaN(value)) return '';
  return NOK_FORMATTER.format(Number(value));
}

export function formatPriceCompact(value) {
  if (value === null || value === undefined || isNaN(value)) return '';
  return `${Math.round(Number(value))} kr`;
}

export function calcDiscount(price, compareAtPrice) {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  const percent = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  return percent > 0 ? percent : null;
}

export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
