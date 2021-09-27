import React, { useEffect } from "react";
import { render } from "../reconciler/renderer";
import { useContextBridge } from "../hooks/useContextBridge";
import { useMessage, MessageContext } from "../hooks/useMessage";
import { MemoryRouter, Switch } from "react-router";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(MessageContext);
  const message = useMessage();
  useEffect(() => {
    const unmount = render(
      <ContextBridge>
        <MemoryRouter>
          <Switch>{children}</Switch>
        </MemoryRouter>
      </ContextBridge>,
      (containerInfo) => {
        console.log("message updated", JSON.stringify(containerInfo));
        message.setMessages(containerInfo);
      }
    );
    return () => unmount();
  }, [children]);
  return null;
}
