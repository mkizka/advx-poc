import { Graphics } from "@inlet/react-pixi";
import { Graphics as PIXIGraphics } from "pixi.js";
import React from "react";

export type BasicWindowProps = {
  width: number;
  height: number;
} & React.ComponentProps<typeof Graphics>;

export function BasicWindow(props: BasicWindowProps) {
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
