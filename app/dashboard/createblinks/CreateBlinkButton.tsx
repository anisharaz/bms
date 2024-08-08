"use client";
import { createblink } from "@/app/action/database";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

function CreateBlinkButton() {
  // TODO: add loading button feature
  const router = useRouter();
  const user = useSession();
  return (
    <Button
      onClick={async () => {
        const tempid = uuid({});
        await createblink({
          email: user.data?.user?.email as string,
          id: tempid,
        });
        router.push(`/dashboard/createblinks/${tempid}`);
      }}
    >
      Create Blink
    </Button>
  );
}

export default CreateBlinkButton;
