import React, { useEffect } from "react";
import { render } from "../reconciler/renderer";
import { useContextBridge } from "../hooks/useContextBridge";
import { useMessage, MessageContext } from "../hooks/useMessage";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

const history = createMemoryHistory();

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(MessageContext);
  const message = useMessage();
  useEffect(() => {
    const unmount = render(
      <ContextBridge>
        <Router history={history}>{children}</Router>
      </ContextBridge>,
      (containerInfo) => {
        console.log("message updated");
        message.setMessages(containerInfo);
      }
    );
    return () => unmount();
  }, [children]);
  return null;
}
