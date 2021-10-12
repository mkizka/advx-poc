import React from "react";
import { useChoice } from "../hooks/useChoice";
import { Action } from "./Action";

export type ChoiceProps = {
  choices: string[];
};

export function Choice({ choices }: ChoiceProps) {
  const prompt = useChoice();
  return <Action action={() => prompt.setChoices(choices)} preventNext />;
}
