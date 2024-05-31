import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";

const createStudentIntoDB = async (password: string, studentData: Student) => {
    const userData: Partial<TUser> = {};

    userData.password = password || config.default_pass as string;
    userData.role = 'student';

    const admissionSemester = await AcademicSemesterModel.findById(studentData.admissionSemester);


    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        userData.id = await generateStudentId(admissionSemester)

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, 'failed to create user');
        }

        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;

        const newStudent = await StudentModel.create([studentData], { session });

        if (!newStudent.length) {
            throw new AppError(400, 'failed to create new student');
        }
        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'failed to create student');
    }
};


export const UserServices = {
    createStudentIntoDB,
}