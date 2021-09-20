import React from "react";
import { useEffect } from "react";
import { useContextBridge } from "../hooks/useContextBridge";
import { SenarioContext } from "../hooks/useSenario";
import { render } from "../renderer";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(SenarioContext);
  useEffect(() => {
    render(<ContextBridge>{children}</ContextBridge>);
  }, []);
  return null;
}
