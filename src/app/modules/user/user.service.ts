import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { userModel } from "./user.model"

const createStudentIntoDB = async (password: string, studentData: TStudent) => {


    const userData: Partial<TUser> = {}

    // ! if password is given otherwise use default
    userData.password = password || (config.default_password as string)

    // ! set role
    userData.role = "student",

    // ! set id
    userData.id = "2030010001"

    // ! create user
    const newUser = await userModel.create(userData)

    // ! create a student
    if(Object.keys(newUser).length){
        studentData.id = newUser.id,
        studentData.user = newUser._id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
    // const result = await userModel.create(studentData);
    // return result; 
}


export const UserServices = {
    createStudentIntoDB
}