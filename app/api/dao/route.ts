import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { daoProposals } from '@/lib/db/schema';

const mockProposals = [
  {
    id: '1',
    title: 'Add Support for Solana Payments',
    description: 'Integrate Solana wallet adapter and accept SOL for all products to reduce transaction fees.',
    votesFor: '1200000',
    votesAgainst: '45000',
    status: 'active',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Fund Marketing Campaign Q3',
    description: 'Allocate 50 ETH from the treasury for a Web3 marketing campaign across major crypto media outlets.',
    votesFor: '850000',
    votesAgainst: '1100000',
    status: 'active',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Lower Platform Fee to 2.5%',
    description: 'Reduce the platform fee from 5% to 2.5% to encourage more sellers to join the ecosystem.',
    votesFor: '2500000',
    votesAgainst: '10000',
    status: 'passed',
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export async function GET() {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json(mockProposals);
    }

    let allProposals = await db.select().from(daoProposals);

    // Seed database if empty
    if (allProposals.length === 0) {
      for (const p of mockProposals) {
        await db.insert(daoProposals).values({
          title: p.title,
          description: p.description,
          votesFor: p.votesFor,
          votesAgainst: p.votesAgainst,
          status: p.status as any,
          deadline: new Date(p.deadline),
        }).onConflictDoNothing();
      }
      allProposals = await db.select().from(daoProposals);
    }

    return NextResponse.json(allProposals);
  } catch (error) {
    console.error('Failed to fetch DAO proposals:', error);
    return NextResponse.json(mockProposals);
  }
}
