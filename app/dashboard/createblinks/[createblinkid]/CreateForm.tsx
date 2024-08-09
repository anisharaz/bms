"use client";
import { ServerActionState } from "@/app/ServerStates/CreateBlinkState";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkedAction } from "@solana/actions";
import { addBlinkData } from "@/app/action/database";
import { useRouter } from "next/navigation";

type blinkButtonElement = {
  id: string;
  button_label: string;
  button_value: string;
};
type blinkInputElement = {
  input_label: string;
  input_button_value: string;
};

// TODO: add loading state
// TODO: add image upload
function CreateForm({ blinkid }: { blinkid: string }) {
  const router = useRouter();
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
      hostname = window.location.hostname;
    }
    const newInstance = new ServerActionState();
    newInstance.data.title = mainHeading.title;
    newInstance.data.description = mainHeading.description;
    newInstance.data.label = "";
    const actionData: LinkedAction[] = blinkButtonElement.map((e) => {
      return {
        href: `${hostname}/api/blink/blinkid/?amount=${e.button_value}`,
        label: e.button_label,
      };
    });
    if (blinkInputElement != null) {
      actionData.push({
        href: `${hostname}/api/blink/blinkid/?amount={amount}`,
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
    // TODO: add page reloading
    await addBlinkData({ blinkid, data: newInstance.data });
    setLoading(false);
    alert("Update Success , RELOAD the page to see the changes");
  }

  return (
    <div className="flex flex-col gap-4">
      <form action="" className="flex flex-col gap-4">
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Main Heading
          </div>
          <div>
            <label htmlFor="title" className="text-xl mr-1 text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="rounded-full p-1 m-1 bg-neutral-200"
              onChange={(e) =>
                setMainHeading({
                  ...mainHeading,
                  title: e.target.value || "Title",
                })
              }
            />
          </div>
          <div>
            <label htmlFor="description" className="text-xl mr-1 text-gray-600">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="rounded-full p-1 m-1 bg-neutral-200 w-80"
              onChange={(e) =>
                setMainHeading({
                  ...mainHeading,
                  description: e.target.value || "Description",
                })
              }
            />
          </div>
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Button Element
          </div>
          <div>
            <label
              htmlFor="button_label"
              className="text-xl mr-1 text-gray-600"
            >
              Button Label
            </label>
            <input
              type="text"
              id="button_label"
              className="rounded-full p-1 m-1 bg-neutral-200"
              onChange={(e) =>
                setAddButtonElement({
                  ...addButtonElement,
                  button_label: e.target.value,
                })
              }
              value={addButtonElement.button_label}
            />
          </div>
          <div>
            <label
              htmlFor="button_value"
              className="text-xl mr-1 text-gray-600"
            >
              Button Value
            </label>
            <input
              type="text"
              id="button_value"
              className="rounded-full p-1 m-1 bg-neutral-200"
              onChange={(e) =>
                setAddButtonElement({
                  ...addButtonElement,
                  button_value: e.target.value,
                })
              }
              value={addButtonElement.button_value}
            />
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
            Add
          </Button>
        </div>
        <div>
          <div className="text-2xl underline underline-offset-4 mb-2">
            Input Area
          </div>
          <div>
            <label htmlFor="input_label" className="text-xl mr-1 text-gray-600">
              Input Label
            </label>
            <input
              type="text"
              id="input_label"
              className="rounded-full p-1 m-1 bg-neutral-200"
              onChange={(e) =>
                setAddInputElement({
                  ...addInputElement,
                  input_label: e.target.value,
                })
              }
              value={addInputElement.input_label}
            />
          </div>
          <div>
            <label htmlFor="input_value" className="text-xl mr-1 text-gray-600">
              Input Button Label
            </label>
            <input
              type="text"
              id="input_value"
              className="rounded-full p-1 m-1 bg-neutral-200"
              onChange={(e) =>
                setAddInputElement({
                  ...addInputElement,
                  input_button_value: e.target.value,
                })
              }
              value={addInputElement.input_button_value}
            />
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
            Add
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
      <div className="mt-10">
        <div className="text-2xl font-bold underline underline-offset-4">
          Preview
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

export default CreateForm;
