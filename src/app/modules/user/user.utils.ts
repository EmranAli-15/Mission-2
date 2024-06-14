import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (data: any) => {
    let currentId = (0).toString();

    const lastStudentId = await findLastStudentId();
    const lastStudentCode = lastStudentId?.substring(4, 6);
    const lastStudentYear = lastStudentId?.substring(0, 4);

    const currentCode = data.code;
    const currentYear = data.year;

    if(lastStudentId && lastStudentCode === currentCode && lastStudentYear === currentYear){
        currentId = lastStudentId.substring(6);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${data.year}${data.code}${incrementId}`;

    return incrementId;
};