import React, { useState } from "react";
import { ADVXCommand, TextCommand } from "../reconciler/types";
import { createContext } from "../utils/createContext";

function getCurrentText(commands: ADVXCommand[] | null, index: number) {
  const textCommands =
    commands != null
      ? commands
          .slice(0, index + 1)
          .filter((command): command is TextCommand => command.type != "Action")
      : null;
  return textCommands != null && textCommands.length > 0
    ? textCommands.pop()!.message
    : null;
}

function _useCommand() {
  const [commands, setCommands] = useState<ADVXCommand[] | null>(null);
  const [index, setIndex] = useState(0);
  const currentItem = commands != null ? commands[index] : null;
  const currentText = getCurrentText(commands, index);
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
    commands,
    currentItem,
    currentText,
    next,
    resetIndex,
    setCommands,
  };
}

type Command = ReturnType<typeof _useCommand>;

export const [CommandContext, useCommand, CommandProvider] =
  createContext<Command>(_useCommand);

export type CommandProviderProps = {
  children: React.ReactNode;
};
