import config from "../../config";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: Student) => {

    const userData: Partial<TUser> = {};

    userData.password = password || config.default_pass as string;

    userData.role = 'student';

    userData.id = '202401031048'

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