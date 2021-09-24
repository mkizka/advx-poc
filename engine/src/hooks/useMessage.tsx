import React, { useContext, useState } from "react";

type MessageItem = {
  type: string;
  text: string;
  props?: any;
};

function _useMessage() {
  const [messages, setMessages] = useState<MessageItem[][]>(null);
  const [index, setIndex] = useState(0);
  const currentItems = messages != null ? messages[index] : [];
  const next = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    }
  };
  return {
    currentItems,
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
