import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { tempid: string } }
) {
  const BlinkData = await prisma.createBlink.findFirst({
    where: {
      id: params.tempid,
    },
  });
  if (BlinkData?.productionready == true) {
    return NextResponse.json(BlinkData?.data);
  }
}

// TODO: build this method
export async function POST(
  request: NextRequest,
  { params }: { params: { tempid: string } }
) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
