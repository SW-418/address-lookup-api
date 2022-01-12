import express, { Request, Response } from "express";
import {ApiError} from "../models/responses/api_error";
import axios from "axios"
import {IFetchifyFindResponse} from "../models/responses/fetchify/fetchify_find";
import {FindResponse, IFindResponse} from "../models/responses/find";

const FindRouter = express.Router()
const fetchifyBaseUrl = "https://api.craftyclicks.co.uk/address/1.1"
const fetchifyApiToken = ""

FindRouter.get("/find", async (req: Request, res: Response) => {
    const userQuery = req.query?.userQuery
    const countryCode = req.query?.countryCode
    if(!userQuery) { // TODO: Extract as middleware
        return res.status(400).send(new ApiError("A userQuery is required"))
    }
    if(!countryCode) { // TODO: Extract as middleware
        return res.status(400).send(new ApiError("A countryCode is required"))
    }

    // TODO: Inject axios client if possible
    await axios.get(`${fetchifyBaseUrl}/find?key=${fetchifyApiToken}&query=${userQuery}&country=${countryCode}`)
        .then((response) => {
            console.log("Response: ", response.data)
            if(!response?.data?.results) {
                return res.send([])
            }

            let apiResponses = response.data.results as IFetchifyFindResponse[]
            let responses: IFindResponse[] = []

            apiResponses?.map((result: IFetchifyFindResponse) => {
                responses.push(new FindResponse(result.count, result.id, result.labels.join(", ")))
            })

            return res.send(responses)
        })
        .catch((error) => {
            console.error("Exception thrown calling Find API", error.message)
            return res.status(500).send(new ApiError("An error occurred trying to retrieve addresses from our provider"))
        })
})

export { FindRouter }
