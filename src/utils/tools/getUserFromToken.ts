import { Request, Response, NextFunction } from "express";
import { ErrorClass } from "./errorClass";
import jwt from 'jsonwebtoken'
import User from "../../models/userModel";

export const getUserFromToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (token == undefined) {
        next(new ErrorClass('Authentication token is invald', '401'))
        return
    }

    if (process.env.JWT_Secret) {
        const decoded: any = jwt.verify(token, process.env.JWT_Secret)
        
        const user = await User.findOne({ id: decoded.id });

        if (!user) {
            return next(new ErrorClass('User not found', '404'))
        }

        return user

    } else {
        next(new ErrorClass('Internal Server Error. Code 1080', '401'))
        return
    }
}