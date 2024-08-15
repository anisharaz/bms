import prisma from "@/lib/db";
import CreateBlinkButton from "./CreateBlinkButton";
import { auth } from "@/auth";
import BlinkList from "./BlinkList";
import { Suspense } from "react";
import BalanceCard from "./BalanceCard";
import { ToastContainer, Bounce } from "react-toastify";

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
  user_db?.Blinks.sort();
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
                <BalanceCard WalletAddress={d.walletaddress} />
              </Suspense>
            </BlinkList>
          );
        })}
        <ToastContainer
          position="bottom-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default CreateBlinkPage;
