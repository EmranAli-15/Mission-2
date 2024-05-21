import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { studentValidationSchema } from "./student.validation.zod";

const createStudent = async (req: Request, res: Response) => {
    try {

        
        const student = req.body.student;
        const zodParseData = studentValidationSchema.parse(student);
        const result = await StudentService.createStudentIntoDB(zodParseData);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Student is created successfully',
            data: error,
        })
    }
};

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
    createStudent,
    getAllStudents,
    getAStudent
}