import { Graphics } from "@inlet/react-pixi";
import React from "react";

export type MessageWindowProps = {
  width: number;
  height: number;
} & React.ComponentProps<typeof Graphics>;

export function MessageWindow(props: MessageWindowProps) {
  const { width, height, ...graphicsProps } = props;
  return (
    <Graphics
      {...graphicsProps}
      draw={React.useCallback(
        (g) => {
          g.clear();
          g.lineStyle(2, 0xffffff, 0.8);
          g.beginFill(0xffffff, 0.1);
          g.drawRoundedRect(0, 0, width, height, 15);
          g.endFill();
        },
        [width, height]
      )}
    />
  );
}
