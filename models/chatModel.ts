import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    title: { type: String, required: true }, // CHAT MAIN TITLE
    contents: [
        {
            content: { type: String, required: true}, // CHAT MESSAGE
            date: { type: Date, default: Date.now, index: true }, // CHAT DATE
            role: { type: String, enum: ['user', 'assistant', 'system'], required: true } // USER OR ASSISTANT OR SYSTEM
        }
    ],
    userId: { type: Schema.Types.ObjectId, ref: "User" } // CHAT BELONGS TO A SPECIFIC USER
}, { timestamps: true });

export const ChatModel = model("Chat", chatSchema);