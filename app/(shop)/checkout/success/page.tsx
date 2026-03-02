'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle size={80} className="text-emerald-400" />
        </div>
        <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl text-white/60 mb-8 max-w-lg mx-auto">
          Your order has been confirmed. You'll receive an NFT receipt on-chain shortly.
        </p>
        <div className="space-y-4">
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
          <Link href="/products" className="btn-secondary inline-block ml-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
