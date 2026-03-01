'use client';

import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();

  return (
    <div className="rounded-lg border bg-background p-6">
      <h2 className="mb-6 text-2xl font-semibold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3>{item.product.name}</h3>
                        <p className="ml-4">${(item.product.priceUsd * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>

                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button>Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
