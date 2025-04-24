import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import {updatePassword, updateProfileThumbnail, updateUsername} from "../controllers/userController"
import multer from "../middlewares/multer"
import {adminMiddleware} from "../middlewares/adminMiddleware.ts";

export const userRouter = Router()

// @ts-ignore
userRouter.put("/username/update", authMiddleware,  updateUsername)

// @ts-ignore
userRouter.put("/password/update",  authMiddleware,updatePassword)

// @ts-ignore
userRouter.put("/thumbnail/update",  authMiddleware, multer, updateProfileThumbnail)
