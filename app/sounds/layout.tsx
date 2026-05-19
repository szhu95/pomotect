import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sounds',
  description: 'Music, mixes, and listening from Postmodern Tectonics.',
};

export default function SoundsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
