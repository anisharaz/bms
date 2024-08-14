import Image from "next/image";
import BmsLogo from "../assets/bms_logo.png";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import LoginButton from "./LoginButton";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

async function AppBar() {
  const user = await auth();
  return (
    <nav className="shadow-lg h-14 flex items-center justify-between ">
      <a href="/" className="p-4 font-bold text-2xl flex items-center gap-2">
        <div>BMS</div>
        <Image src={BmsLogo} alt="" className="w-7 h-7" />
      </a>
      <div className="px-6">
        <div>
          {user ? (
            <Link href={"/dashboard/account"}>
              <Button variant={"outline"} className="text-lg flex gap-1">
                <span> Dashboard</span> <LayoutDashboardIcon color="grey" />
              </Button>
            </Link>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
}

export default AppBar;
