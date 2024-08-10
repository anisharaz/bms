import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log(req.nextUrl.origin);

  return NextResponse.json(
    {
      rules: [
        {
          pathPattern: `${process.env.NEXTAUTH_URL}/viewblink/**`,
          apiPath: `${process.env.NEXTAUTH_URL}/api/blink/**`,
        },
        {
          pathPattern: `${process.env.NEXTAUTH_URL}/**`,
          apiPath: `${process.env.NEXTAUTH_URL}/**`,
        },
      ],
    },
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
}
