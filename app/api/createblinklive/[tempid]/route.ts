import {
  ServerActionState,
  ServerActionStateArray,
} from "@/app/ServerStates/CreateBlinkState";
import { NextRequest, NextResponse } from "next/server";
export function GET(
  request: Request,
  { params }: { params: { tempid: string } }
) {
  const foundIndex = ServerActionStateArray.findIndex((d) => {
    d.instanceID === params.tempid;
  });
  if (foundIndex != -1) {
    return NextResponse.json(ServerActionStateArray[foundIndex].data);
  } else {
    const newState = new ServerActionState();
    newState.instanceID = params.tempid;
    ServerActionStateArray.push(newState);
    return NextResponse.json(newState.data);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { tempid: string } }
) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
