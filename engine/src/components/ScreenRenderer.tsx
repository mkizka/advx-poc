import React, { useEffect, useState } from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useMessage } from "../hooks/useMessage";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { usePrompt } from "../hooks/usePrompt";

export function ScreenRenderer() {
  const [width, height] = useWindowSize();
  const prompt = usePrompt();
  const message = useMessage();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (message!.currentItem?.type == "Action") {
      message!.currentItem.action();
    }
  }, [message!.currentItem]);

  useAnimationFrame(() => {
    if (
      message!.currentItem?.type == "Text" &&
      index < message!.currentItem.message.length
    ) {
      setIndex(index + 1);
    }
  });

  const handleClick = () => {
    setIndex(0);
    message!.next();
  };

  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        {prompt!.isActive && (
          <Container x={width * 0.3} y={-height * 0.25}>
            <MessageWindow width={width * 0.4} height={height * 0.2} />
          </Container>
        )}
        {message!.currentItem?.type == "Text" && (
          <Text
            text={message!.currentItem.message.slice(0, index)}
            style={{
              wordWrap: true,
              wordWrapWidth: width,
              breakWords: true,
            }}
          />
        )}
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
