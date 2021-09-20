import React from "react";

export type SenarioProps = {
  children: React.ReactNode;
};

export function Senario({ children }: SenarioProps) {
  return <>{children}</>;
}
