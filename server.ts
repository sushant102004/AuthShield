import express from 'express'
import dotenv from 'dotenv'
import { Logger } from './src/utils/loaders/Logger'
import { DB } from './src/utils/loaders/Mongoose'
import authRouter from './src/routes/authentication.route'

const server = async (): Promise<express.Application> => {
    const app = express()
    dotenv.config()
    Logger.Loader()

    app.use(express.json())

    /* Things that are required to initialized before the server starts can come here.
    Loggers & Middlewares */
    await DB.connectToDB()
    app.use('/signup', authRouter)

    return app
}

export default server