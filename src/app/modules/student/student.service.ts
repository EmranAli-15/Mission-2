import { StudentModel } from "./student.model";

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find();
    return result;
};

const getAStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id: id });
    return result;
};

export const StudentService = {
    getAllStudentsFromDB,
    getAStudentFromDB,
}