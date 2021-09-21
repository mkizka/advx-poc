import React from "react";
import { MessageProvider } from "../hooks/useMessage";
import { Screen } from "./Screen";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <MessageProvider>
      <Screen />
      <SenarioRenderer>{children}</SenarioRenderer>
    </MessageProvider>
  );
}
