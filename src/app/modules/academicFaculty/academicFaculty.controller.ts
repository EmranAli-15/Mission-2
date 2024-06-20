import { Console } from "console";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(
    async (req, res) => {
        const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: 'Academic faculty is created successfully',
            data: result
        })
    }
);

const getAllAcademicFaculties = catchAsync(
    async (req, res) => {
        const result = await academicFacultyServices.getAllAcademicFacultyFromDB();
        console.log(req.cookies);

        res.status(200).json({
            success: true,
            message: 'Fetched all academic faculties',
            data: result
        })
    }
);

const getSingleAcademicFaculty = catchAsync(
    async (req, res) => {
        const { facultyId } = req.params;
        const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

        res.status(200).json({
            success: true,
            message: 'Academic faculty retrieved successfully',
            data: result
        })
    }
);

const updateAcademicFaculty = catchAsync(
    async (req, res) => {
        const { facultyId } = req.params;
        const result = await academicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.body);

        res.status(200).json({
            success: true,
            message: 'Academic faculty updated successfully',
            data: result
        })
    }
);

export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}