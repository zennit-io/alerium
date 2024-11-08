import { signUpAtom } from "@/components/auth/providers/sign-up";
import { Stack } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default () => {
  const setSignUp = useSetAtom(signUpAtom);

  useEffect(() => {
    setSignUp({
      type: "provider",
      progress: 0,
      fullName: "",
      email: "",
      phone: "",
      token: null,
      birthdate: "",
      password: "",
    });
  }, [setSignUp]);

  return <Stack screenOptions={{ headerShown: false, animation: "fade" }} />;
};
