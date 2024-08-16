"use server";

import { Deletes3image } from "@/lib/AWS";
import prisma from "@/lib/db";
import { SolanaActionsSpecClass } from "@/lib/SolanaActionsSpecClass";
import { revalidatePath } from "next/cache";

export async function createblink({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const newInstance = new SolanaActionsSpecClass();
  newInstance.instanceID = id;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      Blinks: true,
    },
  });
  if ((user?.Blinks.length as number) >= 3) {
    return {
      success: false,
      message: "You have reached the limit of 3 blinks for free user",
    };
  }
  try {
    await prisma.blinks.create({
      data: {
        id: id,
        userId: user?.id as string,
        doneCreating: false,
        data: newInstance.data as any,
        name: "Edit Blink Name",
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/api");
    revalidatePath("/viewblink");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: "Some Thing Went Wrong try again later",
    };
  }
}

export async function addBlinkData({
  blinkid,
  data,
  walletaddress,
  blink_name,
}: {
  blinkid: string;
  data: any;
  walletaddress: string;
  blink_name: string;
}) {
  try {
    const update = await prisma.blinks.update({
      where: {
        id: blinkid,
      },
      data: {
        name: blink_name,
        data: data,
        doneCreating: true,
        walletaddress: walletaddress,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/api");
    revalidatePath("/viewblink");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

// TODO: add error handling
export async function DeleteBlink({ id }: { id: string }) {
  const deletedBlink = await prisma.blinks.delete({
    where: {
      id: id,
    },
  });
  await Deletes3image({ key: `bms/${deletedBlink.id}.jpg` });
  revalidatePath(`/dashboard`);
  return deletedBlink;
}

export async function ToggleProductionReady({
  id,
  production,
}: {
  id: string;
  production: boolean;
}) {
  try {
    const getBlink = await prisma.blinks.findFirst({
      where: {
        id: id,
      },
    });
    if (!getBlink?.doneCreating) {
      return {
        success: false,
        message: "Blink is not ready",
      };
    }
    const updatedBlink = await prisma.blinks.update({
      where: {
        id: id,
      },
      data: {
        productionready: production,
      },
    });
    // add 500ms delay to simulate server response
    await new Promise((resolve) => setTimeout(resolve, 500));
    revalidatePath(`/dashboard`);
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}
