"use client";

import { useRouter } from "next/navigation";
import { CopyLink, DeleteButton, ToggleActive } from "./BlinkInterationButtons";

export default function BlinkList({
  d,
  index,
}: {
  d: {
    id: string;
    doneCreating: boolean;
    productionReady: boolean;
    BlinkName: string;
  };
  index: number;
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex border border-gray-500 rounded-md">
        <div
          className="flex-1 p-2 flex flex-col gap-2 cursor-pointer rounded-sm bg-gradient-to-tr from-gray-100 to-sky-200/30 hover:to-sky-200/50"
          onClick={() => {
            router.push(`/dashboard/createblinks/${d.id}`);
          }}
        >
          <div className="flex">
            <div className="underline underline-offset-4 text-lg flex-1">
              {index + 1}
            </div>
            <div className="flex gap-1">
              <CopyLink id={d.id} />
              <DeleteButton id={d.id} />
              <ToggleActive production={d.productionReady} id={d.id} />
            </div>
          </div>
          <div className="text-lg">
            <div>
              <span>Name:</span>
              {" " + d.BlinkName}
            </div>
            <div>
              <span>Id:</span> {d.id}
            </div>
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
    </>
  );
}
