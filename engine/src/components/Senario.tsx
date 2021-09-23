import React from "react";
import { useMessage } from "../hooks/useMessage";
import { Text } from "./Text";

export type SenarioProps = {
  children: React.ReactNode;
};

export function Senario({ children }: SenarioProps) {
  const message = useMessage();
  const childElements = React.Children.map(children, (child) => {
    if (!(React.isValidElement(child) && child.type == Text)) {
      throw new Error("Senarioの子要素はTextである必要があります");
    }
  });
  // TODO: childElementsをJSONにしてmessageに登録
  return <>{children}</>;
}
