import React from "react";
import { useCommand } from "../../hooks/useCommand";
import { ActionCommand } from "../../reconciler/types";

export type ActionProps = Omit<ActionCommand, "type"> & {
  preventNext?: boolean;
};

const ActionElement = "Action";

export function Action(props: ActionProps) {
  const command = useCommand();
  const action = () => {
    props.action();
    if (!props.preventNext) {
      command.next();
    }
  };
  // @ts-ignore
  return <ActionElement action={action} />;
}
