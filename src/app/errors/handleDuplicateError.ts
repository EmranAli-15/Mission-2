import { TErrorSources } from "../interface/error";

const handleDuplicateError = (error: any) => {

        const match = error.message.match(/"([^"]*)"/);
        const extractedMessage= match && match[1];

    const errorSources: TErrorSources = [
        {
            path: "error.keyValue",
            message: `${extractedMessage} is already exist`
        }
    ]

    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources
    }
};

export default handleDuplicateError;