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

advx.render(
  <advx.story>
    <advx.chapter name="シナリオ1" scenario={Senario1}>
  </advx.story>
)
```

## API
### advx.render
ReactDOM.renderに渡す

### advx.story
chapterを登録する。react-routerみたいな感じ

### advx.chapter
シナリオコンポーネントに別名を与える
