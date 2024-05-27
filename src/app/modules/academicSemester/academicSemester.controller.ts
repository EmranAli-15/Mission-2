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

export const createAcademicSemester = {
    createSemester,
}

