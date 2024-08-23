import prisma from "@/lib/db";
import { ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import { ActionPostResponse, ActionGetResponse } from "@dialectlabs/blinks";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/lib/solana";
export async function GET(
  request: Request,
  { params }: { params: { blinkid: string } }
) {
  if (params.blinkid == "**") {
    const payload: ActionGetResponse = {
      icon: "https://static.aaraz.me/bms_logo.png",
      label: "Not Available",
      title: "Blink ID not defined",
      description: "Blink ID undefined with **.",
      disabled: true,
      error: { message: "Blink ID NOT FOUND" },
    };
    return NextResponse.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  }
  const BlinkData = await prisma.blinks.findFirst({
    where: {
      id: params.blinkid,
    },
  });
  if (BlinkData) {
    return NextResponse.json(BlinkData?.data, {
      headers: ACTIONS_CORS_HEADERS,
    });
  }
  return NextResponse.json(
    { message: "blink id doesnot exist" },
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
}

export const OPTIONS = GET;

export async function POST(
  req: NextRequest,
  { params }: { params: { blinkid: string } }
) {
  const amount = req.nextUrl.searchParams.get("amount");
  const { account } = await req.json();
  const Blink = await prisma.blinks.findFirst({
    where: {
      id: params.blinkid,
    },
  });

  if (account === undefined) {
    return NextResponse.json("Missing account parameter", {
      headers: ACTIONS_CORS_HEADERS,
      status: 400,
    });
  }

  const myaccount = new PublicKey(Blink?.walletaddress as string);
  const senderaccount = new PublicKey(account);

  const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();
  const transaction = new Transaction({
    feePayer: senderaccount,
    blockhash,
    lastValidBlockHeight,
  });

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: senderaccount,
      toPubkey: myaccount,
      lamports: Number(amount) * LAMPORTS_PER_SOL,
    })
  );

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: `Send ${amount} SOL to ${myaccount.toBase58()}`,
    },
  });
  payload.links = {
    next: {
      type: "post",
      href: `/api/blink/${params.blinkid}/confirm`,
    },
  };
  return NextResponse.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}
