import express from "express";
const app = express();

app.use(express.json());

// Use product routes with a base path
import mobileApi from "../routes/mobileApi.js";

//Mobile
app.use("/api/mobile", mobileApi);
//Spa

//Web

export default app;
