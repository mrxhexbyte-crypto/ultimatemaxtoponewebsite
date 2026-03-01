'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-slate-400 mb-8">Start shopping to add items to your cart.</p>
          <Link href="/products" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="space-y-4 mb-8">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-6 bg-slate-800/30 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{item.image}</span>
                <div>
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-cyan-400">{item.price} ETH</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded"
                  >
                    −
                  </button>
                  <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded"
                  >
                    +
                  </button>
                </div>

                <span className="text-white font-bold w-24 text-right">
                  {(item.price * item.quantity).toFixed(2)} ETH
                </span>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded font-medium transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-white">Subtotal:</span>
            <span className="text-xl font-bold text-cyan-400">{total.toFixed(2)} ETH</span>
          </div>
          <div className="text-sm text-slate-400 mb-6">
            Gas fees will be calculated at checkout
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/products" className="flex-1 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition text-center">
            Continue Shopping
          </Link>
          <Link href="/checkout" className="flex-1 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition text-center">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
