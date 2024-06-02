import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = 'something went wrong!';

    type TErrorSources = {
        path: string | number;
        message: string;
    }[];

    let errorSources: TErrorSources = [{
        path: '',
        message: 'something went wrong!........'
    }];



    const handleZodError = (error: ZodError) => {
        const statusCode = 400;
        const errorSources = error.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message
            }
        })
        return {
            statusCode,
            message: 'Validation Error',
            errorSources
        }
    }



    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources
    }


    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? error?.stack : null
    })
};


export { globalErrorHandler }