import express, { Express, Request, Response } from "express";
import cors from "cors";
import productsRouter from "./api/routes/products.routes";

import { requestMiddleware } from "./middleware/requests.middleware";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(requestMiddleware);

app.use("/products", productsRouter);

app.use((req: Request, res: Response) => {
    const error: Error = new Error("Route not found");
    res.status(404);
    res.json({
        error: error["message"],
    });
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.info(`Server started @ ${new Date()} on port :: ${PORT}`);
});
