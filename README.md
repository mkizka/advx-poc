# advx
ADV + jsx

```jsx
import { Game} from "advx"

function App() {
  return (
    <Game>
      <SenarioRenderer>
        <Text>テキスト</Text>
      </SenarioRenderer>
      <ScreenRenderer>
        <MessageWindow />
      </ScreenRenderer>
    </Game>
  );
}
```
