import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Log from "@/models/log";

export async function GET(
  req: NextRequest,
  { params }: { params: { student_id: string } }
) {
  await dbConnect();

  try {
    const logs = await Log.find({ student_id: params.student_id });
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { student_id: string } }
) {
  await dbConnect();

  try {
    const { log, logDate } = await req.json();
    const today = Date.now();

    // const formattedDate = getDateString(today);

    const existingLog = await Log.findOne({
      student_id: params.student_id,
      logDate: logDate,
    });
    if (existingLog)
      return NextResponse.json(
        { error: "A log already exists for this student on this date." },
        { status: 400 }
      );

    const newLog = await Log.create({
      student_id: params.student_id,
      log,
      logDate: logDate,
      logTimestamp: today,
    });

    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create log" },
      { status: 500 }
    );
  }
}
