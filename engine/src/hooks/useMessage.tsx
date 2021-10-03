import React, { useState } from "react";
import { ADVXCommand } from "../reconciler/types";
import { createContext } from "../utils/createContext";

function _useMessage() {
  const [messages, setMessages] = useState<ADVXCommand[] | null>(null);
  const [index, setIndex] = useState(0);
  const currentItem = messages != null ? messages[index] : null;
  const next = () => {
    if (messages == null) {
      console.warn("messagesがnullの時にnext()を呼び出しています");
      return;
    }
    if (index < messages.length - 1) {
      setIndex(index + 1);
    }
  };
  const resetIndex = () => setIndex(0);
  return {
    currentItem,
    next,
    resetIndex,
    setMessages,
  };
}

type Message = ReturnType<typeof _useMessage>;

export const [MessageContext, useMessage] = createContext<Message>();

export type MessageProviderProps = {
  children: React.ReactNode;
};

export function MessageProvider({ children }: MessageProviderProps) {
  const value = _useMessage();
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
