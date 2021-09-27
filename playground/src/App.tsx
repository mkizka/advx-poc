import React from "react";
import { Game, Senario, Style, Text } from "@advx/engine";
import "./App.css";

function Chapter() {
  return (
    <Senario>
      <Text>{`プレーンテキスト1`}</Text>
      <Text>{`プレーンテキスト2`}</Text>
      <Text>{`プレーンテキスト3`}</Text>
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
