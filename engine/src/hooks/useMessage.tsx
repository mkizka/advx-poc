import React, { useContext, useState } from "react";

function _useMessage(initialState: string[]) {
  const [texts, setTexts] = useState(initialState);
  const [index, setIndex] = useState(0);
  const nextText = () => {
    if (index < texts.length - 1) {
      setIndex(index + 1);
    }
  };
  return {
    currentText: texts[index],
    nextText,
    setTexts,
  };
}

export const MessageContext =
  React.createContext<ReturnType<typeof _useMessage>>(null);

export type MessageProviderProps = {
  children: React.ReactNode;
};

export function MessageProvider({ children }: MessageProviderProps) {
  const value = _useMessage(["a", "b"]);
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
