import React from "react";
import { CommandProvider } from "../hooks/useCommand";
import { ChoiceProvider } from "../hooks/useChoice";
import { WindowSizeProvider } from "../hooks/useWindowSize";
import { ScreenRenderer } from "./ScreenRenderer";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <CommandProvider>
      <ChoiceProvider>
        <WindowSizeProvider>
          <ScreenRenderer />
        </WindowSizeProvider>
        <SenarioRenderer>{children}</SenarioRenderer>
      </ChoiceProvider>
    </CommandProvider>
  );
}
