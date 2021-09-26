import React from "react";

export type TextProps = {
  children: React.ReactNode;
};

const TextElement = "Text";

export function Text({ children }: TextProps) {
  // @ts-ignore
  return <TextElement>{children}</TextElement>;
}
