import { Types } from "mongoose"

export type semesterRegistrationInterface = {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING' | 'ONGOING' | 'ENDED';
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
}