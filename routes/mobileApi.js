const express = require("express");
const mobileRoutes = express();
mobileRoutes.use(express.json());

const productRoutes = require("../modules/Mobile/products/routes");
mobileRoutes.use("/products", productRoutes);
module.exports = mobileRoutes;
