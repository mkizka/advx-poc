import React from "react";
import { ADVXFiber } from "../reconciler/renderer";
import { CommandContext, useCommand } from "../hooks/useCommand";
import { MemoryRouter } from "react-router";
import { useContextBridge } from "../hooks/useContextBridge";
import { ChoiceContext } from "../hooks/useChoice";
import { ADVXCommand } from "../reconciler/types";

type SenarioRendererInnerProps = {
  commands: ADVXCommand[] | null;
  handleUpdate: (container: ADVXCommand[]) => void;
};

class SenarioRendererInner extends React.Component<SenarioRendererInnerProps> {
  private container: any;
  handleUpdate = () => {
    this.props.handleUpdate(this.container.containerInfo);
  };
  componentDidMount() {
    this.container = ADVXFiber.createContainer([], 0, false, null);
    window.addEventListener("__ADVX_UPDATE__", this.handleUpdate);
    ADVXFiber.updateContainer(this.props.children, this.container, this);
  }
  componentDidUpdate() {
    console.debug("commands updated", JSON.stringify(this.props.commands));
    ADVXFiber.updateContainer(this.props.children, this.container, this);
  }
  componentWillUnmount() {
    ADVXFiber.updateContainer(null, this.container, this);
    window.removeEventListener("__ADVX_UPDATE__", this.handleUpdate);
  }
  shouldComponentUpdate(nextProps: SenarioRendererInnerProps) {
    return (
      JSON.stringify(this.props.commands) != JSON.stringify(nextProps.commands)
    );
  }
  render() {
    return null;
  }
}

export type SenarioRendererProps = {
  children: React.ReactNode;
};

export function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(CommandContext, ChoiceContext);
  const command = useCommand();
  const handleUpdate = (commands: ADVXCommand[]) => {
    command.setCommands([...commands]);
  };
  return (
    <SenarioRendererInner
      commands={command.commands}
      handleUpdate={handleUpdate}
    >
      <ContextBridge>
        <MemoryRouter>{children}</MemoryRouter>
      </ContextBridge>
    </SenarioRendererInner>
  );
}
