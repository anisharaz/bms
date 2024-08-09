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
      name: "Edit Blink Name",
    },
  });
}

// TODO: add feature to partially update data
export async function addBlinkData({
  blinkid,
  data,
  walletaddress,
}: {
  blinkid: string;
  data: any;
  walletaddress: string;
}) {
  const update = await prisma.createBlink.update({
    where: {
      id: blinkid,
    },
    data: {
      data: data,
      doneCreating: true,
      walletaddredd: walletaddress,
    },
  });
  revalidatePath("/dashboard/createblinks/[createblinkid]", "page");
  revalidatePath("/api/createblinklive/");
  revalidatePath(`/dashboard/createblinks/`);
  return update;
}

export async function DeleteBlink({ id }: { id: string }) {
  const deletedBlink = await prisma.createBlink.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/dashboard/createblinks/`);
  return deletedBlink;
}

export async function ToggleProductionReady({
  id,
  production,
}: {
  id: string;
  production: boolean;
}) {
  const updatedBlink = await prisma.createBlink.update({
    where: {
      id: id,
    },
    data: {
      productionready: production,
    },
  });
  // add 1 second delay to simulate server response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  revalidatePath(`/dashboard/createblinks/`);
  return updatedBlink;
}
