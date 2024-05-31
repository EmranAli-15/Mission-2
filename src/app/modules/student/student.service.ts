import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find().populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: 'academicFaculty',
    });
    return result;
};

const getAStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id: id });
    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await StudentModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedStudent) {
            throw new AppError(400, 'failed to delete student');
        }

        const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedUser) {
            throw new AppError(400, 'failed to delete user');
        };

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
    }
}

export const StudentService = {
    getAllStudentsFromDB,
    getAStudentFromDB,
    deleteStudentFromDB
}