import express, { Router } from "express";
import productRoutes from "../modules/products/product.routes";

const mobileRoutes: Router = express.Router();

mobileRoutes.use("/products", productRoutes);

export default mobileRoutes;
