import React, { useEffect, useRef, useState } from "react";
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

function useRequestRender() {
  const [, update] = useState({});
  return () => update({});
}

function _useCommand() {
  const [commands, setCommands] = useState<ADVXCommand[] | null>(null);

  // <Action /> が連続する時など同時に index の値を更新したい時があるため
  // useState ではなく useRefを使用し、実際の画面更新は requestRender で実行
  const index = useRef(0);
  const requestRender = useRequestRender();

  const currentItem = commands != null ? commands[index.current] : null;
  const currentText = getCurrentText(commands, index.current);
  const hasNextText =
    commands != null && commands[index.current + 1]?.type == "Text";

  // next が呼ばれる前のマウント時の index を保持
  let debugIndex = index.current;
  useEffect(() => {
    console.debug("index:", debugIndex, "command:", currentItem);
  });

  useEffect(() => {
    if (currentItem?.type == "Action") {
      currentItem.action();
    }
  }, [currentItem]);

  const next = () => {
    if (commands == null) {
      console.warn("commandsがnullの時にnext()を呼び出しています");
      return;
    }
    if (index.current < commands.length - 1) {
      index.current++;
      requestRender();
    }
  };

  const resetIndex = () => {
    index.current = 0;
    requestRender();
  };

  return {
    commands,
    currentItem,
    currentText,
    hasNextText,
    next,
    resetIndex,
    setCommands,
  };
}

type Command = ReturnType<typeof _useCommand>;

export const [CommandContext, useCommand, CommandProvider] =
  createContext<Command>("Command", _useCommand);

export type CommandProviderProps = {
  children: React.ReactNode;
};
