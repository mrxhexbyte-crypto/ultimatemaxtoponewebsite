import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { orders, visitors } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ 
      revenue: 0, 
      activeOrders: 0, 
      totalUsers: 0, 
      fraudAlerts: 0, 
      error: 'Database not connected. Please configure DATABASE_URL.' 
    });
  }

  try {
    const revenueRes = await db.select({ total: sql<string>`sum(${orders.amountUsd})` })
      .from(orders)
      .where(sql`${orders.status} = 'confirmed'`);
      
    const activeOrdersRes = await db.select({ count: sql<string>`count(*)` })
      .from(orders)
      .where(sql`${orders.status} = 'pending'`);
      
    const usersRes = await db.select({ count: sql<string>`count(*)` })
      .from(visitors);

    return NextResponse.json({
      revenue: Number(revenueRes[0]?.total || 0),
      activeOrders: Number(activeOrdersRes[0]?.count || 0),
      totalUsers: Number(usersRes[0]?.count || 0),
      fraudAlerts: 0, // Placeholder for advanced fraud logic
    });
  } catch (error: any) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ 
      revenue: 0, activeOrders: 0, totalUsers: 0, fraudAlerts: 0, 
      error: 'Failed to fetch statistics' 
    });
  }
}
