import express from 'express'

const app = express()

app.use(express.json())

import {router as AuthRouter} from "./routes/auth.route.js"
import { errorMiddleware } from './middlewares/error.middleware.js'

app.use("/api/auth",AuthRouter)

app.use(errorMiddleware)

export default app;