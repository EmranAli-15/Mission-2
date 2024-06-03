import { StudentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";


const getAllStudents = catchAsync(
    async (req, res) => {
        const query = req.query;
        const result = await StudentService.getAllStudentsFromDB(query);

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

const updateStudent = catchAsync(
    async (req, res) => {
        const studentId = req.params.studentId;
        const student = req.body.student;
        const result = await StudentService.updateStudentIntoDB(studentId, student);

        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: result
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
    deleteStudent,
    updateStudent
}