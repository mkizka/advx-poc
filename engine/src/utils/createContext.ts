import {
  createContext as reactCreateContext,
  useContext as reactUseContext,
} from "react";

export function createContext<T>() {
  const Context = reactCreateContext<T | null>(null);
  function useContext() {
    const context = reactUseContext(Context);
    if (context == null) {
      throw new Error("Context not Provided");
    }
    return context;
  }
  return [Context, useContext] as const;
}
