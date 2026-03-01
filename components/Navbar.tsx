'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-white font-display tracking-wider">
              NEXUS
            </Link>
            <div className="hidden md:flex md:space-x-8">
              <Link href="/products" className="text-neutral-300 hover:text-white transition-colors duration-200">
                Products
              </Link>
              <Link href="/about" className="text-neutral-300 hover:text-white transition-colors duration-200">
                About
              </Link>
               <Link href="/admin" className="text-neutral-300 hover:text-white transition-colors duration-200">
                Admin
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectButton />
            <Link href="/cart" className="relative text-neutral-300 hover:text-white transition-colors duration-200">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
