import React, { useContext, useState } from "react";

function _usePrompt() {
  const [isActive, setIsActive] = useState(false);
  const [choices, setChoices] = useState<string[]>(null);
  return {
    isActive,
    setIsActive,
    choices,
    setChoices,
  };
}

export const PromptContext =
  React.createContext<ReturnType<typeof _usePrompt>>(null);

export type PromptProviderProps = {
  children: React.ReactNode;
};

export function PromptProvider({ children }: PromptProviderProps) {
  const value = _usePrompt();
  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}

export function usePrompt() {
  return useContext(PromptContext);
}
