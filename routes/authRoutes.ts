import {Router} from "express"
import {register, login} from "../controllers/authController"

export const authRouter = Router()

// @ts-ignore
authRouter.post("/register", register)
// @ts-ignore
authRouter.post("/login", login)