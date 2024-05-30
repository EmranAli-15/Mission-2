import catchAsync from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(
    async (req, res) => {
        const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: 'Academic department is created successfully',
            data: result
        })
    }
);

const getAllAcademicDepartments = catchAsync(
    async (req, res) => {
        const result = await academicDepartmentServices.getAllAcademicDepartmentFromDB();

        res.status(200).json({
            success: true,
            message: 'Fetched all academic departments',
            data: result
        })
    }
);

const getSingleAcademicDepartment = catchAsync(
    async (req, res) => {
        const { departmentId } = req.params;
        const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);

        res.status(200).json({
            success: true,
            message: 'Academic department retrieved successfully',
            data: result
        })
    }
);

const updateAcademicDepartment = catchAsync(
    async (req, res) => {
        const { departmentId } = req.params;
        const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, req.body);

        res.status(200).json({
            success: true,
            message: 'Academic department updated successfully',
            data: result
        })
    }
);

export const academicFacultyController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}