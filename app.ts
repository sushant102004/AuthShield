import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'Welcome to AuthSheild'
    })
})


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})