import React from "react";

export type TextProps = {
  children: React.ReactNode;
};

export function Text({ children }: TextProps) {
  return <>{children}</>;
}
