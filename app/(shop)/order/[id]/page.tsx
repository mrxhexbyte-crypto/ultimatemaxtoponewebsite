import React from 'react';

const OrderPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Order: {params.id}</h1>
    </div>
  );
};

export default OrderPage;
