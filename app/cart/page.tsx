'use client';

import { useCart } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CartPage = () => {
  const { items, totalItems, totalPriceUsd, clearCart } = useCart();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Your Cart</h1>
      {items.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div>
            <div className="border rounded-lg p-6 bg-background/50">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total Items:</span>
                <span>{totalItems()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total Price:</span>
                <span>${totalPriceUsd().toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">Proceed to Checkout</Button>
              <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-background/50">
          <h2 className="text-2xl font-bold">Your cart is empty.</h2>
          <p className="text-muted-foreground mt-2">Explore our products and start building your on-chain future.</p>
          <Button asChild className="mt-6">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </main>
  );
};

export default CartPage;
