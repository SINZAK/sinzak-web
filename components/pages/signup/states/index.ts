import React from "react";
import { useContext } from "react";

export const stepContext = React.createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => {}]);
export const StepProvider = stepContext.Provider;
export const useStepContext = () => useContext(stepContext);
