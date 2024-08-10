import LogoutButton from "@/app/AppComponents/LogoutButton";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

async function AccountPage() {
  const user_session = await auth();
  const user_db = await prisma.user.findUnique({
    where: {
      email: user_session?.user?.email as string,
    },
  });
  const premium = true;
  return (
    <div className="mx-6 my-4">
      <div className="flex justify-between items-center  rounded-lg border-gray-400 border p-4">
        <div>
          {premium ? (
            <div className="text-xl font-bold">Welcome Back !!</div>
          ) : (
            <Button className="text-black/50 bg-gradient-to-tr from-amber-200 to-amber-500 hover:shadow-md hover:shadow-amber-500">
              Get Premium
            </Button>
          )}
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
