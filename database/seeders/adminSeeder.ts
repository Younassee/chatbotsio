import dotenv from "dotenv"
import bcrypt from "bcrypt"
import {dbConnect} from "../dbConnect"
import {UserModel} from "../../models/userModel"


dotenv.config()


async function adminSeeder () {

    const connection = await dbConnect()

    const data = {
        username : "admin",
        email : "admin@admin.fr",
        role : "admin",
        password : await bcrypt.hash("1234567890", 10)
    }
   const admin =  await UserModel.findOne({email : data.email})

   if(admin) {
     console.log("Admin seeder not executed up to date");
     return
   }
   await UserModel.create(data)
   console.log("Admin seeder executed successfully");
   connection?.connection.close()
   process.exit(0)
}


await adminSeeder()