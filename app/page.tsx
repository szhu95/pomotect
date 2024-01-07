"use client"
import Image from 'next/image'
import { Header, Hero } from '@/components'
import Head from 'next/head';
import { storefront } from '@/utils';

export default function Home() {

  return (
    <main className="overflow-hidden">
      <Hero />
    </main>
  )
}
