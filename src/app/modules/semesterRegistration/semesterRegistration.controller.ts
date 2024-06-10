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

const getAllSemesterRegistrations = catchAsync(
    async (req, res) => {
        const result = await semesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query);

        res.status(200).json({
            success: true,
            message: 'Semester registration retrieve successfully.',
            data: result
        })
    }
);

const getSingleSemesterRegistration = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

        res.status(200).json({
            success: true,
            message: 'Semester registration retrieve successfully.',
            data: result
        })
    }
);

const updateSemesterRegistration = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const result = await semesterRegistrationService.updateSemesterRegistrationIntoDB(id, body);

        res.status(200).json({
            success: true,
            message: 'Semester registration updated successfully.',
            data: result
        })
    }
);

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration
};