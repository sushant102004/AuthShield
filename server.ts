import express from 'express'
import dotenv from 'dotenv'
import { Logger } from './src/utils/loaders/Logger'

const server = async (): Promise<express.Application> => {
    const app = express()
    dotenv.config()
    Logger.Loader()

    /* Things that are required to initialized before the server starts can come here.
    Loggers & Middlewares */

    return app
}

export default server