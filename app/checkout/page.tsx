import { Checkout } from "@/components/shop/Checkout";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>
      <Checkout />
    </div>
  );
}
