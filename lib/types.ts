import { ActionGetResponse, LinkedAction } from "@solana/actions";

export type BlinkDataType = ActionGetResponse;

export type blinkButtonElement = {
  id: string;
  button_label: string;
  button_value: string;
};

export type blinkInputElement = {
  input_label: string;
  input_button_value: string;
};
