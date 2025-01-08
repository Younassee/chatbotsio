import express from "express"
import dotenv from "dotenv"
import { ollamaRouter } from "./routes/ollamaRoutes"

dotenv.config()

const app = express()


app.use("/api/v1/ollama", ollamaRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})