import type { Request, Response } from "express";
import { getProducts } from "../db/postgres.js";

export async function listProducts(_req: Request, res: Response) {
  res.json(await getProducts());
}
