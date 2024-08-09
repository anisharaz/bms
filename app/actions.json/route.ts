import { NextRequest, NextResponse } from "next/server";

// TODO: edit the rules for production
export function GET(req: NextRequest) {
  console.log(req.nextUrl.origin);

  return NextResponse.json({
    rules: [
      {
        pathPattern: `${req.nextUrl.origin}/viewblink/**`,
        apiPath: `${req.nextUrl.origin}/api/blink/**`,
      },
      {
        pathPattern: `${req.nextUrl.origin}/**`,
        apiPath: `${req.nextUrl.origin}/**`,
      },
    ],
  });
}
