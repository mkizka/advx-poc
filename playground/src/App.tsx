import React from "react";
import { Game, Senario, Text } from "@advx/engine";
import "./App.css";

function App() {
  return (
    <Game>
      <Senario>
        <Text>テキスト1</Text>
        <Text>テキスト2</Text>
      </Senario>
    </Game>
  );
}

export default App;
