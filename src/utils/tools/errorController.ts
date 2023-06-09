import { Request, Response, NextFunction } from 'express'
import { ErrorClass } from './errorClass';

export class ErrorControllerClass extends ErrorClass {
    static ErrorController = (err: ErrorClass, req: Request, res: Response, next: NextFunction) => {
        err.statusCode = err.statusCode || '500'
        err.status = err.status || 'fail'

        const sCode = parseInt(err.statusCode)

        res.status(sCode).json({
            status: err.status,
            message: err.message,
            // err: err,
            statusCode: err.statusCode,
            stack: err.stack
        })

    }
}