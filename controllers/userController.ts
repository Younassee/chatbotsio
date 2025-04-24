
import type {Request, Response} from "express"
import bcrypt from "bcrypt"
import { UserModel } from "../models/userModel"
import fs from "node:fs/promises"
import {ChatModel} from "../models/chatModel.ts";

export async function updateUsername(req: Request, res: Response) {
    const {newUsername} = req.body
    // @ts-ignore
    const id = req.user.id
    const user = await UserModel.findById(id)
    if(!user) return res.status(404).json({message: "user Not found"})
    
    user.username = newUsername
    user.save()
    return res.status(200).json({username:  user.username})
}

export async function updatePassword(req: Request, res: Response) {
    const {oldPassword, newPassword} = req.body
     // @ts-ignore
     const id = req.user.id
     const user = await UserModel.findById(id)
     if(!user) return res.status(404).json({message: "user Not found"})

     const match = await bcrypt.compare(oldPassword, user.password)
     if(!match) return res.status(401).json({message : "password incorrect"})
     user.password = await bcrypt.hash(newPassword, 10)
     await user.save()

     return res.status(200).json({message: "password updated!"})
}


export  async  function updateProfileThumbnail(req: Request, res: Response) {
    // @ts-ignore
    const id = req.user.id
    const user = await UserModel.findById(id)
    if(!user) return res.status(404).json({message: "user Not found"})
    if(user.thumbnail) await fs.unlink(user.thumbnail)

    user.thumbnail = req.file!.path
    await user.save()

    return res.status(200).json({thumbnail: user.thumbnail})
}


export  async function deleteAccount(req: Request, res: Response) {
    // @ts-ignore
    const id = req.user.id
    const {password} = req.body
    const user = await UserModel.findById(id)
    if(!user) return res.status(404).json({message: "user Not found"})
    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({message: "user Not found"})
    // *** deleted user related chats
    await ChatModel.deleteMany({userId: id})
    // *** delete user
    await user.deleteOne();
    return res.status(200).json({message: "account deleted successfully"})
}