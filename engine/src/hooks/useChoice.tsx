import React, { useRef, useState } from "react";
import { createContext } from "../utils/createContext";

function _useChoice() {
  const [choices, setChoices] = useState<string[] | null>(null);
  const answer = useRef<string>(null);
  const is = (currentAnswer: string) => {
    return () => answer.current == currentAnswer;
  };
  return {
    choices,
    setChoices,
    is,
    answer,
  };
}

type Choice = ReturnType<typeof _useChoice>;

export const [ChoiceContext, useChoice] = createContext<Choice>();

export type ChoiceProviderProps = {
  children: React.ReactNode;
};

export function ChoiceProvider({ children }: ChoiceProviderProps) {
  const value = _useChoice();
  return (
    <ChoiceContext.Provider value={value}>{children}</ChoiceContext.Provider>
  );
}
