'use server';

import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export interface CheckoutItem {
  productId: number;
  quantity: number;
}

export async function createCheckoutSession(items: CheckoutItem[]) {
  try {
    const lineItems = items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`https://zayx-os.com/products/${product.image}.png`],
            },
            unit_amount: Math.round(product.price * 2400 * 100),
          },
          quantity: item.quantity,
        };
      })
      .filter(Boolean);

    if (lineItems.length === 0) {
      throw new Error('No valid items in cart');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/cancel`,
      metadata: {
        items_count: items.length.toString(),
      },
    });

    return {
      url: session.url,
      sessionId: session.id,
    };
  } catch (error) {
    console.error('[v0] Checkout session creation error:', error);
    throw new Error('Failed to create checkout session');
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.payment_status,
      customerEmail: session.customer_email,
      amount: session.amount_total ? session.amount_total / 100 : 0,
    };
  } catch (error) {
    console.error('[v0] Session retrieval error:', error);
    throw new Error('Failed to retrieve session');
  }
}
