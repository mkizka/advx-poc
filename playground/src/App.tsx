import React, { useEffect, useState } from "react";
import { Game, Senario, Style, Text } from "@advx/engine";
import "./App.css";

function Chapter() {
  const [a, b] = useState(0);
  useEffect(() => {
    const c = setInterval(() => {
      console.log("updated");
      b(a + 1);
    }, 2000);
    return () => clearInterval(c);
  });
  return (
    <Senario>
      {Array.from({ length: (a % 2) + 1 }).map((_, i) => (
        <Text key={i}>{`プレーンテキスト${i}`}</Text>
      ))}
      <Text>
        <Style color="red">色付き</Style>テキスト
      </Text>
    </Senario>
  );
}
function App() {
  return (
    <Game>
      <Chapter />
    </Game>
  );
}

export default App;
