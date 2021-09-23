import React from "react";
import { MessageProvider } from "../hooks/useMessage";
import { Screen } from "./Screen";

export type GameProps = {
  children: React.ReactNode;
};

export function Game({ children }: GameProps) {
  return (
    <MessageProvider>
      <Screen />
      {children}
    </MessageProvider>
  );
}
