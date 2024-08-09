"use server";

// TODO: add error handling
import prisma from "@/lib/db";
import { ServerActionState } from "../ServerStates/CreateBlinkState";
import { revalidatePath } from "next/cache";

export async function createblink({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const newInstance = new ServerActionState();
  newInstance.instanceID = id;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return await prisma.createBlink.create({
    data: {
      id: id,
      userId: user?.id as string,
      doneCreating: false,
      data: newInstance.data as any,
    },
  });
}

export async function addBlinkData({
  blinkid,
  data,
}: {
  blinkid: string;
  data: any;
}) {
  const update = await prisma.createBlink.update({
    where: {
      id: blinkid,
    },
    data: {
      data: data,
      doneCreating: true,
    },
  });
  revalidatePath(`/dashboard/createblinks/${blinkid}`);
  revalidatePath(`/api/createblinklive/${blinkid}`);
  return update;
}
