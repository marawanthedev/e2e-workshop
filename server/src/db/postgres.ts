import type { Product } from "../types.js";
import { pool } from "./index.js";

// NUMERIC comes back from Postgres as a string, so we cast it to a float in SQL
const COLUMNS = "id, name, price::float8 AS price, category, image_url";

export async function getProducts() {
  const { rows } = await pool.query<Product>(`SELECT ${COLUMNS} FROM products ORDER BY id`);
  return rows;
}
