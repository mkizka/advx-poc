import React from "react";
import { MessageProvider } from "../hooks/useMessage";
import { ChoiceProvider } from "../hooks/useChoice";
import { ScreenRenderer } from "./ScreenRenderer";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <MessageProvider>
      <ChoiceProvider>
        <ScreenRenderer />
        <SenarioRenderer>{children}</SenarioRenderer>
      </ChoiceProvider>
    </MessageProvider>
  );
}
