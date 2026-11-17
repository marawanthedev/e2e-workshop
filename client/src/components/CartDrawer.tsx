import { useCartStore } from "../store/cartStore";

type Props = {
  onClose: () => void;
};

export default function CartDrawer({ onClose }: Props) {
  const { items, remove, setQuantity } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer-header">
          <h2>Your cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 && <div className="empty">Your cart is empty</div>}
          {items.map(({ product, quantity }) => (
            <div className="cart-row" key={product.id}>
              <img className="cart-thumb" src={product.image_url} alt="" />
              <div className="cart-info">
                <div className="cart-name">{product.name}</div>
                <div className="cart-price">${product.price.toFixed(2)}</div>
              </div>
              <input
                className="qty-input"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(product.id, Number(e.target.value))}
              />
              <button className="btn btn-danger btn-sm" onClick={() => remove(product.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="drawer-footer">
          <div className="total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
