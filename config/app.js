const express = require("express");
const app = express();

app.use(express.json());

// Use product routes with a base path
const productRoutes = require("../routes/productRoutes");
app.use("/api/products", productRoutes);

module.exports = app;
