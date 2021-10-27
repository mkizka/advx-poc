import React, { useEffect, useState } from "react";
import { Container, Text } from "@inlet/react-pixi";
import { useCommand } from "../../hooks/useCommand";
import { useWindowSize } from "../../hooks/useWindowSize";
import { BasicWindow, BasicWindowProps } from "./BasicWindow";
import { useChoice } from "../..";
import { ChoiceWindow } from "./ChoiceWindow";

export function MessageWindow() {
  const [width, height] = useWindowSize();
  const command = useCommand();
  const choice = useChoice();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (index < (command.currentText || "").length) {
      const timeoutId = setTimeout(() => {
        setIndex((index) => index + 1);
      }, 20);
      return () => clearTimeout(timeoutId);
    }
  }, [command.currentText, index]);

  useEffect(() => {
    setIndex(1);
  }, [command.currentText]);

  const handleClick = () => {
    if (choice.choices != null) return;
    if (command.currentText != null && index < command.currentText.length - 1) {
      setIndex(command.currentText.length);
    } else {
      command.next();
    }
  };

  return (
    <>
      {choice.choices != null && (
        <ChoiceWindow choices={choice.choices} onAnswer={choice.setAnswer} />
      )}
      <Container y={height - height * 0.3}>
        {command.currentText != null && (
          <Text
            text={command.currentText.slice(0, index)}
            style={{
              wordWrap: true,
              wordWrapWidth: width,
              breakWords: true,
              fill: "#fff",
            }}
          />
        )}
        <BasicWindow
          width={width}
          height={height * 0.3}
          interactive={true}
          pointerdown={handleClick}
        />
      </Container>
    </>
  );
}
