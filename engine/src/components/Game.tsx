import React from "react";
import { ScreenRenderer } from "./ScreenRenderer";
import { SenarioRenderer } from "./SenarioRenderer";
import { CommandProvider } from "../hooks/useCommand";
import { ChoiceProvider } from "../hooks/useChoice";
import { WindowSizeProvider } from "../hooks/useWindowSize";
import { MessageWindow } from "./screen/MessageWindow";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <CommandProvider>
      <ChoiceProvider>
        <WindowSizeProvider>
          <ScreenRenderer>
            <MessageWindow />
          </ScreenRenderer>
        </WindowSizeProvider>
        <SenarioRenderer>{children}</SenarioRenderer>
      </ChoiceProvider>
    </CommandProvider>
  );
}
