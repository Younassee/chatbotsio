import  {Router} from "express"
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {chat} from "../controllers/chatContoller.ts";


export  const chatRouter = Router()

//@ts-ignore
chatRouter.post("/", authMiddleware, chat)