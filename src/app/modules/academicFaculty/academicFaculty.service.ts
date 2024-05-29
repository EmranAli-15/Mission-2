import { academicInterface } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: academicInterface) => {
    const result = await academicFacultyModel.create(payload);
    return result;
};

const getAllAcademicFacultyFromDB = async () => {
    const result = await academicFacultyModel.find();
    return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await academicFacultyModel.findById(id);
    return result;
};

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<academicInterface>) => {
    const result = await academicFacultyModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}