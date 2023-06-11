import { Request, Response, NextFunction } from 'express'
import { ErrorClass } from './errorClass';

export class ErrorControllerClass extends ErrorClass {
    static ErrorController = (err: ErrorClass, req: Request, res: Response, next: NextFunction) => {
        err.statusCode = err.statusCode || 500


        if (err.message.split(' ')[0] == 'E11000') {
            res.status(409).json({
                message: 'Duplicate Value',
                statusCode: 409,
            })
            return
        }


        res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
        })

    }
}