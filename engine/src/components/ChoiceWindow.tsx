import React, { useMemo, useState } from "react";
import { Container, Graphics, Text } from "@inlet/react-pixi";
import { TextMetrics, TextStyle } from "@pixi/text";
import { MessageWindow } from "./MessageWindow";

export type ChoiceWindowProps = {
  x: number;
  y: number;
  choices: string[];
};

const fontSize = 26;
const padding = 13;
const style = new TextStyle({
  fontSize,
  fill: "#fff",
});

export function ChoiceWindow({ x, y, choices }: ChoiceWindowProps) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const maxWidth = useMemo(() => {
    const widths = choices.map(
      (choice) => TextMetrics.measureText(choice, style).width
    );
    return Math.max(...widths);
  }, [choices]);

  return (
    <Container x={x} y={y}>
      {choices.map((choice, i) => (
        <Text
          key={i}
          text={choice}
          y={i * (fontSize + padding)}
          style={style}
          interactive={true}
          pointerover={() => setHoverIndex(i)}
        />
      ))}
      <Graphics
        x={-padding / 2}
        y={-padding / 2}
        draw={(g) => {
          g.clear();
          g.beginFill(0xffffff, 0.1);
          g.drawRect(
            0,
            hoverIndex * (fontSize + padding),
            maxWidth + padding,
            fontSize + padding
          );
          g.endFill();
        }}
      />
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
