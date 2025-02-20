import express from "express"
import type {Request, Response, NextFunction} from "express"
import dotenv from "dotenv"
import cors from "cors"
import { ollamaRouter } from "./routes/ollamaRoutes"
import { dbConnect } from "./database/dbConnect"
import { authRouter } from "./routes/authRoutes"
import { userRouter } from "./routes/userRoutes"
import { loggerInfo } from "./utils/logger"
import {chatRouter} from "./routes/chatroutes.ts";



dotenv.config()

export const app = express()
app.use(cors())
app.use(express.json())
app.use("/public/images", express.static("public/images"))

app.use((req : Request , res: Response, next: NextFunction) => {
    loggerInfo(req)
    next()
})


app.use("/api/v1/ollama",ollamaRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat", chatRouter)


app.listen(process.env.PORT, () => {
    dbConnect()
    console.log(`Server is running on port ${process.env.PORT}`)
})