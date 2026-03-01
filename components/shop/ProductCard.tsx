'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-background transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <h3 className="text-xl font-bold truncate">{product.name}</h3>
        <p className="mt-2 text-lg font-semibold text-primary">
          ${product.priceUsd.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {product.priceEth.toFixed(3)} ETH
        </p>
        <div className="mt-4 flex space-x-2">
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/product/${product.slug}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

