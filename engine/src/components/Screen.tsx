import React from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useSenario } from "../hooks/useSenario";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";

export function Screen() {
  const [width, height] = useWindowSize();
  const senario = useSenario();
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
