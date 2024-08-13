import prisma from "@/lib/db";
import CreateBlinkButton from "./CreateBlinkButton";
import { auth } from "@/auth";
import BlinkList from "./BlinkList";
import { Suspense } from "react";
import BalanceCard from "./BalanceCard";

async function CreateBlinkPage() {
  const user = await auth();
  const user_db = await prisma.user.findFirst({
    where: {
      email: user?.user?.email,
    },
    include: {
      Blinks: true,
    },
  });
  user_db?.Blinks.sort((a, b) => {
    if (a.doneCreating === b.doneCreating) {
      return 0;
    }
    if (a.doneCreating) {
      return 1;
    }
    return -1;
  });
  return (
    <div className="flex flex-col gap-3 p-4">
      <div>
        <CreateBlinkButton />
      </div>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "83vh",
        }}
        className="flex flex-col gap-2"
      >
        {user_db?.Blinks.map((d, index) => {
          return (
            <BlinkList
              key={d.id}
              d={{
                id: d.id,
                doneCreating: d.doneCreating,
                productionReady: d.productionready,
                BlinkName: d.name,
              }}
              index={index}
            >
              <Suspense
                fallback={
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-5 bg-gray-400/70 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  </div>
                }
              >
                <BalanceCard WalletAddress="3pt1fCSbikqpErQ1TAffEkeXxqWdok6D38JTBzY1iq1M" />
              </Suspense>
            </BlinkList>
          );
        })}
      </div>
    </div>
  );
}

export default CreateBlinkPage;
