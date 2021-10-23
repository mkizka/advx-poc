import React, { useEffect, useState } from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
import { useCommand } from "../hooks/useCommand";
import {
  useWindowSize,
  WindowSizeContext,
  WindowSizeProvider,
} from "../hooks/useWindowSize";
import { BasicWindow } from "./screen/BasicWindow";
import { useChoice } from "../hooks/useChoice";
import { ChoiceWindow } from "./screen/ChoiceWindow";
import { useContextBridge } from "../hooks/useContextBridge";
import { AssetLoader } from "./screen/AssetLoader";

const assets = [
  {
    name: "bunny",
    url: "https://pixijs.io/examples/examples/assets/bunny.png",
  },
];

function ScreenRendererInner() {
  const ContextBridge = useContextBridge(WindowSizeContext);
  const [width, height] = useWindowSize();
  const choice = useChoice();
  const command = useCommand();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (command.currentItem?.type == "Action") {
      command.currentItem.action();
    }
  }, [command.currentItem]);

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
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <ContextBridge>
        <AssetLoader assets={assets}>
          {choice.choices != null && (
            <ChoiceWindow
              choices={choice.choices}
              onAnswer={choice.setAnswer}
            />
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
        </AssetLoader>
      </ContextBridge>
    </Stage>
  );
}

export function ScreenRenderer() {
  return (
    <WindowSizeProvider>
      <ScreenRendererInner />
    </WindowSizeProvider>
  );
}
