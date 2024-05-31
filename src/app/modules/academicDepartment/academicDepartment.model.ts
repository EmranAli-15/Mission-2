import { Schema, model } from "mongoose";
import { academicDepartmentInterface } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<academicDepartmentInterface>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'academicFaculty'
    }
},
    {
        timestamps: true
    });


academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await academicDepartmentModel.findOne({
        name: this.name
    })

    if (isDepartmentExist) {
        throw new Error('The department is already exist!');
    }
    next();
});


academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await academicDepartmentModel.findOne(query);

    if (!isDepartmentExist) {
        throw new AppError(404, 'This department dose not exist!');
    };
    next();
})


export const academicDepartmentModel = model<academicDepartmentInterface>(
    'academicDepartment', academicDepartmentSchema
);