import React, { ReactPropTypes, useEffect, useRef, useState } from "react";
import { Stage, Container, Text, Graphics } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { render } from "../renderer";

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const onResize = () => {
      requestAnimationFrame(() =>
        setSize([window.innerWidth, window.innerHeight])
      );
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
}

function Test() {
  const String = "string";
  return (
    <Text>
      te<Text>s</Text>t{/* @ts-ignore */}
      <String />
    </Text>
  );
}

function useText(texts: string[]): [string, () => void] {
  const [currentText, setCurrentText] = useState(texts[0]);
  const index = useRef(0);
  const nextText = () => {
    index.current += 1;
    setCurrentText(texts[index.current]);
  };
  return [currentText, nextText];
}

type MessageWindowProps = {
  width: number;
  height: number;
} & React.ComponentProps<typeof Graphics>;

function MessageWindow(props: MessageWindowProps) {
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

export function Game() {
  const [width, height] = useWindowSize();
  const [text, nextText] = useText(["first text", "second text"]);
  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        <Text text={text} style={new TextStyle({ fill: "#fff" })} />
        <MessageWindow
          width={width}
          height={height * 0.3}
          interactive={true}
          pointerdown={() => nextText()}
        />
      </Container>
    </Stage>
  );
}
