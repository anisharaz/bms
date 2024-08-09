"use client";
import { Button } from "@/components/ui/button";
import { EyeIcon, HouseIcon, SquareUserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function NavOptions() {
  const router = useRouter();
  return (
    <>
      <Button
        variant={"nav_btn"}
        size={"nav_btn"}
        onClick={() => {
          router.replace("/dashboard");
        }}
        className="flex gap-2 border-b"
      >
        <div>Home</div>
        <HouseIcon />
      </Button>
      <Button
        variant={"nav_btn"}
        size={"nav_btn"}
        onClick={() => {
          router.replace("/dashboard/account");
        }}
        className="flex gap-2 border-b"
      >
        <div>Account</div>
        <SquareUserRoundIcon />
      </Button>
      <Button
        variant={"nav_btn"}
        size={"nav_btn"}
        onClick={() => {
          router.replace("/dashboard/createblinks");
        }}
        className="flex gap-2 border-b"
      >
        <div>Blinks</div>
        <EyeIcon />
      </Button>
    </>
  );
}

export default NavOptions;
