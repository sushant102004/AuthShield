import express from 'express'
import dotenv from 'dotenv'

const server = async (): Promise<express.Application> => {
    const app = express()
    dotenv.config()
    
    /* Things that are required to initialized before the server starts can come here.
    Loggers & Middlewares */

    return app
}

export default server