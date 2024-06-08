import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { semesterRegistrationInterface } from "./semesterRegistration.interface";
import { semesterRegistrationModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: semesterRegistrationInterface) => {
    const academicSemester = payload?.academicSemester;

    const isAcademicSemesterExists = await AcademicSemesterModel.findById(academicSemester)
    if (!isAcademicSemesterExists) {
        throw new AppError(400, 'This academic semester not found!');
    };

    const isSemesterRegistrationExits = await semesterRegistrationModel.findOne({academicSemester});
    if (isSemesterRegistrationExits) {
        throw new AppError(400, 'This semester is already registered!');
    };

    const result = await semesterRegistrationModel.create(payload);
    return result;
};

const getAllSemesterRegistrationsFromDB = async () => {

};

const getSingleSemesterRegistrationFromDB = async () => {

};

const updateSemesterRegistrationIntoDB = async () => {

};

export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}