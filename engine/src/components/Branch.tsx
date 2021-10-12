import React, { useState } from "react";
import { Action } from "./Action";

export type BranchProps = {
  if: () => boolean;
  children: React.ReactNode;
};

export function Branch(props: BranchProps) {
  const [done, setDone] = useState(false);
  if (!done) return <Action action={() => setDone(true)} preventNext />;
  if (props.if()) return <>{props.children}</>;
  else return null;
}
