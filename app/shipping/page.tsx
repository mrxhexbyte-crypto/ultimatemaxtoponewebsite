'use client';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg mx-auto max-w-3xl">
        <h1>Shipping Policy</h1>
        <p>Last updated: October 26, 2023</p>

        <h2>1. Shipping Process</h2>
        <p>
          All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
        </p>

        <h2>2. Shipping Rates & Delivery Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. Delivery estimates will be provided once your order has been dispatched.
        </p>

        <div className="my-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Shipment Method</th>
                <th className="text-left">Estimated Delivery Time</th>
                <th className="text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard Shipping</td>
                <td>3-5 business days</td>
                <td>$5.00</td>
              </tr>
              <tr>
                <td>Express Shipping</td>
                <td>1-2 business days</td>
                <td>$15.00</td>
              </tr>
              <tr>
                <td>International Shipping</td>
                <td>7-21 business days</td>
                <td>Calculated at checkout</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3. Shipment Confirmation & Order Tracking</h2>
        <p>
          You will receive a shipment confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
        </p>

        <h2>4. Customs, Duties, and Taxes</h2>
        <p>
          ZAYX-OS is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
        </p>

        <h2>5. Damages</h2>
        <p>
          ZAYX-OS is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our Shipping Policy, please contact us at <a href=\"mailto:contact@zayxos.com\">contact@zayxos.com</a>.
        </p>
      </div>
    </div>
  );
}
