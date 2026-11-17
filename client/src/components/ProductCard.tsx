import type { Product } from "../types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="card">
      <img className="card-img" src={product.image_url} alt={product.name} />
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
