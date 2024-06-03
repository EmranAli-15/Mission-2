import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = 'something went wrong!';

    

    let errorSources: TErrorSources = [{
        path: '',
        message: 'something went wrong!........'
    }];







    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources
    }
    else if(error?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(error)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }
    else if(error?.name === 'CastError'){
        const simplifiedError = handleCastError(error)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }
    else if(error?.code === 11000){
        const simplifiedError = handleDuplicateError(error)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
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