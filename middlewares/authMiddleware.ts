import { verify } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import { loggerError } from "../utils/logger";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            return res.status(401).json({error : "Authorization header is missing"})
        }
        const token = req.headers.authorization?.split(" ")[1] as string;
        const user = verify(token, process.env.JWT_SECRET!)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }
        // @ts-ignore
        req.user = user;
        next()
    }

    catch (error) {
        loggerError(error as string)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}