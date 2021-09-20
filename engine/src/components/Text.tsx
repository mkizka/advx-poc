import React from "react";

export type TextProps = {
  children: React.ReactNode;
};

declare namespace JSX {
  interface IntrinsicElements {
    Texta: TextProps;
  }
}

export function Text({ children }: TextProps) {
  const Texta = "Texta" as unknown as React.VFC<TextProps>;
  return <Texta>{children}</Texta>;
}
