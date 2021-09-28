import React, { useEffect, useState } from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useMessage } from "../hooks/useMessage";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { LowLevelNode } from "../reconciler/types";

export function ScreenRenderer() {
  const [width, height] = useWindowSize();
  const message = useMessage();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (message.currentItem?.type == "Action") {
      message.currentItem.action();
    }
  }, [message.currentItem]);

  useAnimationFrame(() => {
    const len = (texts: LowLevelNode[]) => {
      return texts.reduce((result, item) => {
        result += item.value.length;
        return result;
      }, 0);
    };
    if (
      message.currentItem?.type == "Text" &&
      index < len(message.currentItem.texts)
    ) {
      setIndex(index + 1);
    }
  });

  const handleClick = () => {
    setIndex(0);
    message.next();
  };

  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        {message.currentItem?.type == "Text" &&
          message.currentItem.texts.map((text, i) => (
            <Text
              key={i}
              text={text.value.slice(0, index)}
              style={{
                wordWrap: true,
                wordWrapWidth: width,
                breakWords: true,
                fill: "props" in text ? text.props?.color : "#fff",
              }}
            />
          ))}
        <MessageWindow
          width={width}
          height={height * 0.3}
          interactive={true}
          pointerdown={handleClick}
        />
      </Container>
    </Stage>
  );
}
