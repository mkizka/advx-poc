import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Container,
  Text as PixiText,
  Graphics,
} from "@inlet/react-pixi";
import { render } from "../renderer";
import { SenarioContext, useSenario } from "../hooks/useSenario";
import { useContextBridge } from "../hooks/useContextBridge";

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
        <PixiText text={senario.currentText} style={{ fill: "#fff" }} />
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

export type GameProps = {
  children: React.ReactNode;
};

function useText(texts: string[]): [string, () => void] {
  const [currentText, setCurrentText] = useState(texts[0]);
  const index = useRef(0);
  const nextText = () => {
    index.current += 1;
    setCurrentText(texts[index.current]);
  };
  return [currentText, nextText];
}

type SenarioRendererProps = {
  children: React.ReactNode;
};

function SenarioRenderer({ children }: SenarioRendererProps) {
  const ContextBridge = useContextBridge(SenarioContext);
  useEffect(() => {
    render(<ContextBridge>{children}</ContextBridge>);
  }, []);
  return null;
}

export function Game({ children }: GameProps) {
  const [currentText, nextText] = useText(["first", "second"]);
  return (
    <SenarioContext.Provider value={{ currentText, nextText }}>
      <Display />
      <SenarioRenderer>{children}</SenarioRenderer>
    </SenarioContext.Provider>
  );
}
