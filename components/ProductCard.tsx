import { Product } from "../lib/db/schema";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={product.imageUrl} alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
