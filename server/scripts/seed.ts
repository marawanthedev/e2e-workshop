import { pool } from "../src/db/index.js";

const products = [
  { name: "MacBook Pro 14", price: 1999.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp" },
  { name: "Asus Zenbook Pro", price: 1799.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp" },
  { name: "iPhone 5s", price: 199.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp" },
  { name: "Check Shirt", price: 29.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp" },
  { name: "Aorus T-Shirt", price: 24.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp" },
  { name: "Black Gown", price: 129.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp" },
  { name: "Colombo Bed", price: 1899.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp" },
  { name: "Colombo Sofa", price: 2499.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp" },
  { name: "Decoration Swing", price: 59.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp" },
  { name: "Black Sunglasses", price: 29.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp" },
  { name: "Classic Sunglasses", price: 24.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp" },
  { name: "Leather Belt Watch", price: 89.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp" },
];

async function seed() {
  if (process.argv[2] === "reset") {
    await pool.query("DROP TABLE IF EXISTS products");
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
      category TEXT NOT NULL,
      image_url TEXT NOT NULL
    )
  `);

  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM products");
  if (rows[0].count > 0) {
    console.log(`The table already has ${rows[0].count} products, nothing to insert.`);
    return;
  }

  for (const p of products) {
    await pool.query("INSERT INTO products (name, price, category, image_url) VALUES ($1, $2, $3, $4)", [
      p.name,
      p.price,
      p.category,
      p.image_url,
    ]);
  }
  console.log(`Created the table and inserted ${products.length} products.`);
}

seed()
  .catch((err) => {
    console.error("Seeding failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
