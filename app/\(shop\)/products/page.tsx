'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

export default function ProductsPage() {
  const [filter, setFilter] = useState<'all' | 'physical' | 'digital' | 'nft'>('all');
  const { addToCart } = useCart();

  const filteredProducts = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-12">All Products</h1>

        <div className="flex gap-2 mb-8 flex-wrap">
          {(['all', 'physical', 'digital', 'nft'] as const).map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                filter === category
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Link key={product.id} href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="rounded-lg bg-slate-800/30 border border-slate-700 p-6 hover:border-cyan-500/50 transition cursor-pointer h-full">
                <div className="text-6xl mb-4">{product.image}</div>
                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                <p className="text-slate-400 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-bold">{product.price} ETH</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-medium transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
