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

// TODO: add image upload
// TODO: add form validation
function CreateBlinkForm({ blinkid }: { blinkid: string }) {
  const wallet = useWallet();
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
    setLoading(true);
    let hostname: string = "";
    if (window) {
      hostname = window.location.origin;
    }
    const newInstance = new SolanaActionsSpecClass();
    newInstance.data.title = mainHeading.title;
    newInstance.data.description = mainHeading.description;
    newInstance.data.label = "";
    newInstance.walletaddress = walletAddress;
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
    // TODO: add error handling
    await addBlinkData({
      blinkid,
      data: newInstance.data,
      walletaddress: walletAddress,
    });
    setLoading(false);
    alert("Update Success");
    if (window) {
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form action="" className="flex flex-col gap-4">
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
                placeholder="Button Label"
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
        >
          Update & Save
        </Button>
      )}

      <div className="mt-10">
        <div className="text-2xl font-bold underline underline-offset-4">
          Mock Preview
        </div>
        <div className="mt-2">
          NOTE: Click add button to reflect change here
        </div>
        <div className="border border-black bg-[#202327] rounded-lg m-4 p-3 flex flex-col gap-3">
          <div className="">
            <div className="text-white text-lg">{mainHeading.title}</div>
            <div className="text-gray-400">{mainHeading.description}</div>
          </div>
          <div className="flex justify-around gap-3">
            {blinkButtonElement?.map((e) => {
              return (
                <button
                  key={e.id}
                  className="bg-sky-500 hover:bg-sky-600 rounded-full p-2 w-full text-white font-bold"
                >
                  {e.button_label}
                </button>
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
              <Button className="bg-sky-500 rounded-full p-6 text-white font-bold text-2xl hover:bg-sky-600">
                {blinkInputElement.input_button_value}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateBlinkForm;
