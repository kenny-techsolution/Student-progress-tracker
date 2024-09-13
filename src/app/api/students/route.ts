import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Student from "@/models/student";

export async function GET() {
  await dbConnect();

  try {
    const students = await Student.find({});
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { name, grade_level } = await req.json();
    const newStudent = await Student.create({ name, grade_level });
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
