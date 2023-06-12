import express from "express";
import { UserAuth } from "../services/authentication/authentication";

const authRouter = express.Router()

authRouter.route('/auth/signup').post(UserAuth.signUp)
authRouter.route('/auth/verify-otp').post(UserAuth.verifyOTP)
authRouter.route('/auth/login').post(UserAuth.login)

export default authRouter