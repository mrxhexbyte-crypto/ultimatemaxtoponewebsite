import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { products as seedProducts } from '@/data/products';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();
    if (!db) {
      console.warn('Database not connected, falling back to seed data');
      return NextResponse.json(seedProducts);
    }

    let allProducts = await db.select().from(products);

    // Seed database if empty
    if (allProducts.length === 0) {
      console.log('Seeding products database...');
      for (const p of seedProducts) {
        await db.insert(products).values({
          name: p.name,
          slug: p.slug,
          description: p.description,
          priceUsd: p.priceUsd.toString(),
          type: p.type as any,
          stock: p.stock,
          image: p.image,
          isActive: true,
        }).onConflictDoNothing();
      }
      allProducts = await db.select().from(products);
    }

    // Format for frontend
    const formattedProducts = allProducts.map(p => ({
      ...p,
      priceUsd: parseFloat(p.priceUsd),
      // Mock ETH price for now, or calculate dynamically on frontend
      priceEth: parseFloat(p.priceUsd) / 3000, 
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Fallback to seed data so the site doesn't break
    return NextResponse.json(seedProducts);
  }
}
