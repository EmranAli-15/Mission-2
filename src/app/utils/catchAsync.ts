// const catchAsync = (fn: RequestHandler) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//     }
// }

import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch(error => next(error));
    }
};

export default catchAsync;


/*
async (req, res) => {

    const result = await academicSemesterServices.createSemesterIntoDB(req.body);

    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    })
}
*/