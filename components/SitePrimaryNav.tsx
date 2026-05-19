import Link from 'next/link';
import { PRIMARY_SITE_NAV } from '@/lib/siteNav';

type Props = {
  /** Use sr-only on home (visual nav is in Hero); visible elsewhere if needed */
  className?: string;
};

/** Crawlable text links to main sections — reinforces sitelinks vs. deep article/product URLs. */
export default function SitePrimaryNav({ className = 'sr-only' }: Props) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 list-none p-0 m-0">
        {PRIMARY_SITE_NAV.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
