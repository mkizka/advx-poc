import ReactReconciler from "react-reconciler";
import { hostConfig } from "./hostconfig";
import { TopLevelNode } from "./types";

const ADVXFiber = ReactReconciler(hostConfig);

export function render(
  target: unknown,
  callback?: (container: TopLevelNode[]) => void
) {
  const container = ADVXFiber.createContainer([], 0, false, null);
  ADVXFiber.updateContainer(target, container, null);
  window.addEventListener("__ADVX_UPDATE__", () => {
    callback && callback(container.containerInfo);
  });
}

ADVXFiber.injectIntoDevTools({
  bundleType: 1,
  rendererPackageName: "@advx/engine",
  version: "1.0.0",
  // @ts-ignore
  findHostInstanceByFiber: ADVXFiber.findHostInstance,
});
