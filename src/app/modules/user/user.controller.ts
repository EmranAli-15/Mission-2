import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createStudent = catchAsync(
    async (req, res, next) => {
        const { password, student } = req.body;
        const result = await UserServices.createStudentIntoDB(password, student);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        })
    }
);

const createAdmin = catchAsync(
    async (req, res, next) => {
        const { password, admin } = req.body;
        const result = await UserServices.createAdminIntoDB(password, admin);

        res.status(200).json({
            success: true,
            message: 'Admin is created successfully',
            data: result,
        })
    }
);

const getMe = catchAsync(
    async (req, res, next) => {

        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(400, 'Token not found');
        };

        const result = await UserServices.getMeFromDB(token);

        res.status(200).json({
            success: true,
            message: 'You retrieve successfully!',
            data: result,
        })
    }
);

const changeStatus = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;
        const { status } = req.body;
        const result = await UserServices.changeStatus(id, status);

        res.status(200).json({
            success: true,
            message: 'status changed successfully!',
            data: result,
        })
    }
);

export const userControllers = {
    createStudent,
    createAdmin,
    getMe,
    changeStatus
}