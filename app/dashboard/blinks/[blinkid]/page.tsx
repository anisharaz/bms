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

  const blink_url = `${process.env.NEXTAUTH_URL}/viewblink/${params.blinkid}`;
  return (
    <div className="lg:flex gap-5 justify-around">
      <div className="main-child-1 p-2 w-full">
        <CreateForm
          blinkid={params.blinkid}
          BlinkName={blinkData?.name as string}
          presignedurl={url}
          fields={fields}
          // @ts-ignore
          BlinkData={blinkData?.data}
          BlinkWalletAddr={blinkData?.walletaddress as string}
        />
      </div>
      <div className="main-child-2 sticky top-0 lg:w-3/5 w-full" style={{}}>
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
