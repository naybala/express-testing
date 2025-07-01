import express, { Router } from "express";
import productRoutes from "../modules/Mobile/products/routes/index";

const mobileRoutes: Router = express.Router();

mobileRoutes.use("/products", productRoutes);

export default mobileRoutes;
