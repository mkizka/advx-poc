import React, { useEffect } from "react";
import { render } from "../reconciler/renderer";
import { useContextBridge } from "../hooks/useContextBridge";
import { useMessage, MessageContext } from "../hooks/useMessage";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(MessageContext);
  const message = useMessage();
  useEffect(() => {
    const unmount = render(
      <ContextBridge>{children}</ContextBridge>,
      (containerInfo) => {
        message.setMessages(containerInfo);
      }
    );
    return () => unmount();
  }, [children]);
  return null;
}
