import { Types } from "mongoose";

export type preRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export type courseInterface = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: [],
    isDeleted?: boolean,
}