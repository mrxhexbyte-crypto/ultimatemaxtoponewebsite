'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCommerce } from '@/lib/commerce-context';
import { createCheckoutSession } from '@/lib/stripe-checkout';
import Link from 'next/link';
import { Trash2, Loader } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCommerce();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleCheckout = async () => {
    if (cart.length === 0 || !email) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const checkoutItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const result = await createCheckoutSession(checkoutItems);

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('[v0] Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510]">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">Checkout</h1>
          <p className="text-white/60 text-lg mb-8">Your cart is empty</p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510]">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">${(item.price * item.quantity * 2400).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 transition text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="glass p-8 rounded-xl h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Complete Purchase</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white/60 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/60 mb-2">
                  <span>Subtotal</span>
                  <span>${(totalPrice() * 2400).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60 mb-4">
                  <span>Processing Fee</span>
                  <span>${(totalPrice() * 2400 * 0.029).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-cyan-400">
                  <span>Total</span>
                  <span>${(totalPrice() * 2400 * 1.029).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-white/60 hover:text-white transition text-sm"
            >
              Clear Cart
            </button>

            <p className="text-xs text-white/40 mt-4 text-center">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

