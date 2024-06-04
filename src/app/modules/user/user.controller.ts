import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

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
            message: 'Student is created successfully',
            data: result,
        })
    }
)


export const userControllers = {
    createStudent,
    createAdmin
}