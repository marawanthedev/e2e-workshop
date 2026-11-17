import type { Request, Response } from "express";

export function listProducts(_req: Request, res: Response) {
  res.json([]);
}
