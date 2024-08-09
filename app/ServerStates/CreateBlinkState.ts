import { ActionGetResponse, LinkedAction } from "@solana/actions";

// TODO: make the action move extensive and move the file to type folder
export class ServerActionState {
  public instanceID: string = "";
  public Actions: LinkedAction[] = [
    {
      href: "placeholder",
      label: "Button 1",
    },
    {
      href: "placeholder",
      label: "Button 2",
      parameters: [
        {
          name: "amount", // parameter name in the `href` above
          label: "label for input", // placeholder of the text input
          required: true,
        },
      ],
    },
  ];
  public data: ActionGetResponse = {
    title: "Enter Title for Blink",
    icon: "https://static.aaraz.me/example.png",
    description: "Write a description for your Blink",
    label: "",
    disabled: false,
    links: {
      actions: this.Actions,
    },
  };
}
