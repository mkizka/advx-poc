import React from "react";

export type SenarioProps = {
  children: React.ReactNode;
};

/*
  使い方未定
  背景など画面全体へのパラメータの初期値を決める？など
*/
export function Senario({ children }: SenarioProps) {
  return <>{children}</>;
}
