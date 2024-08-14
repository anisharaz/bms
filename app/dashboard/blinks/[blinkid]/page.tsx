import prisma from "@/lib/db";
import ActionRenderer from "@/components/ui/ActionRenderer";
import CreateForm from "./CreateBlinkForm";
import "./createblink.css";
import { GetPreSignedUrl } from "@/lib/AWS";
async function CreateBlinkForm({ params }: { params: { blinkid: string } }) {
  const blinkData = await prisma.blinks.findFirst({
    where: {
      id: params.blinkid,
    },
  });
  const { url, fields } = await GetPreSignedUrl({
    blinkid: params.blinkid,
  });

  const blink_url = blinkData?.productionready
    ? `${process.env.NEXTAUTH_URL}/api/blink/${params.blinkid}`
    : `${process.env.NEXTAUTH_URL}/api/createblinklive/${params.blinkid}`;
  return (
    <div className="main">
      <div className="main-child-1 p-2">
        <CreateForm
          blinkid={params.blinkid}
          presignedurl={url}
          fields={fields}
        />
      </div>
      <div className="main-child-2 sticky top-0 ">
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
