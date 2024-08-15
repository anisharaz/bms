import { auth } from "@/auth";
import "./dashboard.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import NavOptions from "./NavOptions";
import prisma from "@/lib/db";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  const user_db = await prisma.user.findUnique({
    where: {
      email: user?.user?.email as string,
    },
  });
  const premium = user_db?.premium;
  return (
    <div className="flex gap-1 p-[5px]">
      <div className="left-section rounded-lg  min-w-72 overflow-hidden border border-gray-400">
        <div className="flex gap-4 py-4 items-center justify-around border-b border-gray-400">
          <div className="flex gap-10">
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
        </div>
        <div className="flex flex-col gap-5 pt-12">
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
