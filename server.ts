import express from 'express'
import dotenv from 'dotenv'
import { Logger } from './src/utils/loaders/Logger'
import { DB } from './src/utils/loaders/Mongoose'

const server = async (): Promise<express.Application> => {
    const app = express()
    dotenv.config()
    Logger.Loader()

    /* Things that are required to initialized before the server starts can come here.
    Loggers & Middlewares */
    DB.connectToDB()


    return app
}

export default server