import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { studentValidationSchema } from "./student.validation.zod";



const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentService.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'Students are retrieved successfully',
            data: result,
        })
    } catch (error) {
        console.log(error);
    }
};

const getAStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId;
        const result = await StudentService.getAStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student retrieved successfully',
            data: result,
        })
    } catch (error) {
        console.log(error);
    }
}

export const StudentControllers = {
    getAllStudents,
    getAStudent
}