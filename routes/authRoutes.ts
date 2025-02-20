import {Router} from "express"
import {register, login, me} from "../controllers/authController"
import { authMiddleware } from "../middlewares/authMiddleware"

export const authRouter = Router()

// @ts-ignore
authRouter.post("/register",  register)
// @ts-ignore
authRouter.post("/login", login)

// @ts-ignore
authRouter.get("/me", authMiddleware, me)