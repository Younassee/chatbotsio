import {Schema, model} from "mongoose"

const userSchema = new Schema({ 
    username: {type: String, required: true},
    email: {type: String, required: true},
    password:  {type: String, required: true},
    thumbnail: {type: String, default : ""},
    role : {type : String, enum : ["user", "admin"], default : "user"}
})


export const UserModel = model("User", userSchema)