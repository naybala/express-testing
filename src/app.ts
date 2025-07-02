import express, { Express } from "express";
const app: Express = express();

app.use(express.json());
app.use('',(req,res)=>{
    res.send('API WORKING');
})

// Use product routes with a base path
import mobileRoutes from "../routes/mobileApi";
import webApi from "../routes/webApi";

//Mobile
app.use("/api/mobile", mobileRoutes);
//Spa

//Web
app.use("/api/web",webApi);


export default app;
