import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const password = req.body.password;
    console.log(student);
    const result = await UserServices.createStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
