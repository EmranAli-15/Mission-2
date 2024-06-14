import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);

        res.status(400).json({
            success: true,
            message: 'User logged in successful',
            data: result
        })
    }
);

const changePassword = catchAsync(
    async (req, res) => {
        const user = req.user;
        const {...passwordData} = req.body; 
        const result = await authServices.changePassword(user, passwordData);

        res.status(400).json({
            success: true,
            message: 'Password changed successfully',
            data: result
        })
    }
);

export const loginUserController = {
    loginUser,
    changePassword
}