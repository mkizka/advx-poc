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
    throw new Error("Function not implemented.");
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
  cancelTimeout: clearTimeout, // clearTimeoutのプロキシ
  noTimeout: -1, // timeoutIDになりえない値
  isPrimaryRenderer: true, //ok
  supportsHydration: false, //ok
};
const ReactReconcilerInst = ReactReconciler(hostConfig);

export function render(target: any) {
  const containerInfo = new Node("root");
  const container = ReactReconcilerInst.createContainer(
    containerInfo,
    0,
    false,
    null
  );
  return ReactReconcilerInst.updateContainer(target, container, null, () =>
    console.log(containerInfo)
  );
}
