import React, { useContext, useState } from "react";

function useTexts(initialState: string[]) {
  const [texts, setTexts] = useState(initialState);
  const [index, setIndex] = useState(0);
  const nextText = () => {
    if (index < texts.length - 1) {
      setIndex(index + 1);
    }
  };
  return {
    currentText: texts[index],
    nextText,
    setTexts,
  };
}

export const SenarioContext =
  React.createContext<ReturnType<typeof useTexts>>(null);

export type SenarioProviderProps = {
  children: React.ReactNode;
};

export function SenarioProvider({ children }: SenarioProviderProps) {
  const value = useTexts(["a", "b"]);
  return (
    <SenarioContext.Provider value={value}>{children}</SenarioContext.Provider>
  );
}

export function useSenario() {
  return useContext(SenarioContext);
}
