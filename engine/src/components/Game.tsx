import React from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";

export function Game() {
  return (
    <Stage>
      <Container x={500}>
        <Text text="Hello World" />
      </Container>
    </Stage>
  );
}
