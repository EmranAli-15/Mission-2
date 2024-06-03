import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Student } from "./student.interface";

const getAllStudentsFromDB = async (query: any) => {
    const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
    const queryObj = { ...query };
    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm;
    };

    const searchQuery = StudentModel.find({
        $or: studentSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    });

    const excludeFields = ['searchTerm', 'sort', 'limit'];

    excludeFields.forEach((el) => {
        return delete queryObj[el];
    });

    const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: 'academicFaculty',
    });

    let sort = '-1';
    if(query.sort){
        sort = query.sort;
    };

    const sortQuery = filterQuery.sort(sort);

    let limit = 1;
    if(query.limit){
        limit = query.limit;
    };

    const limitQuery = sortQuery.limit(limit);



    return limitQuery;
};

const getAStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id: id });
    return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {

    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    };

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    };

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }


    const result = await StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });

    return result;
}

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
        throw new AppError(400, 'failed to delete student');
    }
}

export const StudentService = {
    getAllStudentsFromDB,
    getAStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
}