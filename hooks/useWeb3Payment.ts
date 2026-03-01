'use client';

import { useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { payWithETH, payWithToken, getContractAddresses } from '@/lib/web3/contracts';

interface UseWeb3PaymentProps {
  orderId: number;
  amount: bigint;
  productId: string;
}

/**
 * Hook for Web3 payment processing
 */
export const useWeb3Payment = ({ orderId, amount, productId }: UseWeb3PaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const { address: userAddress, isConnected } = useAccount();
  const { data: signer } = useSigner();

  const processETHPayment = async () => {
    if (!isConnected || !signer || !userAddress) {
      setError('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { shopPayment } = getContractAddresses();
      if (!shopPayment) {
        throw new Error('ShopPayment contract address not configured');
      }

      const receipt = await payWithETH(signer, shopPayment, orderId, amount);
      setTransactionHash(receipt?.hash);

      return receipt;
    } catch (err: any) {
      const errorMessage = err.reason || err.message || 'Payment failed';
      setError(errorMessage);
      console.error('ETH payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const processTokenPayment = async (tokenAddress: string) => {
    if (!isConnected || !signer || !userAddress) {
      setError('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { shopPayment } = getContractAddresses();
      if (!shopPayment) {
        throw new Error('ShopPayment contract address not configured');
      }

      const receipt = await payWithToken(signer, shopPayment, orderId, tokenAddress, amount);
      setTransactionHash(receipt?.hash);

      return receipt;
    } catch (err: any) {
      const errorMessage = err.reason || err.message || 'Payment failed';
      setError(errorMessage);
      console.error('Token payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setTransactionHash(null);
  };

  return {
    processETHPayment,
    processTokenPayment,
    isLoading,
    error,
    transactionHash,
    isConnected,
    userAddress,
    resetState,
  };
};
