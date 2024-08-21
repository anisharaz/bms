import ActionRenderer from "@/components/ui/ActionRenderer";
import prisma from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { blinkid: string };
}): Promise<Metadata> {
  const blink = await prisma.blinks.findUnique({
    where: {
      id: params.blinkid,
    },
  });
  return {
    // @ts-ignore
    title: blink?.data?.title,
    // @ts-ignore
    description: blink?.data?.description,
    openGraph: {
      // @ts-ignore
      title: blink?.data?.title,
      // @ts-ignore
      description: blink?.data?.description,
      siteName: "aaraz",
      locale: "en_US",
      type: "website",
      images: [
        {
          // @ts-ignore
          url: blink?.data?.icon,
          alt: "Blink Icon",
          type: "image/jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      // @ts-ignore
      title: blink?.data?.title,
      // @ts-ignore
      description: blink?.data?.description,
      creator: "@anisharaz",
      images: [
        {
          // @ts-ignore
          url: blink?.data?.icon,
          height: 500,
          width: 200,
          alt: "Blink Icon",
          type: "image/jpg",
        },
      ],
    },
  };
}

async function ViewBlink({ params }: { params: { blinkid: string } }) {
  const blink = await prisma.blinks.findUnique({
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
                  ActionUrl={`${process.env.NEXTAUTH_URL}/viewblink/${params.blinkid}`}
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
