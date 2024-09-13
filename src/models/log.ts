import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  student_id: string;
  logDate: string;
  logTimestamp: Date;
  log: unknown;
}

const LogSchema: Schema = new Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    logDate: { type: String, required: true },
    logTimestamp: { type: Date, required: true },
    log: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Log || mongoose.model<ILog>("Log", LogSchema);
