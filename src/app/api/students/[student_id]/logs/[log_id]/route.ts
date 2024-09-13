import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Log from "@/models/log";

// GET: Retrieve log by logDate (log_id maps to logDate)
export async function GET(
  req: NextRequest,
  { params }: { params: { log_id: string } }
) {
  await dbConnect();

  try {
    const log = await Log.findOne({ logDate: params.log_id });
    if (!log)
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
  }
}

// PUT: Update log by logDate (log_id maps to logDate)
export async function PUT(
  req: NextRequest,
  { params }: { params: { log_id: string } }
) {
  await dbConnect();

  try {
    const updatedLog = await Log.findOneAndUpdate(
      { logDate: params.log_id }, // Search by logDate
      await req.json(),
      { new: true }
    );
    if (!updatedLog)
      return NextResponse.json(
        { error: `Log not found with logDate: ${params.log_id}` },
        { status: 404 }
      );
    return NextResponse.json(updatedLog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update log" },
      { status: 500 }
    );
  }
}

// DELETE: Delete log by logDate (log_id maps to logDate)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { log_id: string } }
) {
  await dbConnect();

  try {
    const deletedLog = await Log.findOneAndDelete({ logDate: params.log_id });
    if (!deletedLog)
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete log" },
      { status: 500 }
    );
  }
}
