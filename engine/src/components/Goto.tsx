import React from "react";
import { useChapter } from "../hooks/useChapter";
import { Action } from "./Action";

export type GotoProps = {
  to: string;
};

export function Goto({ to }: GotoProps) {
  const chapter = useChapter();
  return <Action action={() => chapter.goto(to)} preventNext />;
}
