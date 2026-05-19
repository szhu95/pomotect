/** Primary site sections — used for JSON-LD and crawlable nav (Google sitelinks). */
export const PRIMARY_SITE_NAV = [
  { name: 'Objects', path: '/products' },
  { name: 'Words', path: '/words' },
  { name: 'Sounds', path: '/sounds' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
] as const;

export function siteUrl(path = '') {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://pomotect.com';
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
