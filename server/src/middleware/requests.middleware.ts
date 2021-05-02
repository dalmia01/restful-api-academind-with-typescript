import { Request, Response, NextFunction } from "express";

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startedTime = new Date().getTime();
    console.info(`request started -- ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        const elapsedTime = new Date().getTime() - startedTime;
        console.info(`request is finished -- ${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedTime}ms`);
    });
    next();
};
