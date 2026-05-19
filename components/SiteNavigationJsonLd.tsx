import { PRIMARY_SITE_NAV, siteUrl } from '@/lib/siteNav';

/** Helps search engines understand main sections (influences sitelinks over time). */
export default function SiteNavigationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl('/')}#website`,
        url: siteUrl('/'),
        name: 'Postmodern Tectonics',
        description: 'A b2b of ideas...',
        publisher: { '@id': `${siteUrl('/')}#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl('/')}#organization`,
        name: 'Postmodern Tectonics LLC',
        url: siteUrl('/'),
        sameAs: ['https://www.instagram.com/pomotect/'],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl('/')}#primary-nav`,
        name: 'Site sections',
        itemListElement: PRIMARY_SITE_NAV.map((item, index) => ({
          '@type': 'SiteNavigationElement',
          position: index + 1,
          name: item.name,
          url: siteUrl(item.path),
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
