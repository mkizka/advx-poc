import React, { useContext, useState } from "react";

function useTexts() {
  const [texts, setTexts] = useState<string[]>([]);
  function pushText(text: string) {
    setTexts([...texts, text]);
  }
  return { texts, pushText };
}

export const SenarioContext =
  React.createContext<ReturnType<typeof useTexts>>(null);

export type SenarioProviderProps = {
  children: React.ReactNode;
};

export function SenarioProvider({ children }: SenarioProviderProps) {
  const value = useTexts();
  return (
    <SenarioContext.Provider value={value}>{children}</SenarioContext.Provider>
  );
}

export function useSenario() {
  return useContext(SenarioContext);
}
