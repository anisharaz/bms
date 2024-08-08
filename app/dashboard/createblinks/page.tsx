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
  return (
    <div className="flex flex-col gap-3">
      <div>
        <CreateBlinkButton />
      </div>
      <div>
        {user_data?.CreateBlink.map((d, index) => {
          return (
            <BlinkList
              key={d.id}
              d={{
                id: d.id,
                doneCreating: d.doneCreating,
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
