import { Router } from "express";
import { createProduct, listProducts } from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get("/", listProducts);
productsRouter.post("/", createProduct);
