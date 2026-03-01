'use client';

import { useCallback } from 'react';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from '@coinbase/onchainkit/transaction';
import type { TransactionError } from '@coinbase/onchainkit/transaction';

interface CoinbasePaymentProps {
  productId: string;
  amount: string;
  productName: string;
  onSuccess?: (hash: string) => void;
  onError?: (error: TransactionError) => void;
}

export function CoinbasePayment({
  productId,
  amount,
  productName,
  onSuccess,
  onError,
}: CoinbasePaymentProps) {
  const handleSuccess = useCallback(
    (hash: string) => {
      console.log('[v0] Payment successful:', hash);
      if (onSuccess) onSuccess(hash);
    },
    [onSuccess]
  );

  const handleError = useCallback(
    (error: TransactionError) => {
      console.error('[v0] Payment error:', error);
      if (onError) onError(error);
    },
    [onError]
  );

  // Smart contract interaction - replace with your actual contract
  const contracts = [
    {
      address: process.env.NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS || '0x',
      abi: SHOP_PAYMENT_ABI,
      functionName: 'payWithETH',
      args: [productId],
      value: amount,
    },
  ];

  return (
    <div className="w-full">
      <Transaction
        contracts={contracts}
        onSuccess={handleSuccess}
        onError={handleError}
      >
        <TransactionButton
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition shadow-lg"
          text={`Pay ${amount} ETH for ${productName}`}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}

// Minimal Shop Payment ABI
const SHOP_PAYMENT_ABI = [
  {
    type: 'function',
    name: 'payWithETH',
    inputs: [{ name: '_orderId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'payable',
  },
];
