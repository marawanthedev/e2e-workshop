import { useState } from "react";
import AddProductForm from "./components/AddProductForm";
import CartDrawer from "./components/CartDrawer";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import { CATEGORIES } from "./constants";
import { useProducts } from "./hooks/useProducts";
import { useCartStore } from "./store/cartStore";

export default function App() {
  const { products, category, setCategory, loading, error, addProduct } = useProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.length);

  return (
    <>
      <header className="header">
        <div className="brand">
          <span className="brand-mark">M</span> Mini Shop
        </div>
        <div className="header-actions">
          <button className="btn" onClick={() => setFormOpen((open) => !open)}>
            + Add product
          </button>
          <button className="btn btn-primary" onClick={() => setCartOpen(true)}>
            Cart <span className="badge">{cartCount}</span>
          </button>
        </div>
      </header>

      <main className="main">
        <h1 className="page-title">{category === "All" ? "All products" : category}</h1>
        <p className="page-subtitle">{loading ? "Loading..." : `${products.length} products`}</p>
        {formOpen && (
          <AddProductForm
            onSubmit={async (input) => {
              await addProduct(input);
              setFormOpen(false);
            }}
            onCancel={() => setFormOpen(false)}
          />
        )}
        <CategoryFilter categories={CATEGORIES} selected={category} onSelect={setCategory} />
        {error && <p className="status error">{error}</p>}
        {!loading && !error && <ProductList products={products} />}
      </main>

      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}
