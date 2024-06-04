import { Schema, model } from "mongoose";
import { adminInterface, adminName } from "./admin.interface";

const adminName = new Schema<adminName>({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
})

const adminSchema = new Schema<adminInterface>({
    user: { type: Schema.Types.ObjectId, required: [true, 'User id is required'], unique: true, ref: 'admin' },
    name: {
        type: adminName,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

export const adminModel = model<adminInterface>('Admin', adminSchema);