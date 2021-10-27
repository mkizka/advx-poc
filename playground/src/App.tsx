import {
  Game,
  Senario,
  Text,
  Chapter,
  Branch,
  Choice,
  useChoice,
  Goto,
  Action,
  SenarioRenderer,
  ScreenRenderer,
  MessageWindow,
} from "@advx/engine";
import "./App.css";

function Senario1() {
  const choice = useChoice();
  return (
    <Senario>
      <Text>{`プレーンテキスト1`}</Text>
      <Text>{`プレーンテキスト2`}</Text>
      <Choice choices={["選択肢1", "選択肢2", "選択肢33333333"]} />
      <Branch if={choice.answer == "選択肢1"}>
        <Text>選択肢1が選ばれました</Text>
      </Branch>
      <Branch if={choice.answer == "選択肢2"}>
        <Text>選択肢2が選ばれました</Text>
      </Branch>
      <Branch if={choice.answer == "選択肢33333333"}>
        <Text>{choice.answer}が選ばれました</Text>
      </Branch>
      <Text>{`プレーンテキスト3`}</Text>
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
      <SenarioRenderer>
        <Chapter senario={Senario1} />
        <Chapter name="senario2" senario={Senario2} />
      </SenarioRenderer>
      <ScreenRenderer>
        <MessageWindow />
      </ScreenRenderer>
    </Game>
  );
}

export default App;
