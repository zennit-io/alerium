import {createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useContext, useState,} from "react";

type ScannedInfo = Partial<{
  scannedValue: string;
  voiceValue: string;
  photoBase64: string;
  title: string
}>;
type ScannedInfoContextValue = [
  ScannedInfo,
  Dispatch<SetStateAction<ScannedInfo>>,
];
export const ScannedInfoContext = createContext<ScannedInfoContextValue>(
  {} as ScannedInfoContextValue,
);

export const ScannedInfoProvider = ({ children }: PropsWithChildren) => {
  const state = useState<ScannedInfo>({});
  return (
    <ScannedInfoContext.Provider value={state}>
      {children}
    </ScannedInfoContext.Provider>
  );
};

export const useScannedInfo = () => {
  const context = useContext(ScannedInfoContext);
  if (!context) {
    throw new Error("ScannedInfo Context is not available");
  }
  return context;
};
