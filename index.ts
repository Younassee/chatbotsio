import express from "express"
import dotenv from "dotenv"
import { ollamaRouter } from "./routes/ollamaRoutes"
import { dbConnect } from "./database/dbConnect"

dotenv.config()

export const app = express()

app.use(express.json())


app.use("/api/v1/ollama", ollamaRouter)

app.listen(process.env.PORT, () => {
    dbConnect()
    console.log(`Server is running on port ${process.env.PORT}`)
})