import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { StudentValidationSchema } from "../student/student.validation.zod";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student } = req.body;

        // console.log({ password, student });

        // const zodParseData = StudentValidationSchema.parse(student);


        const result = await UserServices.createStudentIntoDB(password, student);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wring!!',
            data: error,
        })
    }
};


export const userControllers = {
    createStudent
}