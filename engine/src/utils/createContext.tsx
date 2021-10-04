import React, {
  createContext as reactCreateContext,
  useContext as reactUseContext,
} from "react";

type Provider = (props: { children: React.ReactNode }) => JSX.Element;

function createContext<T>(): [React.Context<T | null>, () => T];
function createContext<T>(
  hook: () => T
): [React.Context<T | null>, () => T, Provider];
function createContext<T>(hook?: () => T) {
  const Context = reactCreateContext<T | null>(null);
  function useContext() {
    const context = reactUseContext(Context);
    if (context == null) {
      throw new Error("Context not Provided");
    }
    return context;
  }
  if (hook != undefined) {
    const Provider = ({ children }: { children: React.ReactNode }) => {
      const value = hook();
      return <Context.Provider value={value}>{children}</Context.Provider>;
    };
    return [Context, useContext, Provider] as const;
  }
  return [Context, useContext] as const;
}

export { createContext };
