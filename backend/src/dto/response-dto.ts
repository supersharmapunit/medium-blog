export class ResponseDTO {
    error: any
    success: boolean
    message: string
    data: any

    constructor(error: any, success: boolean, message: string, data: any) {
        this.error = error
        this.success = success
        this.message = message
        this.data = data
    }
}