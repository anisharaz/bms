import prisma from "@/lib/db";
import ActionRenderer from "./ActionRenderer";
import CreateForm from "./CreateBlinkForm";
import "./createblink.css";
import { GetPreSignedUrl } from "@/lib/AWS";
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
  const { url, fields } = await GetPreSignedUrl({
    blinkid: params.createblinkid,
  });

  const blink_url = blinkData?.productionready
    ? `http://localhost:3000/api/blink/${params.createblinkid}`
    : `http://localhost:3000/api/createblinklive/${params.createblinkid}`;
  return (
    <div className="main">
      <div className="main-child-1 p-2">
        <CreateForm
          blinkid={params.createblinkid}
          presignedurl={url}
          fields={fields}
        />
      </div>
      <div className="main-child-2 ">
        <div className="text-center text-3xl mb-3 underline underline-offset-4">
          Current Blink
        </div>
        <div className="shadow-2xl shadow-black rounded-2xl">
          <ActionRenderer ActionUrl={blink_url} />
        </div>
      </div>
    </div>
  );
}

export default CreateBlinkForm;
