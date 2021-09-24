import React from "react";

export type TextProps = {
  children: React.ReactNode;
};

const Texta = "Texta";

export function Text({ children }: TextProps) {
  // @ts-ignore
  return <Texta>{children}</Texta>;
}
