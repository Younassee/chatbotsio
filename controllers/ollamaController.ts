import type {Request, Response} from "express"
import ollama from "ollama"

export async function showModels (req: Request, res: Response) {
     const response = await ollama.list()
     const models =  response.models.map(model => model.name)
     return res.status(200).json(models)
}