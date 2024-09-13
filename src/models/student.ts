import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  grade_level: "K1" | "K2" | "K3";
}

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    grade_level: { type: String, enum: ["K1", "K2", "K3"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);
