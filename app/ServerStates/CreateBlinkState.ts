import { ActionGetResponse, LinkedAction } from "@solana/actions";

export class ServerActionState {
  public instanceID: string = "";
  public Actions: LinkedAction[] = [];
  public data: ActionGetResponse = {
    title: "",
    icon: "",
    description: "",
    label: "",
    disabled: false,
    links: {
      actions: this.Actions,
    },
  };
}

export const ServerActionStateArray: ServerActionState[] = [];
