import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { updatePassword, updateUsername } from "../controllers/userController"

export const userRouter = Router()

// @ts-ignore
userRouter.put("/username/update", authMiddleware, updateUsername)

// @ts-ignore
userRouter.put("/password/update", authMiddleware, updatePassword)