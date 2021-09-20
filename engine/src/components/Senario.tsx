import React from "react";
import { useSenario } from "../hooks/useSenario";

export type SenarioProps = {
  children: React.ReactNode;
};

export function Senario({ children }: SenarioProps) {
  const senario = useSenario();
  console.log(senario);
  return <>{children}</>;
}
