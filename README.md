# advx
ADV + jsx

こんな感じにしたい
```jsx
import * as advx from "advx"

function Senario1() {
  return (
    <advx.scenario>
      <advx.t template="left">左に表示されるテキスト</advx.t>
      <advx.t template="big">大きく表示されるテキスト</advx.t>
    </advx.scenario>
  )
}

function Game() {
  return (
    <advx.game>
      <advx.chapter name="シナリオ1" scenario={Senario1} />
    </advx.game>
  )
}
```

## ライブラリの目的
- ノベルゲーム制作に必要なシナリオ部分をJavaScript(JSX)で記述出来るようにする
- 画面部分をReactで拡張できるようにする
