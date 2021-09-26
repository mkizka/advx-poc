import ReactReconciler from "react-reconciler";

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = any;

/*
container = [
  {
    type: "Text",
    texts: [
      {type: "_text", value: "色なしテキスト"},
      {type: "Style", value: "色付きテキスト", color: "red"}
    ],
  }
  {
    type: "Goto",
    to: "チャプター2"
  }
]
*/
type ADVXNode = TextNode | StyleTextNode | GotoNode;

type TopLevelNode = TextNode | GotoNode;
type LowLevelNode = PlainTextNode | StyleTextNode;

type TextNode = {
  type: "Text";
  texts: LowLevelNode[];
};

type PlainTextNode = {
  type: "Plain";
  value: string;
};

type StyleTextNode = {
  type: "Style";
  value: string;
  props: any;
};

type GotoNode = {
  type: "Goto";
  to: string;
};

type HostConfig = ReactReconciler.HostConfig<
  ADVXNode["type"], // Type
  any, // Props
  TopLevelNode[], // Container
  ADVXNode, // Instance
  PlainTextNode, // TextInstance
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>;

const hostConfig: HostConfig = {
  now: Date.now,
  supportsMutation: true, //ok
  supportsPersistence: false,
  createInstance(type, props) {
    const { children, _props } = props;
    switch (type) {
      case "Style":
        console.assert(
          typeof children == "string",
          "Styleの子要素は文字列である必要があります"
        );
        return { type, value: children, ..._props };
      case "Text":
        return { type, texts: [], ..._props };
      default:
        throw new Error(`<${type} />はサポートしていません`);
    }
  },
  createTextInstance(text) {
    return { type: "Plain", value: text };
  },
  appendInitialChild(node, child) {
    if (
      node.type == "Text" &&
      (child.type == "Plain" || child.type == "Style")
    ) {
      node.texts.push(child);
    } else {
      throw new Error(
        "appendInitialChildが未対応な状況で呼ばれました" +
          JSON.stringify(arguments)
      );
    }
  },
  finalizeInitialChildren() {
    // 必要なければfalseを返す
    return false;
  },
  prepareUpdate() {
    // 必要なければnullを返す？
    return null;
  },
  shouldSetTextContent(type, props) {
    // trueなら子要素に対してcreateTextInstanceやappendInitialChildが呼ばれない？
    return type == "Style";
  },
  getRootHostContext() {
    // 必要なければnullを返す
    return null;
  },
  getChildHostContext(parentHostContext) {
    // 必要なければparentHostContextを返す
    return parentHostContext;
  },
  getPublicInstance(instance) {
    // 必要なければinstanceを返す
    return instance;
  },
  prepareForCommit() {
    // 必要なければnullを返す
    return null;
  },
  resetAfterCommit() {
    // 必要なければ空白
  },
  preparePortalMount() {
    throw new Error("Function not implemented.");
  },
  scheduleTimeout() {
    throw new Error("Function not implemented.");
  },
  clearContainer() {
    // 必要なければ空白
  },
  appendChildToContainer(container, child) {
    if (child.type == "Plain" || child.type == "Style") {
      throw new Error("文字列やStyle要素を最上位の要素には出来ません");
    }
    container.push(child);
  },
  removeChildFromContainer(container, child) {
    const index = container.indexOf(child);
    container = container.splice(index, 1);
  },
  insertInContainerBefore(container, child, beforeChild) {
    if (child.type == "Plain" || child.type == "Style") {
      throw new Error("文字列やStyle要素を最上位の要素には出来ません");
    }
    const index = container.indexOf(beforeChild);
    container = container.splice(index - 1, 0, child);
  },
  commitTextUpdate(node, _, newText) {
    node.value = newText;
  },
  cancelTimeout: clearTimeout, // clearTimeoutのプロキシ
  noTimeout: -1, // timeoutIDになりえない値
  isPrimaryRenderer: false, //ok
  supportsHydration: false, //ok
};

const ADVXFiber = ReactReconciler(hostConfig);

export function render(target: any, callback?: (root: Node) => void) {
  const container = ADVXFiber.createContainer([], 0, false, null);
  ADVXFiber.updateContainer(target, container, null);
  setInterval(() => {
    console.log(JSON.stringify(container.containerInfo, null, 2));
  }, 2000);
}

ADVXFiber.injectIntoDevTools({
  bundleType: 1,
  rendererPackageName: "@advx/engine",
  version: "1.0.0",
  // @ts-ignore
  findHostInstanceByFiber: ADVXFiber.findHostInstance,
});
