import { Types } from "mongoose";

export type adminName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type adminInterface = {
    user: Types.ObjectId;
    name: adminName;
    email: string;
    id: string;
    gender: "male" | "female" | "other";
    isDeleted: boolean;
}