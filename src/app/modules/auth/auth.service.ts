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
        throw new AppError(400, 'Admin not FOUNDED!');
    };
    if (isUserExist?.isDeleted === true) {
        throw new AppError(400, 'Admin is DELETED!');
    };
    if (isUserExist?.status === 'blocked') {
        throw new AppError(403, 'Admin is BLOCKED!');
    };


    // if (!(await User.isUserExistsByCustomId(payload.id))) {
    //     throw new AppError(400, 'Admin not FOUNDED!');
    // }

    // create token and sent to the client

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


export const authServices = {
    loginUser,
}