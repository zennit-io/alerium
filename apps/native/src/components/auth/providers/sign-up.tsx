import { Provider, createStore } from "jotai";
import { atomWithReset } from "jotai/utils";
import type { PropsWithChildren } from "react";

type SignUpClientFields = {
  type: "client";
  fullName: string;
  email: string;
  phone: string;
  password: string;
  token: string | null;
  birthdate: string | null;
};
type SignUpProviderFields = {
  // todo: add proper sign up fields to parking provider
  type: "provider";
  fullName: string;
  email: string;
  phone: string;
  password: string;
  token: string | null;
  birthdate: string | null;
};
type SignUpMetadata = { progress: number };

export type SignUpFields = SignUpMetadata &
  (SignUpClientFields | SignUpProviderFields);

export const signUpAtom = atomWithReset<SignUpFields>({
  progress: 0,
  type: "client",
  token: null,
  phone: "",
  password: "",
  fullName: "",
  email: "",
  birthdate: null,
});

export const NUMBER_OF_SIGN_UP_STEPS = 5;

const store = createStore();

export const SignUpProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
