import * as express from "express";
import productsRouter from "./api/routes/products.routes";

import { requestMiddleware } from "./middleware/requests.middleware";

const app = express();

app.use(express.json());
app.use(requestMiddleware);

app.use("/products", productsRouter);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.info(`Server started @ ${new Date()} on port :: ${PORT}`);
});
