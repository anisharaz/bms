import Image from "next/image";
import BmsLogo from "../assets/bms_logo.png";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import LoginButton from "./LoginButton";
import { LayoutDashboardIcon } from "lucide-react";

async function AppBar() {
  const user = await auth();
  return (
    <div className="py-2">
      <div className="bg-[#000000] rounded-full lg:py-2 py-1 lg:max-w-screen-xl max-w-screen-md m-auto flex justify-around">
        <div className="flex justify-center items-center gap-2">
          <Image src={BmsLogo} alt="" className="w-7 h-7" />
          <div className="text-xl underline underline-offset-2 text-white">
            BMS
          </div>
        </div>
        <div>
          {user ? (
            <Button variant={"outline"} className="text-lg">
              Dashboard
              <LayoutDashboardIcon />{" "}
            </Button>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
}

export default AppBar;
