import  {Router} from "express"
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {chat, chatHistory} from "../controllers/chatContoller.ts";


export  const chatRouter = Router()

//@ts-ignore
chatRouter.post("/", authMiddleware, chat)

//@ts-ignore
chatRouter.get("/history", authMiddleware, chatHistory)