import React, { useEffect } from "react";
import { useSenario } from "../hooks/useSenario";

export type TextProps = {
  children: React.ReactNode;
};

export function Text({ children }: TextProps) {
  const senario = useSenario();
  console.log(children);
  useEffect(() => {
    if (typeof children == "string") {
      senario.pushText(children);
    }
  }, []);
  return null;
}
