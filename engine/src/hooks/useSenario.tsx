import React, { useState, useRef, useContext } from "react";

export const SenarioContext = React.createContext<{
  currentText: string;
  nextText: () => void;
}>(null);

function useText(texts: string[]): [string, () => void] {
  const [currentText, setCurrentText] = useState(texts[0]);
  const index = useRef(0);
  const nextText = () => {
    index.current += 1;
    setCurrentText(texts[index.current]);
  };
  return [currentText, nextText];
}

export type SenarioProviderProps = {
  children: React.ReactNode;
};

export function SenarioProvider({ children }: SenarioProviderProps) {
  const [currentText, nextText] = useText(["first", "second"]);
  return (
    <SenarioContext.Provider value={{ currentText, nextText }}>
      {children}
    </SenarioContext.Provider>
  );
}

export function useSenario() {
  return useContext(SenarioContext);
}
