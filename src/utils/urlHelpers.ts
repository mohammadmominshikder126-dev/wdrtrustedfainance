/**
 * Convert English numbers to Bengali numerals
 */
export function toBengaliNumber(num: number | string): string {
  if (num === undefined || num === null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

/**
 * Format currency with Bengali Taka sign
 */
export function formatTaka(amount: number): string {
  const formatted = Math.floor(amount).toLocaleString('en-IN');
  return `৳${toBengaliNumber(formatted)}`;
}

/**
 * Sanitize telegram URLs to ensure direct browser redirect
 */
export function formatTelegramUrl(input: string): string {
  if (!input) return 'https://t.me/';
  const clean = input.trim();
  if (clean.startsWith('https://t.me/') || clean.startsWith('http://t.me/')) {
    return clean;
  }
  if (clean.startsWith('t.me/')) {
    return `https://${clean}`;
  }
  if (clean.startsWith('@')) {
    return `https://t.me/${clean.substring(1)}`;
  }
  return `https://t.me/${clean}`;
}

/**
 * Sanitize WhatsApp URL
 */
export function formatWhatsAppUrl(numberOrUrl: string): string {
  if (!numberOrUrl) return 'https://wa.me/';
  const clean = numberOrUrl.trim();
  if (clean.startsWith('https://wa.me/') || clean.startsWith('http://wa.me/')) {
    return clean;
  }
  const digits = clean.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}`;
}
