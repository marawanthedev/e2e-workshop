import type { NewProduct, Product } from "../types.js";
import { pool } from "./index.js";

// NUMERIC comes back from Postgres as a string, so we cast it to a float in SQL
const COLUMNS = "id, name, price::float8 AS price, category, image_url";

export async function getProducts() {
  const { rows } = await pool.query<Product>(`SELECT ${COLUMNS} FROM products ORDER BY id`);
  return rows;
}

export async function insertProduct(input: NewProduct) {
  const { rows } = await pool.query<Product>(
    `INSERT INTO products (name, price, category, image_url)
     VALUES ($1, $2, $3, $4)
     RETURNING ${COLUMNS}`,
    [input.name, input.price, input.category, input.image_url],
  );
  return rows[0];
}
