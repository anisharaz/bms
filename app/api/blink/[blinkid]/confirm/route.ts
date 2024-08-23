import prisma from "@/lib/db";
import { NextAction } from "@dialectlabs/blinks";
import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blinkid: string } }
) {
  const blink = await prisma.blinks.findFirst({
    where: {
      id: params.blinkid,
    },
  });
  const { signature, account } = await req.json();
  console.log({ signature, account });
  // @ts-ignore
  const payload: NextAction = blink?.data!;
  payload.type = "completed";
  payload.disabled = true;
  return NextResponse.json(payload, ACTIONS_CORS_HEADERS);
}
