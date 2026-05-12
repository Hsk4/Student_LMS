import { Router } from "express";
import { addStudent } from "../controllers/admin/student.controller";
import { addTeacher } from "../controllers/admin/teacher.controller";
import { registerAdmin } from "../controllers/admin/adminAuth.controller";

const adminRouter = Router();


adminRouter.post("/add-student",addStudent);

adminRouter.post("/add-teacher",addTeacher);

adminRouter.post("/add-admin",registerAdmin);

export default adminRouter;