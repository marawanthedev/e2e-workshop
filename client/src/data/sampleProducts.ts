import type { Product } from "../types";

// Sample data for steps 1 to 3. In step 4 the products come from the database instead.
export const sampleProducts: Product[] = [
  { id: 1, name: "MacBook Pro 14", price: 1999.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp" },
  { id: 2, name: "Asus Zenbook Pro", price: 1799.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp" },
  { id: 3, name: "iPhone 5s", price: 199.99, category: "Electronics", image_url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp" },
  { id: 4, name: "Check Shirt", price: 29.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp" },
  { id: 5, name: "Aorus T-Shirt", price: 24.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp" },
  { id: 6, name: "Black Gown", price: 129.99, category: "Clothing", image_url: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp" },
  { id: 7, name: "Colombo Bed", price: 1899.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp" },
  { id: 8, name: "Colombo Sofa", price: 2499.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp" },
  { id: 9, name: "Decoration Swing", price: 59.99, category: "Home", image_url: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp" },
  { id: 10, name: "Black Sunglasses", price: 29.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp" },
  { id: 11, name: "Classic Sunglasses", price: 24.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp" },
  { id: 12, name: "Leather Belt Watch", price: 89.99, category: "Accessories", image_url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp" },
];
