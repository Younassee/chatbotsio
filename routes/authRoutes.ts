import {Router} from "express"
import {register} from "../controllers/authController"

export const authRouter = Router()

// @ts-ignore
authRouter.post("/register", register)