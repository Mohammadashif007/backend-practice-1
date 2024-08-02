import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // ! build in static method
  // if(await Student.isUserExists(studentData.id as string)){
  //   throw new Error("Student already exists!")
  // }
  const result = await Student.create(studentData);
  return result;

  // ! build in instance method
  // const student = new Student(studentData);
  // if(await student.isUserExists(studentData.id as string)){ //! custom instance
  //   throw new Error("User already exists!")
  // }
  // const result = await student.save();
  // return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{$match: {id: id}}]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
