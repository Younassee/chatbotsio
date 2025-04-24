// ***  GERER LES MODELS AI AFFICHER, SUPPRIMER, TELECHARGER

// *** GERER LES USERS: LISTER, SUPPRIMER


import {UserModel} from "../models/userModel.ts";
import express from "express";

export  async function getUsersList(req: express.Request, res: express.Response) {

    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const username = req.query.username as string;

    let query = {};
    if (username) {
        query = { username: { $regex: username, $options: "i" } }; // Recherche insensible à la casse
    }

    const users = await UserModel
        .find(query)
        .select("-password")
        .skip(skip)
        .limit(limit);

    const totalUsers = await UserModel.countDocuments(query);

    return res.status(200).json({
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
    })
}

export  async function deleteUser(req: express.Request, res: express.Response) {
    const userId = req.params.userId
    await  UserModel.deleteOne({_id: userId})
    return res.status(200).json({message: "User deleted successfully."})
}

// *** ? DATA ANALYSIS :