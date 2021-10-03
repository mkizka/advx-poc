import { HostConfig } from "./types";

export const hostConfig: HostConfig = {
  now: Date.now,
  supportsMutation: true, //ok
  supportsPersistence: false,
  createInstance(type, props) {
    const { children, ..._props } = props;
    switch (type) {
      case "Text":
        return { type, message: children, ..._props };
      case "Action":
        return { type, ..._props };
      default:
        throw new Error(`<${type} />はサポートしていません`);
    }
  },
  createTextInstance(text) {
    return text;
  },
  appendInitialChild(command, child) {
    //
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
    return type == "Text";
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
    return null;
  },
  resetAfterCommit() {
    window.dispatchEvent(new CustomEvent("__ADVX_UPDATE__"));
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
    if (typeof child == "string") {
      throw new Error("文字列を最上位の要素には出来ません");
    }
    container.push(child);
  },
  removeChildFromContainer(container, child) {
    const index = container.indexOf(child);
    container = container.splice(index, 1);
  },
  insertInContainerBefore(container, child, beforeChild) {
    if (typeof child == "string") {
      throw new Error("文字列を最上位の要素には出来ません");
    }
    const index = container.indexOf(beforeChild);
    container = container.splice(index, 0, child);
  },
  commitTextUpdate(text, _, newText) {
    text = newText;
  },
  cancelTimeout: clearTimeout, // clearTimeoutのプロキシ
  noTimeout: -1, // timeoutIDになりえない値
  isPrimaryRenderer: false, //ok
  supportsHydration: false, //ok
};
