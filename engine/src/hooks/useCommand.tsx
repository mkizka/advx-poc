import React, { useState } from "react";
import { ADVXCommand } from "../reconciler/types";
import { createContext } from "../utils/createContext";

function _useCommand() {
  const [commands, setCommands] = useState<ADVXCommand[] | null>(null);
  const [index, setIndex] = useState(0);
  const currentItem = commands != null ? commands[index] : null;
  const next = () => {
    if (commands == null) {
      console.warn("commandsがnullの時にnext()を呼び出しています");
      return;
    }
    if (index < commands.length - 1) {
      setIndex(index + 1);
    }
  };
  const resetIndex = () => setIndex(0);
  return {
    currentItem,
    next,
    resetIndex,
    setCommands,
  };
}

type Command = ReturnType<typeof _useCommand>;

export const [CommandContext, useCommand] = createContext<Command>();

export type CommandProviderProps = {
  children: React.ReactNode;
};

export function CommandProvider({ children }: CommandProviderProps) {
  const value = _useCommand();
  return (
    <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
  );
}
