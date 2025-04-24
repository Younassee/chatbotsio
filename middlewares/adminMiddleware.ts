import { verify } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import { loggerError } from "../utils/logger";


export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        if(req.user.role !== "admin") return res.status(401).json({message :"Not authorized"})
        next()
}