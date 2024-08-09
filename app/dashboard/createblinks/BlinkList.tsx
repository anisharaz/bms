"use client";

import { useRouter } from "next/navigation";

export default function BlinkList({
  d,
  index,
}: {
  d: { id: string; doneCreating: boolean };
  index: number;
}) {
  const router = useRouter();
  // TODO: add activate and deactivate functionality using production values in database
  return (
    <div
      className="border border-gray-500 p-2 flex flex-col gap-2 cursor-pointer hover:bg-gray-100 rounded-sm m-1"
      onClick={() => {
        router.push(`/dashboard/createblinks/${d.id}`);
      }}
    >
      <div className="underline underline-offset-4">{index + 1}</div>
      <div>
        <span className="text-xl">Id:</span> {d.id}
      </div>
      <div>
        <span
          className={`text-lg ${
            d.doneCreating ? "bg-green-400" : "bg-red-300"
          }  p-1 rounded-full`}
        >
          {d.doneCreating ? "Completed" : "In Progress"}
        </span>
      </div>
    </div>
  );
}
