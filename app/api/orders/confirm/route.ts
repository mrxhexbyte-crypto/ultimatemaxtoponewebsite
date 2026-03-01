import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
  }

  try {
    const { stripeSessionId } = await req.json();
    
    if (!stripeSessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    const updatedOrder = await db.update(orders)
      .set({ status: 'confirmed' })
      .where(eq(orders.stripeSessionId, stripeSessionId))
      .returning();
      
    if (updatedOrder.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder[0]);
  } catch (error: any) {
    console.error('Failed to confirm order:', error);
    return NextResponse.json({ error: 'Failed to confirm order' }, { status: 500 });
  }
}
