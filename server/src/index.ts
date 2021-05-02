import { config as dotenv } from "dotenv";
dotenv();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./api/routes/users.routes";
import notesRouter from "./api/routes/notes.routes";
import mongoDbConfiguration from "./configuration/mongodb.configuration";

import { requestMiddleware } from "./middleware/requests.middleware";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(requestMiddleware);

app.use("/", userRouter);
app.use("/notes", notesRouter);

app.use((req: Request, res: Response) => {
    const error: Error = new Error("Route not found");
    res.status(404);
    res.json({
        error: error["message"],
    });
});

const PORT = process.env.port || 3000;

app.listen(PORT, async () => {
    console.info(`Server started @ ${new Date()} on port :: ${PORT}`);
    await mongoose.connect(mongoDbConfiguration(), { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("connect to mongodb database");
});
