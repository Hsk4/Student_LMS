import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new Schema({
    FullName: { type: String, required: true, trim: true },
    AdminID: { type: String, required: true, unique: true, trim: true },
    Email: { type: String, required: true, unique: true, trim: true },
    Password: { type: String, required: true },
    Role: { type: String, default: "admin" }
}, { timestamps: true });

AdminSchema.pre("save", async function () {
  
  if (!this.isModified("Password")) return;
  
  this.Password = await bcrypt.hash(this.Password, 10);
});

AdminSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.Password);
};

export const Admin = mongoose.model("Admin", AdminSchema);