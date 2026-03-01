import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not connected. Please configure DATABASE_URL.' }, { status: 503 });
  }
  
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(50);
    return NextResponse.json(allOrders);
  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not connected. Please configure DATABASE_URL.' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const newOrder = await db.insert(orders).values({
      buyerWallet: body.buyerWallet,
      buyerEmail: body.buyerEmail,
      txHash: body.txHash,
      stripeSessionId: body.stripeSessionId,
      amountUsd: body.amountUsd.toString(),
      status: body.status || 'pending',
    }).returning();
    
    return NextResponse.json(newOrder[0]);
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
