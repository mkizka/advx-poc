import React, { useEffect, useState } from "react";
import { Game, Senario, Text } from "@advx/engine";
import "./App.css";

function App() {
  const [texts, setTexts] = useState(["a", "b"]);
  useEffect(() => {
    setTimeout(() => {
      console.log("changed");
      setTexts(["c", "d", "e"]);
    }, 2000);
  }, []);
  return (
    <Game>
      <Senario>
        {texts.map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </Senario>
    </Game>
  );
}

export default App;
