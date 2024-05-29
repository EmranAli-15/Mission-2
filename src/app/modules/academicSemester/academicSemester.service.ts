import { AcademicSemester } from "./academicSemester.interface"
import { AcademicSemesterModel } from "./academicSemester.model"


const getAllSemestersFromDB = async () => {
    const result = await AcademicSemesterModel.find();
    return result;
};

const getSingleSemesterFromDB = async (id: string) => {
    const result = await AcademicSemesterModel.findById(id);
    return result;
};

const createSemesterIntoDB = async (semester: AcademicSemester) => {

    type codeMapper = {
        [key: string]: string;
    };

    const semesterCodeMapper: codeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };

    if (semesterCodeMapper[semester.name] !== semester.code) {
        throw new Error('Invalid semester code!');
    }

    const result = await AcademicSemesterModel.create(semester);
    return result;
};

const updateSemesterIntoDB = async (id: string, semester: Partial<AcademicSemester>) => {
    type codeMapper = {
        [key: string]: string;
    };
    const semesterCodeMapper: codeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };

    if (
        semester.name &&
        semester.code &&
        semesterCodeMapper[semester.name] !== semester.code
    ) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, semester, {
        new: true,
    });
    return result;
};


export const academicSemesterServices = {
    createSemesterIntoDB,
    getAllSemestersFromDB,
    updateSemesterIntoDB,
    getSingleSemesterFromDB
}