import express, { Request, Response } from "express";

const RetrieveRouter = express.Router()

RetrieveRouter.get("/retrieve", async (req: Request, res: Response) => {
    res.send("retrieve")
})

export { RetrieveRouter }
