import { NextFunction, Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import User from "../../models/userModel";
import { ErrorClass } from "../../utils/tools/errorClass";


export class UserAuth {
    static async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            let token = undefined

            const { name, username, email, password } = req.body

            if (!name || !username || !email || !password) {
                return res.status(400).json({ status: false, error: "Please provide all the fields." });
            }

            const newUser = await User.create({ name, username, email, password })


            // TODO:  Create new login document in database

            if (process.env.JWT_Secret == undefined) {
                next(new ErrorClass('Server Side Error Code: 1080', '500'))
            } else {
                token = sign(newUser.id, process.env.JWT_Secret)
            }

            res.status(200).json({
                success: true,
                message: 'User created successfully.',
                data: {
                    id: newUser.id,
                    user: newUser.username,
                    email: newUser.email
                }
            })

        } catch (err) {
            next(err)
        }
    }
}