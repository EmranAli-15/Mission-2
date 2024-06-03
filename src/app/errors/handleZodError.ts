import { ZodError, ZodIssue } from "zod";

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
};

export default handleZodError;