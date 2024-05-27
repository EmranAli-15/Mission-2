import catchAsync from "../../utils/catchAsync";

const createSemester = catchAsync(
    async (req, res) => {



        res.status(200).json({
            success: true,
            message: 'Academic semester created successfully',
            data: '',
        })
    }
);

export const createAcademicSemester = {
    createSemester,
}

