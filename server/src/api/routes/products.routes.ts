import { Request, Response, Router } from "express";
import { getAllProducts, addProduct, getSpecificProduct, modifyProduct, deleteProduct } from "../controllers/products/products.controllers";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/", addProduct);

productsRouter.get("/:productId", getSpecificProduct);

productsRouter.patch("/:productId", modifyProduct);

productsRouter.delete("/:productId", deleteProduct);

export default productsRouter;
