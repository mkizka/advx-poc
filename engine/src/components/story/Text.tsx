import React from "react";
import { TextCommand } from "../../reconciler/types";

export type TextProps = Omit<TextCommand, "type" | "message"> & {
  children: React.ReactNode;
};

const TextElement = "Text";

export function Text(props: TextProps) {
  // @ts-ignore
  return <TextElement {...props} />;
}
