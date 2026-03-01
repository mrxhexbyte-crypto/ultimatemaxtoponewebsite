'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useCart, Product } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: Product & { quantity: number };
}

export const CartItem = ({ item }: CartItemProps) => {
  const removeFromCart = useCart((state) => state.removeFromCart);

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
            />
        </div>
        <div>
          <Link href={`/product/${item.slug}`} className="font-medium hover:underline">
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold">${(item.priceUsd * item.quantity).toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">
            {(item.priceEth * item.quantity).toFixed(3)} ETH
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
