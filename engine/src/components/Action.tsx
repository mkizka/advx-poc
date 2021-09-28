import React from "react";

export type ActionProps = {
  action: () => void;
};

const ActionElement = "Action";

export function Action({ action }: ActionProps) {
  // @ts-ignore
  return <ActionElement action={action} />;
}
