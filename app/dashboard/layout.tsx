import { auth } from "@/auth";
import "./dashboard.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import NavOptions from "./NavOptions";
import prisma from "@/lib/db";
import LogoutButton from "../AppComponents/LogoutButton";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  const user_db = await prisma.user.findUnique({
    where: {
      email: user?.user?.email as string,
    },
  });
  const premium = user_db?.premium;
  return (
    <div className="flex flex-col lg:flex-row lg:gap-1 gap-2 p-[5px]">
      <div className="lg:left-section rounded-lg lg:min-w-72 overflow-hidden border border-gray-400">
        <div className="flex lg:py-4 py-1 items-center lg:justify-around justify-between px-2 border-b border-gray-400">
          <div className="flex gap-6 lg:gap-10 items-center">
            <Avatar className={`h-12 w-12 ${premium && "premium"}`}>
              <AvatarImage src={`${user_db?.image}`} />
            </Avatar>
            <div>
              <div className="text-xl">{user?.user?.name || "USER"}</div>
              <div className="flex gap-1 items-center">
                <div
                  className={`${
                    premium ? "bg-amber-400" : "bg-slate-400"
                  } h-3 w-3 text-sm rounded-full`}
                ></div>
                <div className="opacity-50">{premium ? "Premium" : "Free"}</div>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <LogoutButton />
          </div>
        </div>
        <div className="flex flex-col lg:gap-5 gap-2 lg:pt-12">
          <NavOptions />
        </div>
      </div>
      <div className="right-section flex-1 rounded-lg border border-gray-400 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
