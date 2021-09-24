import React from "react";
import { Game, Senario, Style, Text } from "@advx/engine";
import "./App.css";

function App() {
  return (
    <Game>
      <Senario>
        <Text>テキスト1</Text>
        <Text>テキスト2</Text>
        <Text>テキスト3</Text>
        <Text>
          <Style color="red">色付き</Style>テキスト
        </Text>
      </Senario>
    </Game>
  );
}

export default App;
