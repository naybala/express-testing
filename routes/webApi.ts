import express,{Router} from "express"
import productRoutes from "@web/products/routes/index"
import authRoutes from "@web/auth/routes/index"
const webRoutes: Router = express.Router();

webRoutes.use("/products", productRoutes);
webRoutes.use("/auth", authRoutes);


export default webRoutes;
