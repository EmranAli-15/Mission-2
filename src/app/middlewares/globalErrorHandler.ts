import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = 'something went wrong!';
    return res.status(statusCode).json({
        success: false,
        message: message || error.message,
        error: error,
    })
};


export { globalErrorHandler }