import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { tempid: string } }
) {
  const BlinkData = await prisma.blinks.findFirst({
    where: {
      id: params.tempid,
    },
  });
  if (BlinkData?.productionready == true) {
    return NextResponse.json(
      { error: "Blink is already in production" },
      { status: 400 }
    );
  }
  return NextResponse.json(BlinkData?.data);
}
