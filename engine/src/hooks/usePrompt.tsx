import React, { useState } from "react";
import { createContext } from "../utils/createContext";

function _usePrompt() {
  const [isActive, setIsActive] = useState(false);
  const [choices, setChoices] = useState<string[] | null>(null);
  return {
    isActive,
    setIsActive,
    choices,
    setChoices,
  };
}

type Prompt = ReturnType<typeof _usePrompt>;

export const [PromptContext, usePrompt] = createContext<Prompt>();

export type PromptProviderProps = {
  children: React.ReactNode;
};

export function PromptProvider({ children }: PromptProviderProps) {
  const value = _usePrompt();
  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}
