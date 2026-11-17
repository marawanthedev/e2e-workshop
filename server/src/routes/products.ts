import { Router } from "express";
import { listProducts } from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get("/", listProducts);
