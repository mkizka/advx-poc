import React, { useState, useRef, useContext } from "react";

export const SenarioContext = React.createContext<{
  currentText: string;
  nextText: () => void;
}>(null);

export type SenarioProviderProps = {
  children: React.ReactNode;
};

export function useSenario() {
  return useContext(SenarioContext);
}
