import React, { useEffect } from "react";
import { SenarioProvider, useSenario } from "../hooks/useSenario";

export type SenarioProps = {
  children: React.ReactNode;
};

export function SenarioHandler({ children }: SenarioProps) {
  const senario = useSenario();
  useEffect(() => {
    setTimeout(() => {
      console.log(senario);
    }, 1000);
  }, []);
  return <>{children}</>;
}

export function Senario({ children }: SenarioProps) {
  return (
    <SenarioProvider>
      <SenarioHandler>{children}</SenarioHandler>
    </SenarioProvider>
  );
}
