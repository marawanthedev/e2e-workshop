import { memo } from "react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const add = useCartStore((state) => state.add);

  return (
    <article className="card">
      <img className="card-img" src={product.image_url} alt={product.name} />
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => add(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
