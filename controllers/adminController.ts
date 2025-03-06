// ***  GERER LES MODELS AI AFFICHER, SUPPRIMER, TELECHARGER

// *** GERER LES USERS: LISTER, SUPPRIMER


import {UserModel} from "../models/userModel.ts";
import express from "express";

export  async function usersList(req: express.Request, res: express.Response) {
    const users = await UserModel.find().select("-password")
    return res.status(200).json(users)
}

// *** ? DATA ANALYSIS :