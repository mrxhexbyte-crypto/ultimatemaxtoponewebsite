'use client';

import { ConnectButton } from '@coinbase/onchainkit/wallet';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const { products, addToCart } = useCommerce();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510]">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text-blue">
            ZAYX-OS
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/cart" className="flex items-center gap-2 text-white/80 hover:text-white transition">
              <ShoppingCart size={20} />
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Product Catalog</h1>
          <p className="text-xl text-white/60">Explore our Web3 commerce collection. Buy with crypto, earn NFT receipts.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="glass p-6 rounded-xl hover:bg-white/10 transition group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition">{product.image}</div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-white/60 mb-4 text-sm h-20 overflow-hidden">{product.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-cyan-400 font-bold text-lg">{product.price} ETH</p>
                  <p className="text-xs text-white/40">${(product.price * 2400).toFixed(2)}</p>
                </div>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/60">
                  {product.category}
                </span>
              </div>

              <button
                onClick={() => addToCart(product, 1)}
                className="btn-primary w-full"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

