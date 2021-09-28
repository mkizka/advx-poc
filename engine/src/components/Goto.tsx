import React from "react";
import { useChapter } from "../hooks/useChapter";

export type GotoProps = {
  to: string;
};

const ActionElement = "Action";

export function Goto({ to }: GotoProps) {
  const chapter = useChapter();
  // @ts-ignore
  return <ActionElement action={() => chapter.goto(to)} />;
}
