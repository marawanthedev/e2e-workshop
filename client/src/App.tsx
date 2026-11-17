import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import { CATEGORIES } from "./constants";
import { useProducts } from "./hooks/useProducts";

export default function App() {
  const { products, category, setCategory, loading, error } = useProducts();

  return (
    <>
      <header className="header">
        <div className="brand">
          <span className="brand-mark">M</span> Mini Shop
        </div>
      </header>

      <main className="main">
        <h1 className="page-title">{category === "All" ? "All products" : category}</h1>
        <p className="page-subtitle">{loading ? "Loading..." : `${products.length} products`}</p>
        <CategoryFilter categories={CATEGORIES} selected={category} onSelect={setCategory} />
        {error && <p className="status error">{error}</p>}
        {!loading && !error && <ProductList products={products} />}
      </main>
    </>
  );
}
