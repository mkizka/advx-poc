import React from "react";
import { BranchCommand } from "../reconciler/types";

export type BranchProps = Omit<BranchCommand, "type">;

const BranchElement = "Branch";

export function Branch(props: BranchProps) {
  // @ts-ignore
  return <BranchElement {...props} />;
}
