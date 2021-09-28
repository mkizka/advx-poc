import React from "react";
import { Game, Senario, Style, Text, Chapter, Goto } from "@advx/engine";
import "./App.css";

function Senario1() {
  return (
    <Senario>
      <Text>{`プレーンテキスト1`}</Text>
      <Text>{`プレーンテキスト2`}</Text>
      <Text>{`プレーンテキスト3`}</Text>
      <Text>
        <Style color="red">色付き</Style>テキスト
      </Text>
      <Goto to="senario2" />
    </Senario>
  );
}
function Senario2() {
  return (
    <Senario>
      <Text>{`プレーンテキスト123`}</Text>
    </Senario>
  );
}

function App() {
  return (
    <Game>
      <Chapter senario={Senario1} />
      <Chapter name="senario2" senario={Senario2} />
    </Game>
  );
}

export default App;
