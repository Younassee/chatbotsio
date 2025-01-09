import {describe, it , expect} from "bun:test"
import request from "supertest"
import {app} from "../../index"

describe(" POST /Register", () => {
    it.skip("should register a user", async () => {
        
        const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
            email: "test@test.com",
            password: "password",
            username: "username"
        })
        expect(response.status).toBe(201)
    })

    it("should return 400 if email is not provided", async () => {
        
        const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
            password: "password",
            username: "username"
        })
        expect(response.status).toBe(400)
    })

    it("should return 400 if password is not provided", async () => {
        
        const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
            email: "test@test.com",
            username: "username"
        })
        expect(response.status).toBe(400)
    })


    it("should return 400 if username is not provided", async () => {
        
        const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
            email: "test@test.com",
            password: "password"
        })
        expect(response.status).toBe(400)
    })
})