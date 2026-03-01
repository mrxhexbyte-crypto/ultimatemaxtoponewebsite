'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, Product } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent link navigation
    addToCart(product);
    toast.success(`${product.name} has been added to your cart!`);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border rounded-lg overflow-hidden group h-full flex flex-col">
        <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 flex-grow">{product.type}</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-primary">${product.priceUsd.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{product.priceEth.toFixed(3)} ETH</p>
            </div>
          </div>
           <Button className="w-full mt-4" onClick={handleAddToCart}>
              Add to Cart
            </Button>
        </div>
      </div>
    </Link>
  );
};
