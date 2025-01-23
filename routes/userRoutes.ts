import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { updateUsername } from "../controllers/userController"

export const userRouter = Router()

// @ts-ignore
userRouter.put("/username/update", authMiddleware, updateUsername)