import React from 'react';

const ProductPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Product: {params.slug}</h1>
    </div>
  );
};

export default ProductPage;
