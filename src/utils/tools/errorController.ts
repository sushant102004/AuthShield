import { Request, Response, NextFunction } from 'express'
import { ErrorClass } from './errorClass';

export class ErrorControllerClass extends ErrorClass {
    static ErrorController = (err: ErrorClass, req: Request, res: Response, next: NextFunction) => {
        err.statusCode = err.statusCode || '500'

        const status = err.statusCode.startsWith('5') ? 'error' : 'fail'


        if (err.message.split(' ')[0] == 'E11000') {
            res.status(409).json({
                message: 'Duplicate Value',
                statusCode: 409,
            })
            return
        }


        res.status(parseInt(err.statusCode)).json({
            status: status,
            message: err.message,
        })

    }
}