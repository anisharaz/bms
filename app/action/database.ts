"use server";

import prisma from "@/lib/db";

export async function createblink({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
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
      data: {},
    },
  });
}
