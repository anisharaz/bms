import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log(req.nextUrl.origin);

  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/viewblink/**",
        apiPath: "/api/blink/**",
      },
    ],
  };

  return NextResponse.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}
