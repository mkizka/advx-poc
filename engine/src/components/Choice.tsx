import React from "react";
import { usePrompt } from "../hooks/usePrompt";
import { Action } from "./Action";

export type ChoiceProps = {
  choices: string[];
};

export function Choice({ choices }: ChoiceProps) {
  const prompt = usePrompt();
  return <Action action={() => prompt!.setIsActive(true)} />;
}
