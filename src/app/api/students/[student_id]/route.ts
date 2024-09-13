import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Student from "@/models/student";

export async function GET(
  req: NextRequest,
  { params }: { params: { student_id: string } }
) {
  await dbConnect();

  try {
    const student = await Student.findById(params.student_id);
    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { student_id: string } }
) {
  await dbConnect();

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      params.student_id,
      await req.json(),
      { new: true }
    );
    if (!updatedStudent)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { student_id: string } }
) {
  await dbConnect();

  try {
    const deletedStudent = await Student.findByIdAndDelete(params.student_id);
    if (!deletedStudent)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
