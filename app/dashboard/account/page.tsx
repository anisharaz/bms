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
    include: {
      Blinks: true,
    },
  });
  const premium = user_db?.premium;
  return (
    <div className="mx-6 my-4 flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center p-4">
          <div>
            {premium ? (
              <div className="text-xl font-bold">Welcome Back !!</div>
            ) : (
              <Button className="text-black bg-gradient-to-tr from-amber-200 to-amber-500 hover:shadow-md hover:shadow-amber-500">
                Get Premium
              </Button>
            )}
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="border-gray-400 border rounded-lg p-4 text-xl">
        <div>
          Blinks: <span>{user_db?.Blinks.length}</span>
        </div>
        <div>
          Production Blinks:{" "}
          <span>
            {(function () {
              let production_blink_count = 0;
              user_db?.Blinks.forEach((blink) => {
                if (blink.productionready) {
                  production_blink_count++;
                }
              });
              return production_blink_count;
            })()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
