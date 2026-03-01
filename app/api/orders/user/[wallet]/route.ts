import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: Promise<{ wallet: string }> }) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
  }

  try {
    const resolvedParams = await params;
    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.buyerWallet, resolvedParams.wallet))
      .orderBy(desc(orders.createdAt));
      
    return NextResponse.json(userOrders);
  } catch (error: any) {
    console.error('Failed to fetch user orders:', error);
    return NextResponse.json({ error: 'Failed to fetch user orders' }, { status: 500 });
  }
}
