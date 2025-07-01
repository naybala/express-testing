import express from "express";
const mobileRoutes = express();
mobileRoutes.use(express.json());

import productRoutes from "../modules/Mobile/products/routes/index.js";
mobileRoutes.use("/products", productRoutes);

export default mobileRoutes;
