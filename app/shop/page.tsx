'use client';

import { useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { products } from "@/lib/mock-data";

export default function ShopPage() {
  const [filters, setFilters] = useState({ category: "all" });

  const filteredProducts = products.filter(product => {
    if (filters.category === "all") return true;
    return product.category.toLowerCase() === filters.category.toLowerCase();
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Shop</h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
          Browse our collection of cosmic products, from apparel to art.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <ProductFilters filters={filters} onFilterChange={setFilters} />
        </aside>

        <main className="md:col-span-3">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
