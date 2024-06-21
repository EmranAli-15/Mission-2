import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);

        const { refreshToken, accessToken, needsPasswordChange } = result;

        res.cookie('refreshToken', refreshToken, {
            secure: config.NODE_ENV === 'productoin',
            httpOnly: true
        });

        res.status(400).json({
            success: true,
            message: 'User logged in successful',
            data: {
                accessToken,
                needsPasswordChange
            }
        })
    }
);

const changePassword = catchAsync(
    async (req, res) => {
        const user = req.user;
        const { ...passwordData } = req.body;
        const result = await authServices.changePassword(user, passwordData);

        res.status(400).json({
            success: true,
            message: 'Password changed successfully',
            data: result
        })
    }
);

const refreshToken = catchAsync(
    async (req, res) => {
        const { refreshToken } = req.cookies;
        const result = await authServices.refreshToken(refreshToken);

        res.status(400).json({
            success: true,
            message: 'User logged in successful by refreshToken',
            data: result
        })
    }
);

const forgetPassword = catchAsync(
    async (req, res) => {
        const userId = req.body.id;
        const result = await authServices.forgetPassword(userId);

        res.status(400).json({
            success: true,
            message: 'Reset link is generated successfully',
            data: result
        })
    }
);

const resetPassword = catchAsync(
    async (req, res) => {
        const userId = req.body.id;
        const token = req.headers.authorization;

        const result = await authServices.resetPassword(req.body, token as string);

        res.status(400).json({
            success: true,
            message: 'Password reset successfully',
            data: result
        })
    }
);

export const loginUserController = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
};