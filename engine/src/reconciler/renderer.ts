import type { ReactNode } from "react";
import ReactReconciler from "react-reconciler";
import { hostConfig } from "./hostconfig";
import { TopLevelNode } from "./types";

const ADVXFiber = ReactReconciler(hostConfig);

export function render(
  target: ReactNode,
  callback?: (container: TopLevelNode[]) => void
) {
  const container = ADVXFiber.createContainer([], 0, false, null);
  const handleUpdate = () => {
    callback && callback(container.containerInfo);
  };
  window.addEventListener("__ADVX_UPDATE__", handleUpdate);
  ADVXFiber.updateContainer(target, container, null);
  return () => {
    window.removeEventListener("__ADVX_UPDATE__", handleUpdate);
    ADVXFiber.updateContainer(null, container, null);
  };
}

ADVXFiber.injectIntoDevTools({
  bundleType: 1,
  rendererPackageName: "@advx/engine",
  version: "1.0.0",
  // @ts-ignore
  findHostInstanceByFiber: ADVXFiber.findHostInstance,
});
