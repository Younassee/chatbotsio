import  {Router} from "express"
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {chat, chatById, chatHistory, deleteChat, getLastChat} from "../controllers/chatContoller.ts";


export  const chatRouter = Router()

//@ts-ignore
chatRouter.post("/", authMiddleware, chat)
//@ts-ignore
chatRouter.get("/history", authMiddleware, chatHistory)

//@ts-ignore
chatRouter.get("/last", authMiddleware, getLastChat)

//@ts-ignore
chatRouter.delete("/delete/:id",authMiddleware, deleteChat)

//@ts-ignore
chatRouter.get("/:id",  authMiddleware, chatById)

