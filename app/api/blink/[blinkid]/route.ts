import prisma from "@/lib/db";
import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { blinkid: string } }
) {
  const BlinkData = await prisma.blinks.findFirst({
    where: {
      id: params.blinkid,
    },
  });
  if (BlinkData?.productionready == true && BlinkData.doneCreating == true) {
    return NextResponse.json(BlinkData?.data, {
      headers: ACTIONS_CORS_HEADERS,
    });
  }
  return NextResponse.json("Blink not ready yet");
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
  const connection = new Connection(process.env.RPC_URL as string); // Add your rpc url here for better performance

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
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
  return NextResponse.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}
