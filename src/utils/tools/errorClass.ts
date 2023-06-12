export class ErrorClass extends Error {
    message: string
    statusCode: string

    constructor(message: string, statusCode: string) {
        super(message)
        this.message = message
        this.statusCode = statusCode
    }
}