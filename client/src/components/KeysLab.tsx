import { Profiler, useState, useSyncExternalStore } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

// Open the app at /?lab=keys to use this page.

const baseProducts: Product[] = [
  { id: 1, name: "iPhone 5s", price: 199.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp" },
  { id: 2, name: "Check Shirt", price: 29.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp" },
  { id: 3, name: "Colombo Sofa", price: 2499.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp" },
  { id: 4, name: "Black Sunglasses", price: 29.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp" },
];

type Item = { id: number; label: string };
const initialItems: Item[] = [
  { id: 1, label: "Apples" },
  { id: 2, label: "Bananas" },
  { id: 3, label: "Cherries" },
  { id: 4, label: "Dates" },
];

function KeysDemo() {
  const [items, setItems] = useState(initialItems);
  const [useIndexKey, setUseIndexKey] = useState(true);

  return (
    <section className="lab">
      <h2>Part A: keys</h2>
      <p className="lab-note">
        Type a note in each row, then click "Remove first". With key=index the notes stay in the
        same positions and end up on the wrong rows. With key=id they follow their item.
      </p>
      <div className="lab-controls">
        <button className="btn" onClick={() => setUseIndexKey((v) => !v)}>
          Using key={useIndexKey ? "index (wrong)" : "id (right)"}
        </button>
        <button className="btn" onClick={() => setItems((prev) => prev.slice(1))}>
          Remove first
        </button>
        <button className="btn" onClick={() => setItems(initialItems)}>
          Reset
        </button>
      </div>
      <div className="lab-list">
        {items.map((item, index) => (
          <div className="lab-row" key={useIndexKey ? index : item.id}>
            <span>{item.label}</span>
            <input className="qty-input" style={{ width: 160 }} placeholder="note" />
          </div>
        ))}
      </div>
    </section>
  );
}

const manyProducts: Product[] = Array.from({ length: 100 }, (_, i) => ({
  ...baseProducts[i % baseProducts.length],
  id: i + 1,
}));

// Profiler results live outside React state, so showing them does not re-render the profiled tree.
let stats = { commits: 0, last: 0 };
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const recordRender = (_id: string, phase: string, actualDuration: number) => {
  if (phase !== "update") return;
  stats = { commits: stats.commits + 1, last: actualDuration };
  listeners.forEach((fn) => fn());
};

function ProfilerStats() {
  const { commits, last } = useSyncExternalStore(subscribe, () => stats);
  return (
    <span>
      Profiler: {commits} updates, last render {last.toFixed(1)} ms
    </span>
  );
}

function ProfilerDemo() {
  const [tick, setTick] = useState(0);

  return (
    <section className="lab" style={{ marginTop: 40 }}>
      <h2>Part B: Profiler and React.memo</h2>
      <p className="lab-note">
        ProductCard is wrapped in React.memo. Click "Re-render parent" and watch the Profiler numbers.
        Then remove memo from ProductCard.tsx, save, and click again.
      </p>
      <div className="lab-controls">
        <button className="btn btn-primary" onClick={() => setTick((t) => t + 1)}>
          Re-render parent ({tick})
        </button>
        <ProfilerStats />
      </div>
      <Profiler id="products" onRender={recordRender}>
        <div className="grid">
          {manyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Profiler>
    </section>
  );
}

export default function KeysLab() {
  return (
    <>
      <KeysDemo />
      <ProfilerDemo />
    </>
  );
}
