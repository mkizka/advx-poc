import React from "react";
import { useEffect } from "react";
import { useContextBridge } from "../hooks/useContextBridge";
import { SenarioContext, useSenario } from "../hooks/useSenario";
import { render } from "../renderer";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(SenarioContext);
  const senario = useSenario();
  useEffect(() => {
    render(<ContextBridge>{children}</ContextBridge>, (root) => {
      console.log(root);
      senario.setTexts(root.children as string[]);
    });
  }, []);
  return null;
}
