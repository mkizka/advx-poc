import React from "react";
import { MessageProvider } from "../hooks/useMessage";
import { ScreenRenderer } from "./ScreenRenderer";
import { SenarioRenderer } from "./SenarioRenderer";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <MessageProvider>
      <ScreenRenderer />
      <SenarioRenderer>{children}</SenarioRenderer>
    </MessageProvider>
  );
}
