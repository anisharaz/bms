"use client";
import { SolanaActionsSpecClass } from "@/lib/SolanaActionsSpecClass";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkedAction } from "@solana/actions";
import { addBlinkData } from "@/app/action/database";
import WalletButton from "@/app/AppComponents/WalletButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";

type blinkButtonElement = {
  id: string;
  button_label: string;
  button_value: string;
};
type blinkInputElement = {
  input_label: string;
  input_button_value: string;
};

function CreateBlinkForm({
  blinkid,
  presignedurl,
  fields,
}: {
  blinkid: string;
  presignedurl: string;
  fields: Record<string, string>;
}) {
  const wallet = useWallet();
  const [blinkName, setBlinkName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainHeading, setMainHeading] = useState({
    title: "Title",
    description: "Description",
  });
  const [blinkButtonElement, setblinkButtonElement] = useState<
    blinkButtonElement[]
  >([]);
  const [addButtonElement, setAddButtonElement] = useState({
    button_label: "",
    button_value: "",
  });
  const [blinkInputElement, setblinkInputElement] =
    useState<blinkInputElement | null>(null);

  const [addInputElement, setAddInputElement] = useState({
    input_label: "",
    input_button_value: "",
  });

  async function handleSubmit() {
    if (walletAddress == "" && !wallet.connected) {
      alert("Please enter wallet address or connect wallet");
      return;
    }
    if (file == null) {
      alert("Please select an image file");
      return;
    }
    setLoading(true);
    let hostname: string = "";
    if (window) {
      hostname = window.location.origin;
    }
    const newInstance = new SolanaActionsSpecClass();
    newInstance.data.title = mainHeading.title;
    newInstance.data.description = mainHeading.description;
    newInstance.data.label = "";
    newInstance.walletaddress = wallet.connected
      ? (wallet.publicKey?.toBase58() as string)
      : walletAddress;
    const actionData: LinkedAction[] = blinkButtonElement.map((e) => {
      return {
        href: `${hostname}/api/blink/${blinkid}/?amount=${e.button_value}`,
        label: e.button_label,
      };
    });
    if (blinkInputElement != null) {
      actionData.push({
        href: `${hostname}/api/blink/${blinkid}/?amount={amount}`,
        label: blinkInputElement.input_button_value,
        parameters: [
          {
            name: "amount", // parameter name in the `href` above
            label: blinkInputElement.input_label, // placeholder of the text input
            required: true,
          },
        ],
      });
    }
    if (newInstance.data.links?.actions != undefined) {
      newInstance.data.links.actions = actionData;
    }
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", file as File);
    const response = await fetch(presignedurl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      alert("Image Upload Failed! Try Again");
    } else {
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const imageLocation =
        xmlDoc.getElementsByTagName("Location")[0]?.childNodes[0]?.nodeValue;
      let IMGURL = new URL(imageLocation as string);
      IMGURL.hostname = "dalrhzyq3imlu.cloudfront.net";
      newInstance.data.icon = IMGURL.toString();
      const res = await addBlinkData({
        blinkid,
        data: newInstance.data,
        walletaddress: newInstance.walletaddress,
      });
      if (res.success) {
        alert("Blink updated successfully");
      } else {
        alert("Error occured try again");
      }
    }
    setLoading(false);
    if (window) {
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div className="text-2xl font-bold underline underline-offset-4">
          Mocked Preview
        </div>
        <div className="mt-2">
          NOTE: Edit & Click add button to reflect change here
        </div>
        <div className="border bg-[#202327] rounded-2xl border-sky-400 shadow-sky-400 shadow p-3 flex flex-col gap-3">
          <div className="">
            <div className="text-white text-lg">{mainHeading.title}</div>
            <div className="text-gray-400">{mainHeading.description}</div>
          </div>
          <div className="flex justify-around gap-3">
            {blinkButtonElement?.map((e) => {
              return (
                <Button
                  key={e.id}
                  className="bg-sky-500 hover:bg-sky-600 rounded-full w-full text-white text-2xl"
                >
                  {e.button_label}
                </Button>
              );
            })}
          </div>
          {blinkInputElement && (
            <div className="flex rounded-full p-2 m-1 bg-[#202327] border border-gray-600 w-full h-16 items-center">
              <input
                type="text"
                className="w-full bg-transparent "
                placeholder={blinkInputElement.input_label}
                disabled
              />
              <Button className="bg-sky-500 rounded-full p-6 text-white text-2xl hover:bg-sky-600">
                {blinkInputElement.input_button_value}
              </Button>
            </div>
          )}
        </div>
      </div>
      <form action="" className="flex flex-col gap-4">
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Button Element <span className="text-red-500">*</span>
          </div>

          <div className="flex gap-2 mb-2">
            <div className="w-full md:w-1/2 ">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Button Label"
                onChange={(e) =>
                  setAddButtonElement({
                    ...addButtonElement,
                    button_label: e.target.value,
                  })
                }
                value={addButtonElement.button_label}
              />
            </div>

            <div className="w-full md:w-1/2 ">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Button Value"
                onChange={(e) =>
                  setAddButtonElement({
                    ...addButtonElement,
                    button_value: e.target.value,
                  })
                }
                value={addButtonElement.button_value}
              />
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (
                !addButtonElement.button_label ||
                !addButtonElement.button_value
              ) {
                alert("Please fill the input fields");
                return;
              }
              setblinkButtonElement([
                ...blinkButtonElement,
                {
                  id: Math.random().toString(),
                  button_label: addButtonElement.button_label,
                  button_value: addButtonElement.button_value,
                },
              ]);
              setAddButtonElement({
                button_label: "",
                button_value: "",
              });
            }}
          >
            Add Button
          </Button>
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Input Area
          </div>
          <div className="flex gap-2 mb-2">
            <div className="w-full md:w-1/2 ">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Input Label"
                onChange={(e) =>
                  setAddInputElement({
                    ...addInputElement,
                    input_label: e.target.value,
                  })
                }
                value={addInputElement.input_label}
              />
            </div>
            <div className="w-full md:w-1/2 ">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Input Button Label"
                onChange={(e) =>
                  setAddInputElement({
                    ...addInputElement,
                    input_button_value: e.target.value,
                  })
                }
                value={addInputElement.input_button_value}
              />
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              if (
                !addInputElement.input_label ||
                !addInputElement.input_button_value
              ) {
                alert("Please fill the input fields");
                return;
              }
              setblinkInputElement({
                input_label: addInputElement.input_label,
                input_button_value: addInputElement.input_button_value,
              });
              setAddInputElement({
                input_label: "",
                input_button_value: "",
              });
            }}
            disabled={blinkInputElement == null ? false : true}
          >
            Add Input
          </Button>
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Blink Name
          </div>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Name of Blink"
            onChange={(e) => setBlinkName(e.target.value || "Blink Name")}
          />
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Main Heading
          </div>
          <div className="flex gap-2">
            <div className="w-full md:w-1/2 ">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Title for Blink"
                onChange={(e) =>
                  setMainHeading({
                    ...mainHeading,
                    title: e.target.value || "Title",
                  })
                }
              />
            </div>
            <div className="w-full md:w-1/2 ">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Description for Blink"
                onChange={(e) =>
                  setMainHeading({
                    ...mainHeading,
                    description: e.target.value || "Description",
                  })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Wallet Address <span className="text-red-500">*</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full md:w-1/2">
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                  wallet.connected && "opacity-50"
                }`}
                id="grid-first-name"
                type="text"
                placeholder="Wallet Address"
                onChange={(e) => setWalletAddress(e.target.value)}
                disabled={wallet.connected}
              />
            </div>
            <div>or</div>
            <WalletButton />
          </div>
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Blink Image{" "}
            <span className="text-red-500 text-lg">
              * <span>(JPG Only)</span>
            </span>
          </div>
          <div>
            <input
              type="file"
              id="image"
              onChange={fileChange}
              accept=".jpg"
              className="block w-full mt-5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </form>
      <Button
        className="bg-red-200 hover:bg-red-300 text-black"
        onClick={(e) => {
          e.preventDefault();
          setMainHeading({
            title: "Title",
            description: "Description",
          });
          setblinkButtonElement([]);
          setAddButtonElement({
            button_label: "",
            button_value: "",
          });
          setblinkInputElement(null);
          setAddInputElement({
            input_label: "",
            input_button_value: "",
          });
        }}
      >
        Reset All
      </Button>
      {loading ? (
        <Button disabled size={"lg"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            await handleSubmit();
            setLoading(false);
          }}
          className="text-xl p-6"
          disabled={blinkButtonElement.length == 0 && blinkInputElement == null}
        >
          Update & Save
        </Button>
      )}
    </div>
  );
}

export default CreateBlinkForm;
