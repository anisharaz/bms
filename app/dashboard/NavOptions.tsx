"use client";
import { Button } from "@/components/ui/button";
import { EyeIcon, HouseIcon, SquareUserRoundIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

function NavOptions() {
  const router = useRouter();
  const path = usePathname().split("/");
  path.shift();
  const curront_path = path.slice(-1)[0];
  return (
    <>
      {/* <Button
        variant={"nav_btn"}
        size={"nav_btn"}
        onClick={() => {
          router.replace("/dashboard");
        }}
        className="flex gap-2 border-b"
      >
        <div>Home</div>
        <HouseIcon />
      </Button> */}
      <Button
        variant={"nav_btn"}
        size={"nav_btn"}
        onClick={() => {
          router.replace("/dashboard/account");
        }}
        className={`flex gap-2 border-b ${
          curront_path == "account" ? "bg-gray-200" : ""
        }`}
      >
        <div>Account</div>
        <SquareUserRoundIcon />
      </Button>
      <Button
        variant={"nav_btn"}
        size={"nav_btn"}
        onClick={() => {
          router.replace("/dashboard/blinks");
        }}
        className={`flex gap-2 border-b ${
          curront_path == "blinks" ? "bg-gray-200" : ""
        }`}
      >
        <div>Blinks</div>
        <EyeIcon />
      </Button>
    </>
  );
}

export default NavOptions;
