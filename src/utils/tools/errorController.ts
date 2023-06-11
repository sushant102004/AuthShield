import { Request, Response, NextFunction } from 'express'
import { ErrorClass } from './errorClass';

export class ErrorControllerClass extends ErrorClass {
    static ErrorController = (err: ErrorClass, req: Request, res: Response, next: NextFunction) => {
        err.statusCode = err.statusCode || '500'
        err.status = err.status || 'fail'

        const sCode = parseInt(err.statusCode)



        if (err.message.split(' ')[0] == 'E11000') {
            res.status(409).json({
                status: 'fail',
                message: 'Duplicate Value',
                statusCode: 409,
            })

            return
        }


        res.status(sCode).json({
            status: err.status,
            message: err.message,
            statusCode: err.statusCode,
        })

    }
}