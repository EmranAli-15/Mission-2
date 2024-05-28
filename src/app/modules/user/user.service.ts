import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, studentData: Student) => {
    const userData: Partial<TUser> = {};

    userData.password = password || config.default_pass as string;
    userData.role = 'student';

    const admissionSemester = await AcademicSemesterModel.findById(studentData.admissionSemester);

    userData.id = await generateStudentId(admissionSemester)


    const newUser = await User.create(userData);

    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }

};


export const UserServices = {
    createStudentIntoDB,
}