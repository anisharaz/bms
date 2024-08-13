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
  };
  index: number;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex border border-gray-500 rounded-md">
        <div
          className="flex-1 p-3  cursor-pointer rounded-sm bg-gradient-to-tr from-gray-100 to-sky-200/30 hover:to-sky-200/50"
          onClick={() => {
            router.push(`/dashboard/createblinks/${d.id}`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-lg flex-1 bg-sky-500 text-white rounded-full h-8 w-8 text-center">
                {index + 1 + ". "}
              </div>
            </div>
            <div className="flex gap-1">
              <CopyLink id={d.id} />
              <DeleteButton id={d.id} />
              <ToggleActive production={d.productionReady} id={d.id} />
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-2 pl-6">
            <div className="text-lg">
              <div className="text-xl">
                <span>Name:</span>
                {" " + d.BlinkName}
              </div>
              <div>
                Wallet Addr. : <span>12121</span>
              </div>
              {children}
            </div>

            <div>
              <span
                className={`text-lg ${
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
