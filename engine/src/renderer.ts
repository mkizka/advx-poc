import ReactReconciler from "react-reconciler";

type Type = any;
type Props = any;
type Container = any;
type Instance = any;
type TextInstance = any;
type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = any;

type HostConfig = ReactReconciler.HostConfig<
  Type,
  Props,
  Container,
  Instance,
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
  supportsMutation: false, //ok
  supportsPersistence: false,
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: any
  ) {
    return arguments;
  },
  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: any
  ) {
    throw new Error("Function not implemented.");
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance) {
    throw new Error("Function not implemented.");
  },
  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext
  ) {
    throw new Error("Function not implemented.");
  },
  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext
  ) {
    throw new Error("Function not implemented.");
  },
  shouldSetTextContent(type: Type, props: Props) {
    return true;
  },
  getRootHostContext(rootContainer: Container) {
    return null;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    _type: Type,
    _rootContainer: Container
  ) {
    return parentHostContext;
  },
  getPublicInstance(instance: Instance | TextInstance) {
    throw new Error("Function not implemented.");
  },
  prepareForCommit(containerInfo: Container) {
    return null;
  },
  resetAfterCommit(containerInfo: Container) {
    // noop
  },
  preparePortalMount(containerInfo: Container) {
    throw new Error("Function not implemented.");
  },
  scheduleTimeout(fn: (...args: unknown[]) => unknown, delay?: number) {
    throw new Error("Function not implemented.");
  },
  cancelTimeout: clearTimeout, // clearTimeoutのプロキシ
  noTimeout: -1, // timeoutIDになりえない値
  isPrimaryRenderer: false, //ok
  supportsHydration: false, //ok
};
const ReactReconcilerInst = ReactReconciler(hostConfig);

export function render(reactElement: any, domElement: any, callback: any) {
  console.log(arguments);
  // Create a root Container if it doesnt exist
  if (!domElement._rootContainer) {
    // @ts-ignore
    domElement._rootContainer = ReactReconcilerInst.createContainer(
      domElement,
      false
    );
  }

  // update the root Container
  return ReactReconcilerInst.updateContainer(
    reactElement,
    domElement._rootContainer,
    null,
    callback
  );
}
