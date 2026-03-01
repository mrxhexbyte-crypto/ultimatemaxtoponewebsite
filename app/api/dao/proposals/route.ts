import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/dao/proposals
 * Create a new DAO governance proposal
 * Requires minimum ZYX token balance
 */
export async function POST(request: NextRequest) {
  try {
    const {
      proposerAddress,
      title,
      description,
      actions,
      votingPeriod = 604800, // 7 days in seconds
    } = await request.json();

    if (!proposerAddress || !title || !description || !Array.isArray(actions)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(proposerAddress)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address' },
        { status: 400 }
      );
    }

    // TODO: Check minimum token balance requirement
    // TODO: Create proposal in GovernanceToken contract

    const proposal = {
      id: Math.floor(Math.random() * 1000000),
      proposer: proposerAddress,
      title,
      description,
      actions,
      startBlock: 0, // Would get from contract
      endBlock: 0, // Would get from contract
      forVotes: 0,
      againstVotes: 0,
      abstainVotes: 0,
      cancelled: false,
      executed: false,
      createdAt: new Date(),
    };

    return NextResponse.json(
      {
        success: true,
        proposal,
        message: 'Proposal created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Proposal creation error:', error);
    return NextResponse.json(
      { error: 'Proposal creation failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/dao/proposals
 * Get all active proposals
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch proposals from smart contract or database

    const proposals = [
      {
        id: 1,
        title: 'Increase marketplace fee from 2.5% to 3%',
        description: 'Increase platform fee to improve sustainability',
        forVotes: 1500000,
        againstVotes: 500000,
        status: 'active',
      },
    ];

    return NextResponse.json({
      success: true,
      proposals,
    });
  } catch (error) {
    console.error('Proposal fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
}
