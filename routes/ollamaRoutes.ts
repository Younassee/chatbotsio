import {Router} from "express"
import {showModels} from "../controllers/ollamaController"

export const ollamaRouter = Router()

// @ts-ignore
ollamaRouter.get("/show-models", showModels)