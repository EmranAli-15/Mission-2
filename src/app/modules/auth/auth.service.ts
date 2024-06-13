import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { loginUserInterface } from "./auth.interface";

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
};


export const authServices = {
    loginUser,
}