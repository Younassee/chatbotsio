import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { dbConnect } from "../dbConnect";
import { UserModel } from "../../models/userModel";
import { faker } from "@faker-js/faker";

dotenv.config();

async function fakeUsersSeeder() {
    const connection = await dbConnect();

    const users = [];
    for (let i = 0; i < 100; i++) {
        users.push({
            username: faker.internet.username(),
            email: faker.internet.email().toLowerCase(),
            role: "user",
            password: await bcrypt.hash("password123", 10),
        });
    }

    await UserModel.insertMany(users);
    console.log("100 users inserted successfully");

    connection?.connection.close();
    process.exit(0);
}

await fakeUsersSeeder();
