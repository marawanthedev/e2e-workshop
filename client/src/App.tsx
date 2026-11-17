import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import { CATEGORIES } from "./constants";
import { sampleProducts } from "./data/sampleProducts";

export default function App() {
  const [category, setCategory] = useState("All");

  const products =
    category === "All" ? sampleProducts : sampleProducts.filter((product) => product.category === category);

  return (
    <>
      <header className="header">
        <div className="brand">
          <span className="brand-mark">M</span> Mini Shop
        </div>
      </header>

      <main className="main">
        <h1 className="page-title">{category === "All" ? "All products" : category}</h1>
        <p className="page-subtitle">{products.length} products</p>
        <CategoryFilter categories={CATEGORIES} selected={category} onSelect={setCategory} />
        <ProductList products={products} />
      </main>
    </>
  );
}
