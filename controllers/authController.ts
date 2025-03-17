import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { loginValidator, registerValidator } from '../validators/authvalidator';
import { UserModel } from '../models/userModel';


export async function register (req: Request, res: Response) {

    // get data from request
    const body = req.body
    // validate data
    const {error, value} = registerValidator.validate(body)
    if (error) return res.status(400).json({message: error.message})
    // check if user exists
    const user = await UserModel.findOne({email: value.email})
    if (user) return res.status(400).json({message: "User already exists"})
    // hash password
    const hash =  await bcrypt.hash(value.password, 10)

    //  save user to database
    await UserModel.create({email : value.email, username: value.username, password: hash})

    // send response
    return res.status(201).json({message: "Registering user"})
}


export async function login (req: Request, res: Response) {
    // get data from request
    const body = req.body
    // validate data
    const {error, value} = loginValidator.validate(body)
    if (error) return res.status(400).json({message: error.message})
    // check if user exists
    const user = await UserModel.findOne({email: value.email})
    if (!user) return res.status(400).json({message: "User does not exist"})
    // compare password
    const match = await bcrypt.compare(value.password, user.password)
    if (!match) return res.status(400).json({message: "Invalid password"})
    // send response
    const payload = {
        email: user.email,
        username: user.username,
        id : user._id,
        role: user.role,
        thumbnail : user.thumbnail
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '6h'})
    return res.status(200).json({token})
}



export async function me (req: Request, res: Response) {
    // @ts-ignore
    return res.status(200).json({user: req.user})

}