const express = require("express");
const app = express();

app.use(express.json());

// Use product routes with a base path
const productRoutes = require("../routes/productRoutes");
const authRoutes = require("../routes/authRoutes");
const presignRoutes = require("../routes/presign");

app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);
app.use("/api", presignRoutes);

module.exports = app;
