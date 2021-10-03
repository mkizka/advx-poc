import React, { useEffect, useState } from "react";
import { Stage, Container, Text, Graphics } from "@inlet/react-pixi";
import { useCommand } from "../hooks/useCommand";
import { useWindowSize } from "../hooks/useWindowSize";
import { MessageWindow } from "./MessageWindow";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useChoice } from "../hooks/useChoice";
import { ChoiceWindow } from "./ChoiceWindow";

export function ScreenRenderer() {
  const [width, height] = useWindowSize();
  const choice = useChoice();
  const command = useCommand();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (command.currentItem?.type == "Action") {
      command.currentItem.action();
    }
  }, [command.currentItem]);

  useAnimationFrame(() => {
    if (
      command.currentItem?.type == "Text" &&
      index < command.currentItem.message.length
    ) {
      setIndex(index + 1);
    }
  });

  const handleClick = () => {
    setIndex(0);
    command.next();
  };

  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        {choice.choices != null && (
          <ChoiceWindow
            x={width * 0.3}
            y={-height * 0.25}
            choices={choice.choices}
          />
        )}
        {command.currentItem?.type == "Text" && (
          <Text
            text={command.currentItem.message.slice(0, index)}
            style={{
              wordWrap: true,
              wordWrapWidth: width,
              breakWords: true,
              fill: "#fff",
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
