"use client";

import { useRouter } from "next/navigation";
import { CopyLink, DeleteButton, ToggleActive } from "./BlinkInterationButtons";

export default function BlinkList({
  d,
  index,
  children,
}: {
  d: {
    id: string;
    doneCreating: boolean;
    productionReady: boolean;
    BlinkName: string;
    WalletAddress: string;
  };
  index: number;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex border border-gray-500 rounded-md">
        <div
          className="flex-1 lg:p-3 p-1  cursor-pointer rounded-sm bg-gradient-to-tr from-gray-100 to-sky-200/30 hover:to-sky-200/50"
          onClick={() => {
            router.push(`/dashboard/blinks/${d.id}`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="lg:text-lg text-sm flex-1 bg-neutral-200 text-black rounded-full lg:h-8 lg:w-8 h-5 w-5 text-center">
                {index + 1 + ". "}
              </div>
            </div>
            <div className="flex gap-1">
              <CopyLink id={d.id} />
              <DeleteButton id={d.id} />
              <ToggleActive production={d.productionReady} id={d.id} />
            </div>
          </div>
          <div className="flex flex-col lg:mt-3 lg:gap-2 lg:pl-6 pl-1">
            <div className="lg:text-lg">
              <div className="lg:text-xl text-sm">
                <span className="font-bold">Name:</span>
                {" " + d.BlinkName}
              </div>
              <div>
                <span className="font-bold lg:text-lg text-sm">
                  Wallet Addr:{" "}
                </span>
                <br />
                <span className="text-xs lg:text-base">
                  {d.WalletAddress == "" ? "NaN" : d.WalletAddress}
                </span>
              </div>
              {children}
              <div>
                <span className="font-bold lg:text-lg text-sm">ID: </span>
                <span>{d.id.slice(0, 4)}</span>
              </div>
            </div>

            <div>
              <span
                className={`lg:text-lg text-sm ${
                  d.doneCreating ? "bg-green-400" : "bg-red-300"
                }  py-1 px-2 rounded-full`}
              >
                {d.doneCreating ? "Ready" : "In Progress"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
