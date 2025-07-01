const express = require("express");
const app = express();

app.use(express.json());

// Use product routes with a base path
const mobileRoutes = require("../routes/mobileApi");

//Mobile
app.use("/api/mobile", mobileRoutes);
//Spa

//Web

module.exports = app;
