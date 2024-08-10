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
        <nav className="shadow-2xl h-14 flex items-center justify-between">
          <div className="p-4 font-bold text-2xl">BMS</div>
          <a
            href="https://solaction.aaraz.me/"
            target="_blank"
            className="px-3 py-2 mr-6 bg-sky-400 rounded-xl text-black  hover:bg-sky-500 cursor-pointer"
          >
            Get Yours Here
          </a>
        </nav>
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
                <div className="text-3xl font-bold p-4">Blink Not Ready</div>
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
