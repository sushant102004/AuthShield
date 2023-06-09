import mongoose from 'mongoose'
import { Logger } from './Logger'

export class DB {
    static async connectToDB() {
        try {
            const mongoDB_URI = process.env.MONGODB_URI

            if (mongoDB_URI) {
                await mongoose.connect(mongoDB_URI)
                Logger.instance.info(`Connected to MongoDB`)
            } else {
                Logger.instance.error('MongoDB URI not specified')
            }
        } catch (err) {
            Logger.instance.error(`Error: ${err}`)
            process.exit(1)
        }
    }
}