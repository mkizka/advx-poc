import React, { useEffect, useState } from "react";
import { Stage, Container, Text } from "@inlet/react-pixi";
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
  const [text, setText] = useState("test");
  console.log(text);
  useEffect(() => {
    setTimeout(() => {
      setText("1s passed");
    }, 1000);
  }, []);
  return <Text>{text}</Text>;
}

export function Game() {
  const [width, height] = useWindowSize();
  useEffect(() => {
    render(<Test />);
  }, []);
  return (
    <Stage width={width} height={height} options={{ resizeTo: window }}>
      <Container y={height - height * 0.3}>
        <Text text="Hello World" style={new TextStyle({ fill: "#fff" })} />
      </Container>
    </Stage>
  );
}
