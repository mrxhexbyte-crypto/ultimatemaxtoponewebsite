'use client';

import { ConnectButton } from '@coinbase/onchainkit/wallet';
import { useCommerce } from '@/lib/commerce-context';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCommerce();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    // Prepare charge data for Coinbase Commerce
    const chargeData = {
      name: 'ZAYX-OS Order',
      description: `${cart.length} items`,
      local_price: {
        amount: totalPrice().toFixed(2),
        currency: 'USD',
      },
      pricing_type: 'fixed_price',
      redirect_url: `${window.location.origin}/checkout/success`,
      cancel_url: `${window.location.origin}/cart`,
    };
    
    console.log('[v0] Checkout initiated with data:', chargeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#050510]">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text-blue">
            ZAYX-OS
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-white/60">Cart ({cart.length})</span>
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg mb-8">Your cart is empty</p>
            <Link href="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="glass p-6 rounded-xl flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-white/60 text-sm mb-2">{item.description}</p>
                    <p className="text-cyan-400 font-bold">{item.price} ETH</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-white/60 hover:text-white"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-white/60 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass p-8 rounded-xl h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{totalPrice().toFixed(3)} ETH</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Network Fee</span>
                  <span>0.002 ETH</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-cyan-400">{(totalPrice() + 0.002).toFixed(3)} ETH</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-primary w-full mb-3"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                className="btn-secondary w-full text-center block"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="w-full mt-3 text-white/60 hover:text-white transition text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

