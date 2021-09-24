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
        {message.currentItems.map((item, i) => (
          <Text
            key={i}
            text={item.text}
            style={{ fill: item.props?.color || "#fff" }}
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
