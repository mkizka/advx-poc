import React, { useEffect } from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useMessage } from "../hooks/useMessage";
import { useChapter } from "../hooks/useChapter";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";

export function ScreenRenderer() {
  const [width, height] = useWindowSize();
  const message = useMessage();
  const chapter = useChapter();

  useEffect(() => {
    if (message.currentItem?.type == "Goto") {
      chapter.goto(message.currentItem.to);
    }
  }, [message.currentItem]);

  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        {message.currentItem?.type == "Text" &&
          message.currentItem.texts.map((text, i) => (
            <Text
              key={i}
              text={text.value}
              style={{ fill: "props" in text ? text.props?.color : "#fff" }}
            />
          ))}
        <MessageWindow
          width={width}
          height={height * 0.3}
          interactive={true}
          pointerdown={() => message.next()}
        />
      </Container>
    </Stage>
  );
}
