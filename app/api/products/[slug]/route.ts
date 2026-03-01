import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { products as seedProducts } from '@/data/products';
import { eq } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    const db = getDb();
    if (!db) {
      const product = seedProducts.find(p => p.slug === resolvedParams.slug);
      if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(product);
    }

    const result = await db.select().from(products).where(eq(products.slug, resolvedParams.slug)).limit(1);
    
    if (result.length === 0) {
      // Fallback to seed
      const product = seedProducts.find(p => p.slug === resolvedParams.slug);
      if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(product);
    }

    const p = result[0];
    return NextResponse.json({
      ...p,
      priceUsd: parseFloat(p.priceUsd),
      priceEth: parseFloat(p.priceUsd) / 3000,
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    const resolvedParams = await params;
    const product = seedProducts.find(p => p.slug === resolvedParams.slug);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  }
}
