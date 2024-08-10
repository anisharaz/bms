import prisma from "@/lib/db";
import CreateBlinkButton from "./CreateBlinkButton";
import { auth } from "@/auth";
import BlinkList from "./BlinkList";
async function CreateBlinkPage() {
  const user = await auth();
  const user_db = await prisma.user.findFirst({
    where: {
      email: user?.user?.email,
    },
    include: {
      CreateBlink: true,
    },
  });
  user_db?.CreateBlink.sort((a, b) => {
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
          maxHeight: "90vh",
        }}
        className="flex flex-col gap-2"
      >
        {user_db?.CreateBlink.map((d, index) => {
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
