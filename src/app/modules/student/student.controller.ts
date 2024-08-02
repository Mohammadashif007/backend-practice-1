import { Request, Response } from 'express';
import { StudentServices } from './student.server';
import { studentValidationSchema } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const validatedStudentData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(validatedStudentData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong !',
      data: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'All student retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !',
      data: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !',
      data: error,
    });
  }
};


const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Student deleted successfully!",
      data: error
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent
};
