import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import {deleteUser, getUsersList} from "../controllers/adminController.ts";
import {adminMiddleware} from "../middlewares/adminMiddleware.ts";

export const adminRouter = Router()


// @ts-ignore
adminRouter.get("/users", authMiddleware, adminMiddleware, getUsersList)

//@ts-ignore
adminRouter.delete("/users/:userId/delete", authMiddleware, adminMiddleware, deleteUser)
