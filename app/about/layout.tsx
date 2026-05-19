import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Postmodern Tectonics LLC is a creative label. We design brands, buildings, products, and objects.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
