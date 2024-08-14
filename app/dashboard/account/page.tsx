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
  return (
    <div className="mx-6 my-4 flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center p-4">
          <div>
            {user_db?.premium ? (
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
        {/* <div className=""> */}
        <div>
          <span className="font-bold"> Email: </span>
          <span>{user_session?.user?.email}</span>
        </div>
        <div>
          <span className="font-bold">Blinks: </span>
          <span>{user_db?.Blinks.length}</span>
        </div>
        <div>
          <span className="font-bold">Blinks in Production: </span>
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default AccountPage;
