import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";

const createSemester = catchAsync(
    async (req, res) => {

        const result = await academicSemesterServices.createSemesterIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: 'Academic semester created successfully',
            data: result,
        })
    }
);

const getAllSemesters = catchAsync(async (req, res) => {
    const result = await academicSemesterServices.getAllSemestersFromDB();

    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    })
});

const getSingleSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
        await academicSemesterServices.getSingleSemesterFromDB(semesterId);

        res.status(200).json({
            success: true,
            message: 'Academic semester created successfully',
            data: result,
        })
});

const updateSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await academicSemesterServices.updateSemesterIntoDB(
        semesterId,
        req.body,
    );

    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    })
});

export const createAcademicSemester = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester
}

