import React, { useEffect } from "react";
import { useContextBridge } from "../hooks/useContextBridge";
import { MessageContext, MessageProvider } from "../hooks/useMessage";
import { render } from "../renderer";
import { Screen } from "./Screen";

export type GameProps = {
  children: React.ReactNode;
};

function SenarioRenderer({ children }: GameProps) {
  const ContextBridge = useContextBridge(MessageContext);
  useEffect(() => {
    render(<ContextBridge>{children}</ContextBridge>);
  }, [children]);
  return null;
}

export function Game({ children }: GameProps) {
  return (
    <MessageProvider>
      <Screen />
      <SenarioRenderer>{children}</SenarioRenderer>
    </MessageProvider>
  );
}
