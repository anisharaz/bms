"use client";
import { createblink } from "@/app/action/database";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcwIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";

function CreateBlinkButton() {
  // TODO: add loading button feature
  const router = useRouter();
  const user = useSession();
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Button disabled size={"lg"}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait..
    </Button>
  ) : (
    <>
      <div className="flex gap-2">
        <Button
          onClick={async () => {
            setLoading(true);
            const tempid = uuid({});

            const res = await createblink({
              email: user.data?.user?.email as string,
              id: tempid,
            });
            if (res.success === false) {
              alert("Something went try again");
              setLoading(false);
              return;
            }
            router.push(`/dashboard/createblinks/${tempid}`);
          }}
          size={"lg"}
        >
          New Blink
        </Button>
        <button
          className="hover:bg-slate-200 rounded-lg p-2"
          onClick={() => {
            if (window) {
              window.location.reload();
            }
          }}
        >
          <RefreshCcwIcon className=" " />
        </button>
      </div>
    </>
  );
}

export default CreateBlinkButton;
