import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { loginUserInterface } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import createToken from "./auth.utils";

const loginUser = async (payload: loginUserInterface) => {
    // check if the user is exist
    const isUserExist = await User.findOne({
        id: payload?.id
    });

    if (!isUserExist) {
        throw new AppError(400, 'User not FOUNDED!');
    };
    if (isUserExist?.isDeleted === true) {
        throw new AppError(400, 'User is DELETED!');
    };
    if (isUserExist?.status === 'blocked') {
        throw new AppError(403, 'User is BLOCKED!');
    };
    if (isUserExist?.password !== payload.password) {
        throw new AppError(403, 'Password not matched!');
    };


    const jwtPayload = {
        userId: isUserExist.id,
        role: isUserExist.role
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: isUserExist.needsPasswordChange,
    };
};

const changePassword = async (user: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

    const isUserExist = await User.findOne({
        id: user.userId,
        role: user.role
    });

    if (!isUserExist) {
        throw new AppError(400, 'User not FOUNDED!');
    };
    if (isUserExist?.isDeleted === true) {
        throw new AppError(400, 'User is DELETED!');
    };
    if (isUserExist?.status === 'blocked') {
        throw new AppError(403, 'User is BLOCKED!');
    };
    if (isUserExist?.password !== payload.oldPassword) {
        throw new AppError(403, 'Password not matched!');
    };

    const result = await User.findOneAndUpdate(
        {
            id: user.userId,
            role: user.role
        },
        {
            password: payload.newPassword,
            needsPasswordChange: false
        }
    )

    if (!result) {
        throw new AppError(403, 'Something went wrong');
    }

    const jwtPayload = {
        userId: isUserExist.id,
        role: isUserExist.role
    }
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {
            expiresIn: '10d'
        }
    );

    return null;

}


export const authServices = {
    loginUser,
    changePassword
}