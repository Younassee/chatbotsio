
import type {Request, Response} from "express"
import bcrypt from "bcrypt"
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

export async function updatePassword(req: Request, res: Response) {
    const {oldPassword, newPassword} = req.body
     // @ts-ignore
     const id = req.user.id
     const user = await UserModel.findById(id)
     if(!user) return res.status(404).json({message: "user Not found"})

     const match = await bcrypt.compare(oldPassword, user.password)
     if(!match) return res.status(401).json({message : "password incorrect"})
     const hash = await bcrypt.hash(newPassword, 10)
     user.password = hash
     await user.save()

     return res.status(200).json({message: "password updated!"})
}