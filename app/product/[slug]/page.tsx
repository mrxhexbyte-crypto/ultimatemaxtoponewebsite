'use client';

import { products } from '@/data/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const product = products.find((p) => p.slug === params.slug);
  const addToCart = useCart((state) => state.addToCart);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} has been added to your cart!`);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
          <div className="mt-6">
            <p className="text-3xl font-bold text-primary">
              ${product.priceUsd.toFixed(2)}
            </p>
            <p className="mt-1 text-md text-muted-foreground">
              {product.priceEth.toFixed(3)} ETH
            </p>
          </div>
          <div className="mt-8">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            {product.type === 'physical' && `In Stock: ${product.stock}`}
            {product.type === 'nft' && `Only ${product.stock} available`}
            {product.type === 'digital' && `Available for instant download`}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
