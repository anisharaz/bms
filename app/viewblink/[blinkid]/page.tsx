import ActionRenderer from "@/app/dashboard/createblinks/[createblinkid]/ActionRenderer";
import prisma from "@/lib/db";

async function ViewBlink({ params }: { params: { blinkid: string } }) {
  const blink = await prisma.createBlink.findUnique({
    where: {
      id: params.blinkid,
    },
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        {blink != null ? (
          <div className="mt-2">
            {blink.productionready && blink.doneCreating ? (
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
                <div className="text-3xl font-bold p-4">
                  Blink Not In Production
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="text-3xl font-bold p-4">Invalid Blink</div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewBlink;
