import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { TextInput } from "react-native";

type SignUpInputFocus = () => void;

const SignUpInputFocusContext = createContext<SignUpInputFocus>(null);

export const SignUpInputFocusProvider = ({ children }: PropsWithChildren) => {
  const inputRef = useRef<TextInput>(null);

  const focusSignUpInput = () => inputRef.current?.focus();

  return (
    <>
      <TextInput
        ref={inputRef}
        value=""
        aria-hidden={true}
        blurOnSubmit={false}
        autoComplete="off"
        className="absolute hidden"
      />
      <SignUpInputFocusContext.Provider value={focusSignUpInput}>
        {children}
      </SignUpInputFocusContext.Provider>
    </>
  );
};

export const useSignUpInputFocus = () => useContext(SignUpInputFocusContext);
