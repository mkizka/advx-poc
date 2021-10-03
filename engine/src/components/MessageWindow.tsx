import { Graphics } from "@inlet/react-pixi";
import { Graphics as PIXIGraphics } from "@pixi/graphics";
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
        (g: PIXIGraphics) => {
          g.clear();
          g.lineStyle(2, 0xffffff, 0.8);
          g.beginFill(0xffffff, 0.1);
          g.drawRect(0, 0, width, height);
          g.endFill();
        },
        [width, height]
      )}
    />
  );
}
