import { NextResponse } from "next/server";

export function GET(
  request: Request,
  { params }: { params: { tempid: string } }
) {
  return NextResponse.json({ data: "test" });
}
