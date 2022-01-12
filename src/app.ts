import express from 'express'
import { FindRouter } from "./routes/find";
import { RetrieveRouter } from "./routes/retrieve";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(FindRouter)
app.use(RetrieveRouter)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

export { app as App }
