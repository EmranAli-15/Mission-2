import { Schema, model } from "mongoose";
import { TUser, userModel } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    });


userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id });
}


export const User = model<TUser, userModel>('User', userSchema);