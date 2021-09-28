import React from "react";

export type StyleProps = {
  children: React.ReactNode;
  color?: string;
};

const StyleElement = "Style";

export function Style({ children, ...props }: StyleProps) {
  // @ts-ignore
  return <StyleElement {...props}>{children}</StyleElement>;
}
