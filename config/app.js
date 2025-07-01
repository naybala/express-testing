const express = require("express");
const app = express();

app.use(express.json());

// Use product routes with a base path
const productRoutes = require("../routes/productRoutes");
const authRoutes = require("../routes/authRoutes");

app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);

module.exports = app;
