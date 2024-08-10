import prisma from "@/lib/db";
import ActionRenderer from "./ActionRenderer";
import CreateForm from "./CreateBlinkForm";
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
  const blink_url = blinkData?.productionready
    ? `http://localhost:3000/api/blink/${params.createblinkid}`
    : `http://localhost:3000/api/createblinklive/${params.createblinkid}`;
  return (
    <div className="main">
      <div className="main-child-1 p-2">
        <CreateForm blinkid={params.createblinkid} />
      </div>
      <div className="main-child-2">
        <ActionRenderer ActionUrl={blink_url} />
      </div>
    </div>
  );
}

export default CreateBlinkForm;
