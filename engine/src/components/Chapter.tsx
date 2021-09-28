import React from "react";
import { Route, RouteProps } from "react-router";

export type ChapterProps = {
  name?: string;
  senario: RouteProps["component"];
};

export function Chapter({ name, senario }: ChapterProps) {
  return <Route exact path={`/${name || ""}`} component={senario} />;
}
