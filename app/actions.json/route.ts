import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log(req.nextUrl.origin);

  return NextResponse.json({
    rules: [
      {
        pathPattern: `${process.env.HOST_URL}/viewblink/**`,
        apiPath: `${process.env.HOST_URL}/api/blink/**`,
      },
      {
        pathPattern: `${process.env.HOST_URL}/**`,
        apiPath: `${process.env.HOST_URL}/**`,
      },
    ],
  });
}
