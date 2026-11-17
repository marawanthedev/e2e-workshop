import { Router } from "express";
import { productsRouter } from "./products.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/products", productsRouter);
