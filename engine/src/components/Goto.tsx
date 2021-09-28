import React from "react";

export type GotoProps = {
  to: string;
};

const GotoElement = "Goto";

export function Goto({ to }: GotoProps) {
  // @ts-ignore
  return <GotoElement to={to} />;
}
