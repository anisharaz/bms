"use client";
import { SolanaActionsSpecClass } from "@/lib/SolanaActionsSpecClass";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkedAction } from "@solana/actions";
import { addBlinkData } from "@/app/action/database";
import { CircleXIcon, Loader2 } from "lucide-react";
import { BlinkDataType } from "@/lib/types";
import { blinkButtonElement, blinkInputElement } from "@/lib/types";
// TODO: add sol amount verification
function CreateBlinkForm({
  blinkid,
  presignedurl,
  fields,
  BlinkData,
  BlinkName,
  BlinkWalletAddr,
}: {
  blinkid: string;
  presignedurl: string;
  fields: Record<string, string>;
  BlinkData: BlinkDataType;
  BlinkName: string;
  BlinkWalletAddr: string;
}) {
  const [blinkName, setBlinkName] = useState(BlinkName);
  const [file, setFile] = useState<File | null>(null);
  const fileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const [walletAddress, setWalletAddress] = useState(BlinkWalletAddr);
  const [loading, setLoading] = useState(false);
  const [mainHeading, setMainHeading] = useState({
    title: BlinkData.title || "Title",
    description: BlinkData.description || "Description",
  });

  const filterBlinkButtons = BlinkData.links?.actions.filter(
    (e) => e.parameters == undefined
  );

  const DataForBlinkButtonElement = filterBlinkButtons?.map((e) => {
    let hrefUrl = null;
    try {
      hrefUrl = new URL(e.href);
    } catch (error) {}
    return {
      id: Math.random().toString(),
      button_label: e.label,
      button_value: hrefUrl?.searchParams.get("amount") || "NaN",
    };
  });
  const [blinkButtonElement, setblinkButtonElement] = useState<
    blinkButtonElement[]
  >(DataForBlinkButtonElement || []);
  const [addButtonElement, setAddButtonElement] = useState({
    button_label: "",
    button_value: "",
  });

  const filterBlinkInput = BlinkData.links?.actions.filter(
    (e) => e.parameters != undefined
  );
  const [blinkInputElement, setblinkInputElement] =
    useState<blinkInputElement | null>(() => {
      if (filterBlinkInput?.length == 0) {
        return null;
      }
      return {
        input_button_value: filterBlinkInput![0].label,
        input_label: filterBlinkInput![0].parameters![0].label as string,
      };
    });
  const [addInputElement, setAddInputElement] = useState({
    input_button_value: "",
    input_label: "",
  });

  async function handleSubmit() {
    if (walletAddress == "") {
      alert("Please enter wallet address");
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
    if (file != null) {
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
      }
    } else {
      newInstance.data.icon = BlinkData.icon;
    }
    const res = await addBlinkData({
      blinkid,
      data: newInstance.data,
      walletaddress: newInstance.walletaddress,
      blink_name: blinkName,
    });
    if (res.success) {
      alert("Blink updated successfully");
    } else {
      alert("Error occured try again");
    }
    setLoading(false);
    if (window) {
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0 bg-white">
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
                  className="bg-sky-500 hover:bg-sky-600 h-10 rounded-full w-full text-white text-xl font-bold"
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
                className="w-full bg-transparent focus:border-red-300"
                placeholder={blinkInputElement.input_label}
                disabled
              />
              <Button className="bg-gray-700/50 rounded-full p-6 text-gray-500 font-bold text-2xl hover:bg-sky-500 hover:text-white">
                {blinkInputElement.input_button_value}
              </Button>
            </div>
          )}
        </div>
      </div>
      <form action="" className="flex flex-col gap-4">
        <div>
          <div className="text-2xl underline underline-offset-4 ">
            Button Element
          </div>
          <div className="flex p-2 gap-2">
            {blinkButtonElement.map((e) => {
              return (
                <div
                  key={e.id}
                  className="flex gap-1 items-center bg-sky-300 rounded-md p-[3px]"
                >
                  <div>{e.button_label}</div>
                  <button
                    className="bg-red-400 rounded-full"
                    onClick={() => {
                      setblinkButtonElement(
                        blinkButtonElement.filter((el) => e.id != el.id)
                      );
                    }}
                  >
                    <CircleXIcon />
                  </button>
                </div>
              );
            })}
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
          <div className="text-2xl underline underline-offset-4 ">
            Input Area
          </div>
          <div className="flex gap-2 items-center py-2">
            <button
              className="bg-red-400  hover:bg-red-500 rounded-md p-2"
              onClick={(e) => {
                e.preventDefault();
                setblinkInputElement(null);
              }}
            >
              Remove Input Element
            </button>
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
            }}
          >
            Update Input
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
            onChange={(e) => setBlinkName(e.target.value)}
            value={blinkName}
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
                    title: e.target.value,
                  })
                }
                value={mainHeading.title}
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
                    description: e.target.value,
                  })
                }
                value={mainHeading.description}
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
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white `}
                id="grid-first-name"
                type="text"
                placeholder="Wallet Address"
                onChange={(e) => setWalletAddress(e.target.value)}
                value={walletAddress}
              />
            </div>
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
