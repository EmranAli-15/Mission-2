import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'student' | 'admin' | 'faculty';
    isDeleted: boolean;
    status: 'in-progress' | 'blocked';
};

export interface userModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
};

export type TUserRole = keyof typeof USER_ROLE;