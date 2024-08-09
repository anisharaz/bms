import prisma from "@/lib/db";
import ActionRenderer from "./ActionRenderer";
import CreateForm from "./CreateForm";
import "./createblink.css";
async function CreateBlinkForm({
  params,
}: {
  params: { createblinkid: string };
}) {
  const blinkData = await prisma.createBlink.findFirst({
    where: {
      id: params.createblinkid,
    },
  });
  return (
    <div className="main">
      <div className="main-child-1 p-2">
        <CreateForm blinkid={params.createblinkid} />
      </div>
      <div className="main-child-2">
        <ActionRenderer
          ActionUrl={`http://localhost:3000/api/createblinklive/${params.createblinkid}`}
        />
      </div>
    </div>
  );
}

export default CreateBlinkForm;
