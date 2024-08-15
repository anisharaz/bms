import { ActionGetResponse, LinkedAction } from "@solana/actions";

export class SolanaActionsSpecClass {
  public instanceID: string = "";
  public walletaddress: string = "";
  public Actions: LinkedAction[] = [
    {
      href: "templac_holder",
      label: "0.1 SOL",
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
