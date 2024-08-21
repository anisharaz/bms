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
          // Added /** because the url of action api in the createblink page uses exact /api/createblinklive/:tempid path
          pathPattern: "/**",
          apiPath: "/**",
        },
      ],
    },
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
}
