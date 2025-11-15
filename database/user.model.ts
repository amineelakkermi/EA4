// /models/user.model.ts
import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "user";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
  },
  { timestamps: true }
);

// منع إعادة تعريف الموديل عند الـ hot reload في Next.js
export default models.User || model<IUser>("User", userSchema);
