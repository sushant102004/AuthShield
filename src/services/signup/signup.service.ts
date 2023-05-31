import { Request, Response } from 'express'
import { UserModel } from '../../models/user.model'
import { Logger } from '../../utils/loaders/Logger'

export class SignUpService {
    static async createUser(req: Request, res: Response) {
        try {
            const email = req.body.email
            const password = req.body.password

            if (!email || !password) {
                res.status(400).json({
                    status: false,
                    message: 'Email or password not specified',
                    data: null
                })
            }

            const newUser = await UserModel.create({ email, password })

            res.status(201).json({
                status: true,
                message: 'User created successfully',
                data: newUser
            })

        } catch (err) {
            Logger.instance.error('Account Creation Error: ' + err)
        }
    }
}