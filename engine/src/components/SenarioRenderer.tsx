import React, { useEffect } from "react";
import { render } from "../reconciler/renderer";
import { useMessage } from "../hooks/useMessage";
import { MemoryRouter, Switch } from "react-router";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const message = useMessage();
  useEffect(() => {
    const unmount = render(
      <MemoryRouter>{children}</MemoryRouter>,
      (containerInfo) => {
        console.log("message updated", JSON.stringify(containerInfo));
        message.setMessages([...containerInfo]);
      }
    );
    return () => unmount();
  }, [children]);
  return null;
}
