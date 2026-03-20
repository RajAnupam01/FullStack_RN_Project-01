import express from 'express'

const app = express()

app.use(express.json())

import {router as AuthRouter} from "./routes/auth.route.js"
import {router as UserRouter} from "./routes/user.route.js"
import {router as PinRouter} from "./routes/pin.route.js"
import { errorMiddleware } from './middlewares/error.middleware.js'

app.use("/api/auth",AuthRouter)
app.use("/api/user",UserRouter)
app.use("/api/pin",PinRouter)

app.use(errorMiddleware)

export default app;