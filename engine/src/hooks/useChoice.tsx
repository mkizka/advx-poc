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

export const [ChoiceContext, useChoice, ChoiceProvider] =
  createContext<Choice>(_useChoice);

export type ChoiceProviderProps = {
  children: React.ReactNode;
};
