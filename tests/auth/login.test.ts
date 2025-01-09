import {describe, it, expect} from "bun:test"
import request from "supertest"
import {app} from "../../index"


describe("POST /login", () => {

    it("should return 400 if email is not provided", async () => {
        const response = await request(app).post("/api/v1/auth/login")
        .send({password: "password"})
        expect(response.status).toBe(400)
    })

    it("should return 400 if password mismatch", async () => {
        const response = await request(app).post("/api/v1/auth/login")
        .send({email: "test@test.com", password: "miiismatch"})
        expect(response.status).toBe(400)
    })


    it("should return a jwt token if user exists", async () => {
        const response = await request(app).post("/api/v1/auth/login")
        .send({email: "test@test.com", password: "password"})
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
    })
})