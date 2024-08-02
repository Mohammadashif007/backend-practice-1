import express from "express";
import { UserControllers } from "./user.collection";

const router = express.Router();

router.post("/create-student", UserControllers.createStudent)


export const UserRoutes = router;