import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { Logger } from './src/utils/loaders/Logger'
import { DB } from './src/utils/loaders/Mongoose'

const server = async (): Promise<express.Application> => {
    const app = express()
    dotenv.config()
    Logger.Loader()

    app.use(express.json())

    /* Things that are required to initialized before the server starts can come here.
    Loggers & Middlewares */
    await DB.connectToDB()

    app.get('*', (req: Request, res: Response) => {
        res.status(404).json({
            status: false,
            message: '404 API Not Found'
        })
    })

    return app
}

export default server