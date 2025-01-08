import  {describe, it, expect} from "bun:test"
import request from 'supertest'
import {app} from '../../index'


describe('GET /show-models', () => {
    it('Should return a 200 status code', async () => {
        const response = await request(app).get('/api/v1/ollama/show-models')
        expect(response.statusCode).toBe(200)
    })


    it('Should return a list of models', async () => {
        const response = await request(app).get('/api/v1/ollama/show-models')
        expect(response.body.models).toBeArray()
    })
})
