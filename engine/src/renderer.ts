import ReactReconciler from "react-reconciler";

type Type = string;
type Props = any;
type TextInstance = string;
type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = any;

class Node {
  constructor(public type: string, public children?: (Node | string)[]) {
    this.children = children || [];
  }
  appendChild(child: Node | string) {
    this.children.push(child);
  }
  removeChild(child: Node | string) {
    if (typeof child == "string") {
      this.children = [];
    } else {
      this.children = this.children.filter((item) => item !== child);
    }
  }
}

type HostConfig = ReactReconciler.HostConfig<
  Type,
  Props,
  Node,
  Node,
  TextInstance,
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
  createInstance(type) {
    console.log(arguments);
    return new Node(type);
  },
  createTextInstance(text) {
    return text;
  },
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren() {
    // 必要なければfalseを返す
    return false;
  },
  prepareUpdate() {
    return null;
  },
  shouldSetTextContent(type) {
    return false;
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
    container.appendChild(child);
  },
  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance = newText;
  },
  cancelTimeout: clearTimeout, // clearTimeoutのプロキシ
  noTimeout: -1, // timeoutIDになりえない値
  isPrimaryRenderer: false, //ok
  supportsHydration: false, //ok
};

const ADVXFiber = ReactReconciler(hostConfig);

export function render(target: any) {
  const containerInfo = new Node("root");
  const container = ADVXFiber.createContainer(containerInfo, 0, false, null);
  ADVXFiber.updateContainer(target, container, null, () => {
    console.log(containerInfo);
  });
}
