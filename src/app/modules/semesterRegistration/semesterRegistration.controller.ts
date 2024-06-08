import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
    async (req, res) => {
        const body = req.body;
        const result = await semesterRegistrationService.createSemesterRegistrationIntoDB(body);

        res.status(200).json({
            success: true,
            message: 'Semester registration is created successfully',
            data: result
        })
    }
);

export const semesterRegistrationControllers = {
    createSemesterRegistration
};