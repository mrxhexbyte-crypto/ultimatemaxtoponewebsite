import { pgTable, text, varchar, timestamp, boolean, integer, decimal, jsonb, primaryKey } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 18, scale: 2 }).notNull(),
  images: jsonb('images'),
  category: varchar('category', { length: 255 }),
  stock: integer('stock'),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 }),
  total: decimal('total', { precision: 18, scale: 2 }).notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const visitors = pgTable('visitors', {
  wallet_address: varchar('wallet_address', { length: 255 }).primaryKey(),
  ens_name: varchar('ens_name', { length: 255 }),
  ip_address: varchar('ip_address', { length: 255 }),
  country: varchar('country', { length: 255 }),
  city: varchar('city', { length: 255 }),
  region: varchar('region', { length: 255 }),
  timezone: varchar('timezone', { length: 255 }),
  isp: varchar('isp', { length: 255 }),
  is_vpn: boolean('is_vpn'),
  user_agent: text('user_agent'),
  device_type: varchar('device_type', { length: 255 }),
  browser: varchar('browser', { length: 255 }),
  screen_resolution: varchar('screen_resolution', { length: 255 }),
  referrer_url: text('referrer_url'),
  wallet_type: varchar('wallet_type', { length: 255 }),
  chain_id: integer('chain_id'),
  siwe_signature: text('siwe_signature'),
  session_cookie_id: varchar('session_cookie_id', { length: 255 }),
  first_seen: timestamp('first_seen').defaultNow(),
  last_seen: timestamp('last_seen').defaultNow(),
  total_orders: integer('total_orders').default(0),
  total_spent_usd: decimal('total_spent_usd', { precision: 18, scale: 2 }).default('0'),
});

export const digital_downloads = pgTable('digital_downloads', {
  id: varchar('id', { length: 255 }).primaryKey(),
  orderId: varchar('order_id', { length: 255 }),
  downloadUrl: text('download_url'),
  downloadCount: integer('download_count').default(0),
  expiresAt: timestamp('expires_at'),
});

export const shipping_orders = pgTable('shipping_orders', {
  orderId: varchar('order_id', { length: 255 }).primaryKey(),
  shippingAddress: text('shipping_address'), // Encrypted
  trackingNumber: varchar('tracking_number', { length: 255 }),
});

export const dao_proposals = pgTable('dao_proposals', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  proposer: varchar('proposer', { length: 255 }),
  status: varchar('status', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: varchar('id', { length: 255 }).primaryKey(),
  productId: varchar('product_id', { length: 255 }),
  userId: varchar('user_id', { length: 255 }),
  rating: integer('rating'),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const coupons = pgTable('coupons', {
  code: varchar('code', { length: 255 }).primaryKey(),
  discount: decimal('discount', { precision: 5, scale: 2 }).notNull(),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
});
