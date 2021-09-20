import React from "react";
import { SenarioProvider } from "../hooks/useSenario";
import { Screen } from "./Screen";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <SenarioProvider>
      <Screen />
      <SenarioRenderer>{children}</SenarioRenderer>
    </SenarioProvider>
  );
}
