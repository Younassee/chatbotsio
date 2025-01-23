import { connect } from "mongoose"


export async function dbConnect() {

    try {
        const connection = await connect(process.env.MONGO_URI!)
        console.log("Database connected")
        return connection
    } catch (error) {
        console.log(error)
    }
}