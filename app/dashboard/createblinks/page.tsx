import prisma from "@/lib/db";
import CreateBlinkButton from "./CreateBlinkButton";
import { auth } from "@/auth";
import BlinkList from "./BlinkList";
async function CreateBlinkPage() {
  const user = await auth();
  const user_data = await prisma.user.findFirst({
    where: {
      email: user?.user?.email,
    },
    include: {
      CreateBlink: true,
    },
  });
  // TODO: add validation on how much blink one can create
  return (
    <div className="flex flex-col gap-3 p-4">
      <div>
        <CreateBlinkButton />
      </div>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "90vh",
        }}
        className="flex flex-col gap-2"
      >
        {user_data?.CreateBlink.map((d, index) => {
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default CreateBlinkPage;
