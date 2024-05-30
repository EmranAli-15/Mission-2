import { Types } from "mongoose";

export type academicDepartmentInterface = {
    name: string;
    academicFaculty: Types.ObjectId;
}