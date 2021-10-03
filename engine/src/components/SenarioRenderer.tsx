import React, { useEffect } from "react";
import { render } from "../reconciler/renderer";
import { CommandContext, useCommand } from "../hooks/useCommand";
import { MemoryRouter } from "react-router";
import { useContextBridge } from "../hooks/useContextBridge";
import { ChoiceContext } from "../hooks/useChoice";

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(CommandContext, ChoiceContext);
  const command = useCommand();
  useEffect(() => {
    const unmount = render(
      <ContextBridge>
        <MemoryRouter>{children}</MemoryRouter>
      </ContextBridge>,
      (commands) => {
        console.log("commands updated", JSON.stringify(commands));
        command.setCommands([...commands]);
      }
    );
    return () => unmount();
  }, [children]);
  return null;
}
