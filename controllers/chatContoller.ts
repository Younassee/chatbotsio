import type { Request, Response } from 'express'
import ollama, { type Message } from 'ollama'
import { ChatModel } from '../models/chatModel'




export  async  function chat (req: Request, res: Response) {
    // @ts-ignore USER_ID
    const userId = req.user.id;
    //[{content: string, role: string}]
    const {contents , aiModel, chatId} = req.body


    const response = await ollama.chat({
        model: aiModel,
        messages: contents,
        stream: true
    })

    const chatBotResponse = {content: "", role: "assistant"}

    for await (const chunk of response) {
        chatBotResponse.content += chunk.message.content
        res.write(chunk.message.content)
    }

    contents.push(chatBotResponse)
    const lastUserChat = contents[contents.length - 2]
    if(!chatId) await ChatModel.create({title: contents[0].content.trim(), contents, userId })
    else await ChatModel.findByIdAndUpdate(chatId, { $push: { contents: {$each : [lastUserChat, chatBotResponse]}} })
    return res.end();
}

/// *** SUPPRIMER LA CONVERSATION


export  async function deleteChat(req: Request, res: Response) {
    // @ts-ignore USER_ID
    const userId = req.user.id;
    const chatId = req.params.id
    await  ChatModel.findOneAndDelete({_id : chatId, userId: userId})
    return res.status(200).json({message: "chat delete"})
}

/// *** RECUPERER L'historique

export  async  function  chatHistory(req: Request, res: Response) {
    // @ts-ignore USER_ID
    const userId = req.user.id;
    const histories = await  ChatModel.find({userId: userId}).select("title")
    return res.status(200).json(histories)
}

export  async  function  chatById(req: Request, res: Response) {
    const id = req.params.id
    const chat = await ChatModel.findById(id)
    if(!chat) return res.status(404).json({message : "Chat not found"})

    return res.status(200).json(chat)
}


export async function getLastChat(req: Request, res: Response) {
    // @ts-ignore
    const user = req.user!
    const conversation = await ChatModel.findOne({userId: user.id}).sort({ _id: -1 }).select("_id");
    if (!conversation) return res.status(404).json({ error: "No Chat Found"})
    return res.json(conversation)
}