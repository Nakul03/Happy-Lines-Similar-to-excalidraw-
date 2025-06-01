import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

export function userMiddleware (req: Request , res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token as string, JWT_SECRET);

    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}
