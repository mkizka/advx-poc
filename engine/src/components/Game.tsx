import React from "react";
import { MessageProvider } from "../hooks/useMessage";
import { PromptProvider } from "../hooks/usePrompt";
import { ScreenRenderer } from "./ScreenRenderer";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <MessageProvider>
      <PromptProvider>
        <ScreenRenderer />
        <SenarioRenderer>{children}</SenarioRenderer>
      </PromptProvider>
    </MessageProvider>
  );
}
