import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const StudentSchema = new Schema({
  FullName: { type: String, required: true, trim: true },
  StudentID: { type: String, required: true, trim: true, unique: true },
  RollNumber: { type: Number, required: true },
  Email: { type: String, required: true, trim: true, unique: true },
  Phone: { type: Number, required: true },
  Password: { type: String, required: true }, 
  HomeroomTeacher: { type: String, required: true },
  SemesterFees: { type: Number, required: true },
  PreviousSchool: { type: String, required: true },
}, { timestamps: true });


StudentSchema.pre("save", async function () {
  
  if (!this.isModified("Password")) return;
  
  this.Password = await bcrypt.hash(this.Password, 10);
});

StudentSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.Password);
};

export const Student = mongoose.model("Student", StudentSchema);