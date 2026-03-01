'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

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
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-8">Your cart is empty</p>
            <Link href="/products" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-300">Cart feature coming soon with Web3 integration</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p className="text-sm sm:text-base">ZAYX-OS - Decentralized Commerce Platform</p>
        </div>
      </footer>
    </div>
  );
}

