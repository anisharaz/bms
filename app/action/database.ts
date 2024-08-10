"use server";

import prisma from "@/lib/db";
import { SolanaActionsSpecClass } from "../../lib/SolanaActionsSpecClass";
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
  });
  try {
    await prisma.createBlink.create({
      data: {
        id: id,
        userId: user?.id as string,
        doneCreating: false,
        data: newInstance.data as any,
        name: "Edit Blink Name",
      },
    });
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
  try {
    const update = await prisma.createBlink.update({
      where: {
        id: blinkid,
      },
      data: {
        data: data,
        doneCreating: true,
        walletaddress: walletaddress,
      },
    });
    revalidatePath("/dashboard/createblinks/[createblinkid]", "page");
    revalidatePath("/api/createblinklive/");
    revalidatePath(`/dashboard/createblinks/`);
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
  try {
    const getBlink = await prisma.createBlink.findFirst({
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
    const updatedBlink = await prisma.createBlink.update({
      where: {
        id: id,
      },
      data: {
        productionready: production,
      },
    });
    // add 500ms delay to simulate server response
    await new Promise((resolve) => setTimeout(resolve, 500));
    revalidatePath(`/dashboard/createblinks/`);
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
