
import { ProductGrid } from '@/components/shop/ProductGrid';
import { products } from '@/data/products';
import React from 'react';

const ShopPage = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center">
        Explore the ZAYX-OS Ecosystem
      </h1>
      <p className="mb-12 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
        Discover next-generation hardware, software, and digital assets. Welcome to the future of decentralized commerce.
      </p>
      <ProductGrid products={products} />
    </main>
  );
};

export default ShopPage;
