import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log(req.nextUrl.origin);

  return NextResponse.json(
    {
      rules: [
        {
          pathPattern: "/viewblink/**",
          apiPath: "/api/blink/**",
        },
        {
          pathPattern: "/dashboard/blinks/**",
          apiPath: "/api/createblinklive/**",
        },
      ],
    },
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
}
