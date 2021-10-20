import React, {
  createContext as reactCreateContext,
  useContext as reactUseContext,
} from "react";

type ProviderProps = { children: React.ReactNode };
type ProviderComponent = React.VFC<ProviderProps>;

function createContext<T>(name: string): [React.Context<T | null>, () => T];
function createContext<T>(
  name: string,
  hook: () => T
): [React.Context<T | null>, () => T, ProviderComponent];
function createContext<T>(name: string, hook?: () => T) {
  const Context = reactCreateContext<T | null>(null);
  Context.displayName = `${name}Context`;
  function useContext() {
    const context = reactUseContext(Context);
    if (context == null) {
      throw new Error("Context not Provided");
    }
    return context;
  }
  if (hook != undefined) {
    const Provider: ProviderComponent = ({ children }) => {
      const value = hook();
      return <Context.Provider value={value}>{children}</Context.Provider>;
    };
    Provider.displayName = `${name}Provider`;
    return [Context, useContext, Provider] as const;
  }
  return [Context, useContext] as const;
}

export { createContext };
