import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import { generatedAdminId } from "../admin/admin.utils";
import { adminModel } from "../admin/admin.model";
import { adminInterface } from "../admin/admin.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { courseFacultyModel } from "../course/course.model";

const createStudentIntoDB = async (password: string, studentData: Student) => {
    const userData: Partial<TUser> = {};

    userData.password = password || config.default_pass as string;
    userData.role = 'student';
    userData.email = studentData.email;

    const admissionSemester = await AcademicSemesterModel.findById(studentData.admissionSemester);
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        userData.id = await generateStudentId(admissionSemester);

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, 'failed to create user 1');
        }

        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;

        const newStudent = await StudentModel.create([studentData], { session });

        if (!newStudent.length) {
            throw new AppError(400, 'failed to create new student 2');
        }
        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'failed to create student 3');
    }
};

const createAdminIntoDB = async (password: string, adminData: adminInterface) => {
    const userData: Partial<TUser> = {};

    userData.password = password || config.default_pass as string;
    userData.role = 'admin';
    userData.email = adminData.email;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        userData.id = await generatedAdminId();

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, 'failed to create user');
        }

        adminData.id = newUser[0].id;
        adminData.user = newUser[0]._id;

        const newAdmin = await adminModel.create([adminData], { session });

        if (!newAdmin.length) {
            throw new AppError(400, 'failed to create new Admin');
        }
        await session.commitTransaction();
        await session.endSession();

        return newAdmin;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'failed to create Admin ......');
    }
}

const getMeFromDB = async (token: string) => {

    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    const { userId, role } = decoded;

    let result = null;
    if (role === 'student') {
        result = await StudentModel.findOne({ id: userId });
    };
    if (role === 'admin') {
        result = await adminModel.findOne({ id: userId });
    };
    if (role === 'faculty') {
        result = await courseFacultyModel.findOne({ id: userId });
    };

    return result;
};

const changeStatus = async (id: string, status: string) => {
    const result = await User.findByIdAndUpdate(id, { status }, { new: true });
    return result;
};


export const UserServices = {
    createStudentIntoDB,
    createAdminIntoDB,
    getMeFromDB,
    changeStatus
}