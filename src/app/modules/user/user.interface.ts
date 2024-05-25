export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'student' | 'admin' | 'faculty';
    isDeleted: boolean;
    status: 'in-progress' | 'blocked';
};