import { AcademicSemester } from "./academicSemester.interface"
import { AcademicSemesterModel } from "./academicSemester.model"

const createSemesterIntoDB = async (semester: AcademicSemester) => {
    const result = await AcademicSemesterModel.create(semester);
    return result;
};


export const academicSemesterServices = {
    createSemesterIntoDB,
}