import React from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useMessage } from "../hooks/useMessage";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";

export function Screen() {
  const [width, height] = useWindowSize();
  const message = useMessage();
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
