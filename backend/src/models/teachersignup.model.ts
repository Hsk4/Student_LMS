import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const TeacherSchema = new Schema ({
  FullName : {type : String , required: true, trim: true},
  TeacherID : {type : String , required: true, trim: true, unique: true},
  Degree : {type : String , required: true, trim: true},
  Subject  : {type : String , required: true, trim: true, },
  Batch  : {type : String , required: true, trim: true, },
  Semester   : {type : String , required: true, trim: true, },
  JoinedDate   : {type : Date , required: true, trim: true, unique: true},
  Salary    : {type : Number , required: true, trim: true, },
  TotalStudents: {type : Number , required: true, trim: true, },
  Email : {type : String , required: true, trim: true, unique: true},
  Phone : {type : Number , required: true, trim: true, unique: true},
  Password : {type : String , required: true, trim: true},
  Department : {type : String , required: true, trim: true},
  PreviousSchool  : {type : String , required: true, trim: true},
}, { timestamps: true });



TeacherSchema.pre("save", async function () {
  
  if (!this.isModified("Password")) return;
  
  this.Password = await bcrypt.hash(this.Password, 10);
});

TeacherSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.Password);
};

export const Teacher = mongoose.model("Teacher", TeacherSchema)

