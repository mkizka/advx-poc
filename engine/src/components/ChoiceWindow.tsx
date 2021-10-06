import React, { useMemo, useState } from "react";
import { Container, Graphics, Text } from "@inlet/react-pixi";
import { TextMetrics, TextStyle } from "@pixi/text";
import { MessageWindow } from "./MessageWindow";
import { useWindowSize } from "../hooks/useWindowSize";

export type ChoiceWindowProps = {
  choices: string[];
  onAnswer: (answer: string) => void;
};

const fontSize = 26;
const padding = 13;
const style = new TextStyle({
  fontSize,
  fill: "#fff",
});

export function ChoiceWindow({ choices, onAnswer }: ChoiceWindowProps) {
  const [width, height] = useWindowSize();
  const [hoverIndex, setHoverIndex] = useState(0);

  const maxWidth = useMemo(() => {
    const widths = choices.map(
      (choice) => TextMetrics.measureText(choice, style).width
    );
    return Math.max(...widths);
  }, [choices]);

  return (
    <Container
      x={width / 2 - maxWidth / 2}
      y={height / 2 - (choices.length * fontSize) / 2}
    >
      {choices.map((choice, i) => (
        <React.Fragment key={i}>
          <Text
            key={i}
            text={choice}
            y={i * (fontSize + padding)}
            style={style}
          />
          <Graphics
            x={-padding / 2}
            y={-padding / 2}
            draw={(g) => {
              g.clear();
              // 透明にするとpointerイベントが発火しない？
              g.beginFill(0xffffff, hoverIndex == i ? 0.1 : 0.01);
              g.drawRect(
                0,
                i * (fontSize + padding),
                maxWidth + padding,
                fontSize + padding
              );
              g.endFill();
            }}
            interactive={true}
            pointerover={() => setHoverIndex(i)}
            pointerdown={() => onAnswer(choices[i])}
          />
        </React.Fragment>
      ))}
      <MessageWindow
        x={-padding}
        y={-padding}
        width={maxWidth + padding * 2}
        height={
          choices.length * fontSize +
          padding * 2 +
          padding * (choices.length - 1)
        }
      />
    </Container>
  );
}
