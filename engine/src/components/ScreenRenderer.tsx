import React from "react";
import { Stage } from "@inlet/react-pixi";
import { AssetLoader } from "./screen/AssetLoader";
import { useWindowSize, WindowSizeContext } from "../hooks/useWindowSize";
import { useContextBridge } from "../hooks/useContextBridge";
import { ChoiceContext } from "../hooks/useChoice";
import { CommandContext } from "../hooks/useCommand";

const assets = [
  {
    name: "bunny",
    url: "https://pixijs.io/examples/examples/assets/bunny.png",
  },
];

type ScreenRendererProps = {
  children?: React.ReactNode;
};

export function ScreenRenderer({ children }: ScreenRendererProps) {
  const ContextBridge = useContextBridge(
    CommandContext,
    ChoiceContext,
    WindowSizeContext
  );
  const [width, height] = useWindowSize();
  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <ContextBridge>
        <AssetLoader assets={assets}>{children}</AssetLoader>
      </ContextBridge>
    </Stage>
  );
}
