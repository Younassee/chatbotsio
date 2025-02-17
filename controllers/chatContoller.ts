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

/// *** RECUPERER L'historique