import express,{Router} from "express"
import productRoutes from "@web/products/routes/index"
const webRoutes: Router = express.Router();

webRoutes.use("/products", productRoutes);

export default webRoutes;
