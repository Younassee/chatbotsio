import express from "express"
import type {Request, Response, NextFunction} from "express"
import dotenv from "dotenv"
import { ollamaRouter } from "./routes/ollamaRoutes"
import { dbConnect } from "./database/dbConnect"
import { authRouter } from "./routes/authRoutes"
import { userRouter } from "./routes/userRoutes"
import { loggerInfo } from "./utils/logger"

dotenv.config()

export const app = express()
app.use(express.json())


app.use((req : Request , res: Response, next: NextFunction) => {
    loggerInfo(req)
    next()
})


app.use("/api/v1/ollama", ollamaRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)


app.listen(process.env.PORT, () => {
    dbConnect()
    console.log(`Server is running on port ${process.env.PORT}`)
})