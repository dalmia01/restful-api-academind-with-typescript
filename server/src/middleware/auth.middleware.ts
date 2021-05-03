import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const jwtAccessToken = authHeader && authHeader.split(" ")[1];
    if (!jwtAccessToken) return res.json({ error: "Access denied" });
    verify(jwtAccessToken, process.env.JWT_SECRET_KEY, (err) => {
        if (err) return res.json({ error: "Access denied" });
        next();
    });
};
