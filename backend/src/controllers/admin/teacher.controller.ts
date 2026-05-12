import { Teacher } from "../../models/teachersignup.model"; 
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { logActivity } from "../../utils/logger";

export const addTeacher = asyncHandler(async (req, res) => {

    const { 
        FullName, TeacherID, Degree, Subject, Batch, 
        Semester, JoinedDate, Salary, TotalStudents, 
        Email, Phone, Password, Department, PreviousSchool 
    } = req.body;


  if ([FullName, TeacherID, Email, Password, Subject, Department].some((field) => field === undefined || field?.trim() === "")) {
         throw new ApiError(400, "Fields Missing!");
        }
    
    const existedTeacher = await Teacher.findOne({ 
        $or: [{ Email }, { TeacherID }] 
    });

    if (existedTeacher) {
        throw new ApiError(409, "This Email is already exicts!");
    }

    const teacher = await Teacher.create({
        FullName,
        TeacherID,
        Degree,
        Subject,
        Batch,
        Semester,
        JoinedDate,
        Salary,
        TotalStudents,
        Email,
        Phone,
        Password,
        Department,
        PreviousSchool
    });

    
    logActivity('signup', Email);

    
    return res.status(201).json(
        new ApiResponse(201, teacher, "Teacher registered successfully by Admin")
    );
});