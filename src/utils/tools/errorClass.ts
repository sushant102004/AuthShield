export class ErrorClass extends Error {
    message: string
    statusCode: string
    status: string

    constructor(message: string, statusCode: string) {
        super(message)
        this.message = message
        this.statusCode = statusCode

        this.status = statusCode.startsWith('4') ? 'fail' : 'error'
    }
}