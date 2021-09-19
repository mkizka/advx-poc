import React, { ReactPropTypes, useEffect, useRef, useState } from "react";
import { Stage, Container, Text, Graphics } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { render } from "../renderer";
import {
  SenarioContext,
  SenarioProvider,
  useSenario,
} from "../hooks/useSenario";

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

function Display() {
  const [width, height] = useWindowSize();
  const senario = useSenario();
  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        <Text
          text={senario.currentText}
          style={new TextStyle({ fill: "#fff" })}
        />
        <MessageWindow
          width={width}
          height={height * 0.3}
          interactive={true}
          pointerdown={() => senario.nextText()}
        />
      </Container>
    </Stage>
  );
}

export function Game() {
  return (
    <SenarioProvider>
      <Display />
    </SenarioProvider>
  );
}
