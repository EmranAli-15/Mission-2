import { User } from "../user/user.model"

const findLastAdminId = async () => {
    const lastAdminId = await User.findOne(
        {
            role: 'admin',
        },
        {
            id: 1,
            _id: 0,
        },
    ).sort({
        createdAt: -1,
    }).lean();

    return lastAdminId?.id ? lastAdminId.id : undefined;
};

export const generatedAdminId = async () => {
    let currentId = (0).toString();

    const lastAdminId = await findLastAdminId();
    const  lastAdminIdCode = lastAdminId?.substring(2);

    if(lastAdminIdCode){
        currentId = lastAdminIdCode.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `A-${incrementId}`;

    return incrementId;
}