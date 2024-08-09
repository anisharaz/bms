import prisma from "@/lib/db";
import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { tempid: string } }
) {
  const BlinkData = await prisma.createBlink.findFirst({
    where: {
      id: params.tempid,
    },
  });
  if (BlinkData?.productionready == true && BlinkData.doneCreating == true) {
    return NextResponse.json(BlinkData?.data);
  }
  return NextResponse.json("Blink not ready yet");
}

// TODO: build this method
export async function POST(
  req: NextRequest,
  { params }: { params: { blinkid: string } }
) {
  const amount = req.nextUrl.searchParams.get("amount");
  console.log(amount);
  const { account } = await req.json();
  console.log(account);
  console.log(params.blinkid);
  const Blink = await prisma.createBlink.findFirst({
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

  const myaccount = new PublicKey(Blink?.walletaddredd as string);
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
