import supertest from "supertest";
import { App } from "../../src/app";
import {ApiError} from "../../src/models/responses/api_error";

const app = App

test("/find returns 400 when userQuery not provided", async () => {
    await supertest(app)
        .get("/find")
        .expect(400)
        .then((response) => {
            const apiError = response.body as ApiError
            expect(apiError).toBeDefined()
            expect(apiError.error).toBe("A userQuery is required")
        })
})

test("/find returns 400 when countryCode not provided", async () => {
    await supertest(app)
        .get("/find")
        .query({ userQuery: "16 River" })
        .expect(400)
        .then((response) => {
            const apiError = response.body as ApiError
            expect(apiError).toBeDefined()
            expect(apiError.error).toBe("A countryCode is required")
        })
})
