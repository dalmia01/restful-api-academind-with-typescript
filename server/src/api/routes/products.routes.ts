import { Request, Response, Router } from "express";

const productsRouter = Router();

productsRouter.get("/", (req: Request, res: Response) => {
    res.json({
        message: "getting all products",
    });
});

productsRouter.post("/", (req: Request, res: Response) => {
    res.json({
        message: "post a product",
    });
});

productsRouter.get("/:productId", (req: Request, res: Response) => {
    const productId = req.params.productId;
    res.json({
        message: `get specific product detaisl for ${productId}`,
    });
});

productsRouter.patch("/:productId", (req: Request, res: Response) => {
    const productId = req.params.productId;
    res.json({
        message: `${productId} - this product is now modified`,
    });
});

productsRouter.delete("/:productId", (req: Request, res: Response) => {
    const productId = req.params.productId;
    res.json({
        message: `${productId} -- this product is now deleted`,
    });
});

export default productsRouter;
