import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
    res.json({
        message: "getting all products from controllers",
    });
};

export const addProduct = async (req: Request, res: Response) => {
    const { id, title, description, amount } = req.body;
    console.info(`product to add :: id -- ${id} , title -- ${title} , description -- ${description} , amount -- ${amount}`);
    res.json({
        message: `product ${title} of amount ${amount} which is a ${description} is added.`,
    });
};

export const getSpecificProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    res.json({
        message: `get specific product detaisl for ${productId}`,
    });
};

export const modifyProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    res.json({
        message: `${productId} - this product is now modified`,
    });
};

export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    res.json({
        message: `${productId} -- this product is now deleted`,
    });
};
