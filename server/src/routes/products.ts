import { Router } from "express";
import { createProduct, listProducts, removeProduct } from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get("/", listProducts);
productsRouter.post("/", createProduct);
productsRouter.delete("/:id", removeProduct);
