import express from 'express'
import { SignUpService } from '../services/signup/signup.service'

const authRouter = express.Router()

authRouter.route('/').post(SignUpService.createUser)

export default authRouter