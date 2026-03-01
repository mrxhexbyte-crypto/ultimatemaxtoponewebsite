'use client';

import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'sonner';

export const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const handleCheckout = async () => {
    if (!address) {
      toast.error('Please connect your wallet to proceed.');
      return;
    }

    const totalEth = totalPrice / 2000; // Assuming a fixed conversion rate for now

    try {
      await sendTransaction({
        to: '0x..._YOUR_WALLET_ADDRESS', // Replace with your wallet address
        value: parseEther(totalEth.toString()),
      });

      toast.success('Payment successful!');
      clearCart();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="rounded-lg border bg-background p-6">
      <h2 className="mb-6 text-2xl font-semibold">Checkout</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <p>{item.product.name} (x{item.quantity})</p>
            <p>${(item.product.priceUsd * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-8">
        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <Button onClick={handleCheckout} className="mt-6 w-full">
          Pay with Crypto
        </Button>
      </div>
    </div>
  );
};
