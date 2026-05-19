import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Words',
  description: 'Essays, articles, and writing from Postmodern Tectonics.',
};

export default function WordsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
