'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 text-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.05]" />
      <div className="container relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            The Future of Shopping
          </span>
          <br />
          <span className="inline-block animate-gradient-x bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
            Is On-Chain
          </span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-muted-foreground">
          Explore a curated marketplace of unique digital, physical, and NFT products. Welcome to the new era of commerce.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="#products">Explore Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
