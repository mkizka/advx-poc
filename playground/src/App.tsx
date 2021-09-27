import React, { useEffect } from "react";
import { Game, Senario, Style, Text, Chapter, useChapter } from "@advx/engine";
import "./App.css";

function Senario1() {
  const chapter = useChapter();
  useEffect(() => {
    setTimeout(() => {
      chapter.goto("senario2");
    }, 2000);
  }, []);
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
