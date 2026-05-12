import { Admin } from "../../models/admin.model";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { logActivity } from "../../utils/logger";

export const registerAdmin = asyncHandler(async (req, res) => {
    
    const { FullName, AdminID, Email, Password } = req.body; 

    
    if (!FullName || !AdminID || !Email || !Password) {
        throw new ApiError(400, "Fields Missing!");
    }

    
    const existedAdmin = await Admin.findOne({ 
        $or: [{ Email }, { AdminID }] 
    });

    if (existedAdmin) throw new ApiError(409, "Already Exists!");

    const admin = await Admin.create({ 
        FullName, 
        AdminID, 
        Email, 
        Password 
    });

    logActivity('signup', Email);

    return res.status(201).json(
        new ApiResponse(201, { FullName, Email, AdminID }, "Admin Created Successfully!")
    );
});