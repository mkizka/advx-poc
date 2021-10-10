import ReactReconciler from "react-reconciler";
import { hostConfig } from "./hostconfig";

export const ADVXFiber = ReactReconciler(hostConfig);

ADVXFiber.injectIntoDevTools({
  bundleType: 1,
  rendererPackageName: "@advx/engine",
  version: "1.0.0",
  // @ts-ignore
  findHostInstanceByFiber: ADVXFiber.findHostInstance,
});
