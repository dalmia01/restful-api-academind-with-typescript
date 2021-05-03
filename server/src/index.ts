import "reflect-metadata";
import { config as dotenv } from "dotenv";
dotenv();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./api/routes/users.routes";
import notesRouter from "./api/routes/notes.routes";
import mongoDbConfiguration from "./configuration/mongodb.configuration";
import { UserResolver } from "./graphql/resolvers/users.resolvers";
import { requestMiddleware } from "./middleware/requests.middleware";

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: true,
    });

    const app: Express = express();

    const server = new ApolloServer({
        schema,
    });

    server.applyMiddleware({ app });

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
}

main();
