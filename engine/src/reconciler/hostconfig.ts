import { HostConfig } from "./types";

// https://github.com/jiayihu/react-tiny-dom/blob/8bc2a23/renderer/tiny-dom.js
function shallowDiff<T extends { [key: string]: any }>(oldObj: T, newObj: T) {
  const uniqueProps = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
  const changedProps = Array.from(uniqueProps).filter(
    (propName) => oldObj[propName] !== newObj[propName]
  );
  return changedProps;
}

export const hostConfig: HostConfig = {
  now: Date.now,
  supportsMutation: true, //ok
  supportsPersistence: false,
  createInstance(type, props) {
    const { children, ..._props } = props;
    switch (type) {
      case "Text":
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
  finalizeInitialChildren(instance, _, props) {
    if (instance.type == "Text") {
      instance.message = [...props.children].join("");
    }
    return false;
  },
  prepareUpdate(_instance, _type, oldProps, newProps) {
    return shallowDiff(oldProps, newProps);
  },
  commitUpdate(instance, updatePayload, _type, _oldProps, nextProps) {
    // TODO:型を治す
    updatePayload.forEach((propName: keyof typeof instance) => {
      instance[propName] = nextProps[propName];
    });
  },
  shouldSetTextContent(type) {
    // trueなら子要素に対してcreateTextInstanceやappendInitialChildが呼ばれない？
    return type == "Text";
  },
  resetTextContent(instance) {
    if (instance.type == "Text") {
      instance.message = "";
    }
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
