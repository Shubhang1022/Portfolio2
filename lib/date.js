// Deterministic date formatter to avoid hydration mismatches from toLocaleDateString
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatDate(input, long = false) {
  const d = new Date(input);
  if (isNaN(d)) return String(input);
  const m = long ? MONTHS_LONG[d.getUTCMonth()] : MONTHS[d.getUTCMonth()];
  return `${m} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
