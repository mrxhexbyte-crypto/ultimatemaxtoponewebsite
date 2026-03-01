'use client';

import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-cyan-400 transition">
            ZAYX-OS
          </Link>
          <Link href="/" className="px-4 sm:px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium text-sm sm:text-base transition">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">All Products</h1>
        <p className="text-slate-400 mb-8">Browse our complete catalog of Web3 products and digital collectibles</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="rounded-lg bg-slate-800/30 border border-slate-700 p-6 hover:border-cyan-500/50 transition"
            >
              <div className="w-full h-40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg mb-4 flex items-center justify-center text-5xl">
                {product.image}
              </div>
              <h3 className="text-lg font-bold text-white">{product.name}</h3>
              <p className="text-slate-300 text-sm mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-cyan-400 font-bold">{product.price} ETH</p>
                <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">{product.category}</span>
              </div>
              <button className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-medium transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p className="text-sm sm:text-base">ZAYX-OS - Decentralized Commerce Platform</p>
          <p className="text-xs sm:text-sm mt-2">Web3 enabled. Community driven. Open source.</p>
        </div>
      </footer>
    </div>
  );
}

