'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <Link href="/products" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress || !email) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Order placed! Total: ${total.toFixed(2)} ETH\nTransaction initiated...`);
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      setOrderPlaced(false);
      setWalletAddress('');
      setEmail('');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-4xl font-bold text-white mb-4">Order Placed!</h1>
          <p className="text-slate-400 mb-8">Check your email for order confirmation and tracking details.</p>
          <Link href="/" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Wallet Details</h2>
                <input
                  type="text"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 mb-4"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} ETH</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total:</span>
                    <span className="text-cyan-400">{total.toFixed(2)} ETH</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Complete Payment
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Order Items</h2>
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.image} {item.name}</span>
                    <span className="text-cyan-400 font-bold">×{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
