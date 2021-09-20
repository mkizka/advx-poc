import React, { useRef, useState } from "react";
import { SenarioContext } from "../hooks/useSenario";
import { Screen } from "./Screen";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

function useText(texts: string[]): [string, () => void] {
  const [currentText, setCurrentText] = useState(texts[0]);
  const index = useRef(0);
  const nextText = () => {
    index.current += 1;
    setCurrentText(texts[index.current]);
  };
  return [currentText, nextText];
}

export function Game({ children }: GameProps) {
  const [currentText, nextText] = useText(["first", "second"]);
  return (
    <SenarioContext.Provider value={{ currentText, nextText }}>
      <Screen />
      <SenarioRenderer>{children}</SenarioRenderer>
    </SenarioContext.Provider>
  );
}
