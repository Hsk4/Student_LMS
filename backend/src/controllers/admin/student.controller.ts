import { Student } from "../../models/studentsignup.model";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { logActivity } from "../../utils/logger";

export const addStudent = asyncHandler(async (req, res) => {

    const { FullName, StudentID, RollNumber, Email, Password, Phone, HomeroomTeacher, SemesterFees, PreviousSchool } = req.body;

    
    if ([FullName, StudentID, Email, Password].some((field) => field === undefined || field?.trim() === "")) {
        throw new ApiError(400, "Fields Missing!");
    }

   const existedStudent = await Student.findOne({ 
    $or: [{ Email }, { StudentID }] 
});

    if (existedStudent) {
        throw new ApiError(409, " This Email is already exicts!");
    }

    
    const student = await Student.create({
        FullName,
        StudentID,
        RollNumber,
        Email,
        Password, 
        Phone,
        HomeroomTeacher,
        SemesterFees,
        PreviousSchool
    });

    
    logActivity('signup', Email);

    
    return res.status(201).json(
        new ApiResponse(201, student, "Student created successfully ")
    );
});