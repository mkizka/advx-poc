import React from "react";
import { ActionCommand } from "../reconciler/types";

export type ActionProps = Omit<ActionCommand, "type">;

const ActionElement = "Action";

export function Action(props: ActionProps) {
  // @ts-ignore
  return <ActionElement {...props} />;
}
