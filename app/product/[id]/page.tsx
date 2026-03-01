'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/mock-data';
import { useCart } from '@/store/cartStore';
import { toast } from "sonner";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === parseInt(params.id, 10));
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative h-96 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
          <div className="mt-8">
            <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
