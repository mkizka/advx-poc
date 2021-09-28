import React, { useEffect } from "react";
import { render } from "../reconciler/renderer";
import { MessageContext, useMessage } from "../hooks/useMessage";
import { MemoryRouter } from "react-router";
import { useContextBridge } from "../hooks/useContextBridge";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(MessageContext);
  const message = useMessage();
  useEffect(() => {
    const unmount = render(
      <ContextBridge>
        <MemoryRouter>{children}</MemoryRouter>
      </ContextBridge>,
      (containerInfo) => {
        console.log("message updated", JSON.stringify(containerInfo));
        message.setMessages([...containerInfo]);
      }
    );
    return () => unmount();
  }, [children]);
  return null;
}
