import React from "react";
import { Text } from "./Text";
import { useMessage } from "../hooks/useMessage";

export type SenarioProps = {
  children: React.ReactNode;
};

export function Senario({ children }: SenarioProps) {
  const senario = useMessage();
  const texts = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type == Text) {
      return child.props.children;
    }
    return null;
  });
  return <>{children}</>;
}
