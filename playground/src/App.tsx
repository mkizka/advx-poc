import React from "react";
import {
  Game,
  Senario,
  Style,
  Text,
  Chapter,
  useChapter,
  Action,
  Choice,
} from "@advx/engine";
import "./App.css";

function Senario1() {
  const chapter = useChapter();
  return (
    <Senario>
      <Text>{`プレーンテキスト1`}</Text>
      <Text>{`プレーンテキスト2`}</Text>
      <Choice choices={["選択肢1", "選択肢2"]} />
      <Text>{`プレーンテキスト3`}</Text>
      <Action action={() => chapter.goto("senario2")} />
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
