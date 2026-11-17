import type { Request, Response } from "express";
import { deleteProduct, getProducts, insertProduct } from "../db/postgres.js";
import { newProductSchema } from "../schemas.js";

export async function listProducts(_req: Request, res: Response) {
  res.json(await getProducts());
}

export async function createProduct(req: Request, res: Response) {
  const parsed = newProductSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }

  const product = await insertProduct(parsed.data);
  res.status(201).json(product);
}

export async function removeProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "id must be a number" });
    return;
  }

  const removed = await deleteProduct(id);
  if (!removed) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.status(204).end();
}
