import { academicDepartmentInterface } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: academicDepartmentInterface) => {
    const result = await academicDepartmentModel.create(payload);
    return result;
};

const getAllAcademicDepartmentFromDB = async () => {
    const result = await academicDepartmentModel.find().populate('academicFaculty');
    return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await academicDepartmentModel.findById(id);
    return result;
};

const updateAcademicDepartmentIntoDB = async (id: string, payload: Partial<academicDepartmentInterface>) => {
    const result = await academicDepartmentModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
}