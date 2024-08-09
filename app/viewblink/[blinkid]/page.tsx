import ActionRenderer from "@/app/dashboard/createblinks/[createblinkid]/ActionRenderer";
import prisma from "@/lib/db";

async function ViewBlink({ params }: { params: { blinkid: string } }) {
  const blink = await prisma.createBlink.findUnique({
    where: {
      id: params.blinkid,
    },
  });

  return blink != null ? (
    <div className="mt-2">
      {blink.productionready ? (
        <div
          style={{
            maxWidth: "500px",
          }}
          className="m-auto"
        >
          <ActionRenderer
            ActionUrl={`${process.env.HOST_URL}/viewblink/${params.blinkid}`}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="text-3xl font-bold p-4">Blink Not Ready</div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="text-3xl font-bold p-4">
        Invalid ID or Blink Not ready
      </div>
    </div>
  );
}

export default ViewBlink;
