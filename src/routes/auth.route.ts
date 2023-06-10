import express from "express";
import { UserAuth } from "../services/authentication/authentication";

const authRouter = express.Router()

authRouter.route('/auth/signup').post(UserAuth.signUp)

export default authRouter