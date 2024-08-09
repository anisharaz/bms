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
  // TODO: add activate and deactivate functionality using production values in database
  return (
    <>
      <div className="flex border border-gray-500 rounded-md">
        <div
          className="flex-1 p-2 flex flex-col gap-2 cursor-pointer hover:bg-gray-200 rounded-sm bg-gray-100"
          onClick={() => {
            router.push(`/dashboard/createblinks/${d.id}`);
          }}
        >
          <div className="flex">
            <div className="underline underline-offset-4 text-lg flex-1">
              {index + 1}
            </div>
            <div className="flex gap-1">
              <CopyLink />
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
              {d.doneCreating ? "Completed" : "In Progress"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
