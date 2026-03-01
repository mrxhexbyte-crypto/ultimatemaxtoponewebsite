'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains';

interface CoinbaseProviderProps {
  children: ReactNode;
}

export function CoinbaseProvider({ children }: CoinbaseProviderProps) {
  // Use Sepolia testnet for development
  const chain = process.env.NODE_ENV === 'development' ? baseSepolia : base;

  return (
    <OnchainKitProvider
      chain={chain}
      apiKey={process.env.NEXT_PUBLIC_COINBASE_API_KEY}
    >
      {children}
    </OnchainKitProvider>
  );
}

// Supported networks:
// - base (production)
// - baseSepolia (testnet)
// - mainnet (Ethereum)
// - sepolia (Ethereum testnet)
