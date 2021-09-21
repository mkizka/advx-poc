import React from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useMessage } from "../hooks/useMessage";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";

export function Screen() {
  const [width, height] = useWindowSize();
  const senario = useMessage();
  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        <Text text={senario.currentText} style={{ fill: "#fff" }} />
        <MessageWindow
          width={width}
          height={height * 0.3}
          interactive={true}
          pointerdown={() => senario.nextText()}
        />
      </Container>
    </Stage>
  );
}
