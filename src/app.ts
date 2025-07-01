import express, { Express } from "express";
const app: Express = express();

app.use(express.json());

// Use product routes with a base path
import mobileRoutes from "../routes/mobileApi";

//Mobile
app.use("/api/mobile", mobileRoutes);
//Spa

//Web

export default app;
