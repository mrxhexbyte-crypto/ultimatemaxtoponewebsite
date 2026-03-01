import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

/**
 * POST /api/orders/pay
 * Process crypto payment for an order
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId, transactionHash, amount, currency, buyerAddress, productId } = await request.json();

    if (!orderId || !transactionHash || !amount || !currency || !buyerAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order record
    const order = await db.insert(orders).values({
      id: orderId,
      userId: buyerAddress,
      productId,
      amount,
      currency,
      transactionHash,
      status: 'completed',
      paymentMethod: 'crypto',
      createdAt: new Date(),
    }).returning();

    return NextResponse.json(
      {
        success: true,
        order: order[0],
        message: 'Payment processed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}
