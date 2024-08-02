/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user ID is required'],
      unique: true,
      ref: 'User'
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String },
    isActive: { type: String, enum: ['active', 'block'], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  },
);

//! middleware
// studentSchema.pre('save', async function(next){
//   const student = this;
//   if(student.isNew){
//     const existingStudent = await Student.findOne({id: student.id});
//     if(existingStudent){
//       throw new Error("Student Already Exists!");
//     }
//   }
//   next();
// })

// ! soft delete
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// ! mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// ! custom instance method
// studentSchema.methods.isUserExists  = async function(id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

// ! custom static method

// studentSchema.statics.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

// ! create student model
export const Student = model<TStudent>('Student', studentSchema);
