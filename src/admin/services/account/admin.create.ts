import { NextFunction, Request, Response } from "express";
import Admin from "../../models/admin.model";
import { ErrorClass } from "../../../utils/tools/errorClass";

export class AdminCreate {
    static async createSuperAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const superAdminCount = await Admin.countDocuments()

            if (superAdminCount > 0) {
                next(new ErrorClass('Super Admin already exists.', 409))
                return
            }

            const { name, email, password } = req.body

            if (!name || !email || !password) {
                next(new ErrorClass('Invalid Input.', 400))
            }

            const newAdmin = await Admin.create({
                name: name,
                email: email,
                password: password,
            })

            res.status(200).json({
                status: 'success',
                message: 'Super Admin created successfully.',
                data: newAdmin
            })
        } catch (err) {
            next(err)
        }
    }
}