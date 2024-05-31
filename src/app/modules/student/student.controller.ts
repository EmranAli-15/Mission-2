import { StudentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";


const getAllStudents = catchAsync(
    async (req, res) => {
        const result = await StudentService.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'Students are retrieved successfully',
            data: result,
        })
    }
);

const getAStudent = catchAsync(
    async (req, res) => {
        const studentId = req.params.studentId;
        const result = await StudentService.getAStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student retrieved successfully',
            data: result,
        })
    }
);

const deleteStudent = catchAsync(
    async (req, res) => {
        const studentId = req.params.studentId;
        const result = await StudentService.deleteStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            data: result
        })
    }
);



export const StudentControllers = {
    getAllStudents,
    getAStudent,
    deleteStudent
}