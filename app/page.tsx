'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.slice(0, 6).filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const testimonials = [
    { name: 'Alex Chen', role: 'Web3 Developer', text: 'ZAYX-OS revolutionized how I manage digital assets.' },
    { name: 'Sarah Johnson', role: 'NFT Collector', text: 'The NFT receipt system is game-changing.' },
    { name: 'Marcus Williams', role: 'DAO Member', text: 'Seamless governance integration!' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white">ZAYX-OS</h1>
            <div className="flex gap-2 sm:gap-4 items-center">
              <Link href="/cart" className="relative px-3 sm:px-4 py-2 bg-cyan-600/20 border border-cyan-600 text-cyan-400 rounded-lg hover:bg-cyan-600/30 font-medium text-sm sm:text-base transition">
                Cart
              </Link>
              <button className="px-4 sm:px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-medium text-sm sm:text-base transition">
                Connect Wallet
              </button>
            </div>
          </div>
          <input 
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-cyan-500"
          />
        </div>
      </header>

      <main>
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              Web3 E-Commerce
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-12 max-w-3xl mx-auto">
              Decentralized marketplace for physical and digital products. Crypto payments, NFT receipts, DAO governance.
            </p>
            <Link href="/products" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 font-bold text-sm sm:text-base transition">
              Launch App
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="p-6 sm:p-8 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Crypto Payments</h3>
                <p className="text-sm sm:text-base text-slate-400">ETH, USDC, USDT, DAI with instant settlement.</p>
              </div>
              <div className="p-6 sm:p-8 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">NFT Receipts</h3>
                <p className="text-sm sm:text-base text-slate-400">Automatic ERC-721 minting for proof of purchase.</p>
              </div>
              <div className="p-6 sm:p-8 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">DAO Governance</h3>
                <p className="text-sm sm:text-base text-slate-400">Community voting and treasury control.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Featured Products</h2>
              <Link href="/products" className="text-cyan-400 hover:text-cyan-300 font-bold">View All →</Link>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No products found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="rounded-lg bg-slate-800/30 border border-slate-700 p-4 sm:p-6 hover:border-cyan-500/50 transition cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg mb-4 flex items-center justify-center text-5xl">
                      {product.image}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{product.name}</h3>
                    <p className="text-cyan-400 font-bold mt-2">{product.price} ETH</p>
                    <Link 
                      href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="mt-4 block w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm sm:text-base rounded font-medium transition text-center"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Community Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="p-6 sm:p-8 rounded-lg bg-slate-800/30 border border-slate-700">
                  <p className="text-slate-300 mb-4 text-sm sm:text-base">"{testimonial.text}"</p>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8 text-sm sm:text-base">Connect your wallet and join the Web3 commerce revolution.</p>
            <Link href="/products" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Shop Now
            </Link>
          </div>
        </section>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProduct(null)}>
            <div className="bg-slate-900 rounded-lg p-6 max-w-sm w-full border border-slate-700" onClick={(e) => e.stopPropagation()}>
              <div className="text-6xl mb-4 text-center">{selectedProduct.image}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h2>
              <p className="text-slate-300 mb-4">{selectedProduct.description}</p>
              <p className="text-cyan-400 text-xl mb-4">{selectedProduct.price} ETH</p>
              <Link 
                href={`/products/${selectedProduct.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedProduct(null)}
                className="block w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-bold transition text-center mb-2"
              >
                View Full Details
              </Link>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
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

