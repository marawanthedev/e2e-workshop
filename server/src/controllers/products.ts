import type { Request, Response } from "express";
import { getProducts, insertProduct } from "../db/postgres.js";

export async function listProducts(_req: Request, res: Response) {
  res.json(await getProducts());
}

export async function createProduct(req: Request, res: Response) {
  const product = await insertProduct(req.body);
  res.status(201).json(product);
}
