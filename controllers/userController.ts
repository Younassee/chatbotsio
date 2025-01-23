
import type {Request, Response} from "express"
import { UserModel } from "../models/userModel"

export async function updateUsername(req: Request, res: Response) {
    const {newUsername} = req.body
    // @ts-ignore
    const id = req.user.id
    const user = await UserModel.findById(id)
    if(!user) return res.status(404).json({message: "user Not found"})
    
    user.username = newUsername
    user.save()
    return res.status(200).json({message: "username updated!"})

}