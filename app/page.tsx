'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, Zap, Shield, Users } from 'lucide-react';

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const features = [
    { icon: ShoppingCart, title: "Global Commerce", description: "Buy physical & digital products seamlessly" },
    { icon: Zap, title: "Instant Payments", description: "Crypto transactions confirmed in seconds" },
    { icon: Shield, title: "Secure & Verifiable", description: "Blockchain-backed transactions with NFT receipts" },
    { icon: Users, title: "DAO Governance", description: "Community votes on platform decisions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text-blue">
            ZAYX-OS
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/products" className="text-white/80 hover:text-white transition">Products</Link>
            <Link href="/dao" className="text-white/80 hover:text-white transition">DAO</Link>
            <button className="btn-primary">Connect Wallet</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-24 px-6 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Gradient Orb Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl opacity-50"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item} className="inline-block mb-6">
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-cyan-400 text-sm font-semibold">🚀 Next-Gen Web3 Commerce</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={item}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text-blue">The Future</span>
            <br />
            <span className="gradient-text-pink">of Shopping</span>
            <br />
            <span className="text-white">Is On-Chain</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={item}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          >
            Buy anything with crypto. Get NFT receipts. Vote on the platform's future. Welcome to decentralized commerce.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex gap-4 justify-center mb-20 flex-wrap">
            <Link href="/products" className="btn-primary flex items-center gap-2">
              Enter the Store
              <ArrowRight size={20} />
            </Link>
            <button className="btn-secondary">Learn More</button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="glass p-4 rounded-xl">
              <div className="text-2xl font-bold text-cyan-400">2.5k</div>
              <div className="text-sm text-white/60">Products</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-2xl font-bold text-violet-400">$4.2M</div>
              <div className="text-sm text-white/60">Total Volume</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-2xl font-bold text-emerald-400">8.5k</div>
              <div className="text-sm text-white/60">Members</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Why ZAYX-OS?</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Built for the Web3 generation. Everything you need to shop, earn, and govern.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="glass p-8 rounded-2xl hover:bg-white/10 transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">ZAYX-OS</h4>
            <p className="text-white/60">Decentralized commerce for everyone.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/products" className="hover:text-white transition">Browse</Link></li>
              <li><Link href="/products?type=physical" className="hover:text-white transition">Physical</Link></li>
              <li><Link href="/products?type=digital" className="hover:text-white transition">Digital</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/dao" className="hover:text-white transition">DAO</Link></li>
              <li><a href="#" className="hover:text-white transition">Discord</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex justify-between items-center">
          <p className="text-white/40">© 2026 ZAYX-OS. All rights reserved.</p>
          <div className="text-white/40 text-sm">Powered by Web3 • pnpm</div>
        </div>
      </footer>
    </div>
  );
}


