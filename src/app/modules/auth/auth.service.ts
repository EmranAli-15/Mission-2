import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { loginUserInterface } from "./auth.interface";
import jwt from "jsonwebtoken";

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

    return {
        accessToken,
        needsPasswordChange: isUserExist.needsPasswordChange,
    };
};

const changePassword = async () => {

}


export const authServices = {
    loginUser,
    changePassword
}