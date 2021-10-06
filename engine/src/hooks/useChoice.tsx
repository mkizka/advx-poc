import React, { useRef, useState } from "react";
import { createContext } from "../utils/createContext";
import { useCommand } from "./useCommand";

function _useChoice() {
  const command = useCommand();
  const [choices, setChoices] = useState<string[] | null>(null);
  const _answer = useRef<string | null>(null);
  const is = (currentAnswer: string) => {
    return () => {
      return _answer.current == currentAnswer;
    };
  };
  const setAnswer = (answer: string) => {
    _answer.current = answer;
    setChoices(null);
    command.next();
  };
  return {
    choices,
    setChoices,
    get answer() {
      return _answer.current;
    },
    setAnswer,
    is,
  };
}

type Choice = ReturnType<typeof _useChoice>;

export const [ChoiceContext, useChoice, ChoiceProvider] =
  createContext<Choice>(_useChoice);

export type ChoiceProviderProps = {
  children: React.ReactNode;
};
