import { NextFunction, Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import User from "../../models/userModel";
import { ErrorClass } from "../../utils/tools/errorClass";
import { sendOTP } from "./otpService/sendOTP";
import { getUserFromToken } from "../../utils/tools/getUserFromToken";


export class UserAuth {
    static async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            let token = undefined
            const { name, username, email, password } = req.body

            if (!name || !username || !email || !password) {
                return res.status(400).json({ status: false, error: "Please provide all the fields." });
            }

            const newUser = await User.create({ name, username, email, password })

            // TODO:  Create new session document in database

            if (process.env.JWT_Secret == undefined) {
                next(new ErrorClass('Server Side Error Code: 1080', 500))
            } else {
                token = sign(newUser.id, process.env.JWT_Secret)
            }

            /*
                Uncomment below line to activate OTP funtionality
                
                sendOTP(newUser.email, newUser.otp, next)
            */


            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                secure: true,
                httpOnly: true
            })

            res.status(200).json({
                success: true,
                message: 'User created successfully.',
                token: token,
                data: {
                    id: newUser.id,
                    user: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                }
            })

        } catch (err) {
            next(err)
        }
    }

    static async verifyOTP(req: Request, res: Response, next: NextFunction) {
        try {
            const OTP = req.body.OTP

            if (!OTP) return next(new ErrorClass('OTP not provided.', 400))

            const user: any = await getUserFromToken(req, res, next)

            if (user.accountActive == 'verification-pending') {
                const isOTPValid: boolean = await user.verifyOTP(OTP, user.otp)

                if (isOTPValid) {
                    await user.updateOne({ accountActive: 'active' })

                    res.status(200).json({
                        success: true,
                        message: 'OTP verified successfully.',
                    })
                } else {
                    return next(new ErrorClass('Invalid OTP.', 400))
                }
            } else {
                return next(new ErrorClass('Your account is already verified.', 400))
            }


        } catch (err) {
            next(err)
            return
        }
    }
}