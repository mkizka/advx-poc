import React, { useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

export type SenarioProps = {
  children: React.ReactNode;
};

type SenarioItem = {
  type: string;
  text: string;
  props?: object;
};

function getSenario(children: React.ReactNode) {
  const texts = React.Children.toArray(children);
  return texts.map((textElement) => {
    if (!React.isValidElement(textElement)) return null;
    const textChildren = React.Children.toArray(textElement.props.children);
    return textChildren.reduce<SenarioItem[]>((result, textChild) => {
      if (React.isValidElement(textChild)) {
        const { children: text, ...props } = textChild.props;
        // @ts-ignore
        result.push({ type: textChild.type.name, text, props });
      } else {
        result.push({ type: "Plain", text: `${textChild}` });
      }
      return result;
    }, []);
  });
}

export function Senario({ children }: SenarioProps) {
  const message = useMessage();
  console.log(children);
  useEffect(() => {
    message.setMessages(getSenario(children));
  }, [children]);
  return <>{children}</>;
}
