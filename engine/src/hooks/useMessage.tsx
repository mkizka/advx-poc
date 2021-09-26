import React, { useContext, useState } from "react";
import { TopLevelNode } from "../reconciler/types";

function _useMessage() {
  const [messages, setMessages] = useState<TopLevelNode[]>(null);
  const [index, setIndex] = useState(0);
  const currentItem = messages != null ? messages[index] : null;
  const next = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    }
  };
  return {
    currentItem,
    next,
    setMessages,
  };
}

export const MessageContext =
  React.createContext<ReturnType<typeof _useMessage>>(null);

export type MessageProviderProps = {
  children: React.ReactNode;
};

export function MessageProvider({ children }: MessageProviderProps) {
  const value = _useMessage();
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
