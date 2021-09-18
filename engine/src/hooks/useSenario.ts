import React from "react";

const SenarioContext = React.createContext(null);

export function useSenario() {
  return React.useContext(SenarioContext);
}
