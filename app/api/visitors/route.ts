'use client';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress, userAgent } = body;

    // For now, we'll just log the visitor data to the server console.
    // In a real application, this would be saved to a database.
    console.log('New visitor tracked:');
    console.log('Wallet Address:', walletAddress || 'Not connected');
    console.log('User Agent:', userAgent);

    return NextResponse.json({ message: 'Visitor tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json({ message: 'Error tracking visitor' }, { status: 500 });
  }
}
