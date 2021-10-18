import React, { useEffect, useState } from "react";
import { Text, useApp } from "@inlet/react-pixi";
import { IAddOptions } from "pixi.js";

type AssetLoaderProps = {
  assets: IAddOptions[];
  children: React.ReactNode;
};

type LoadState = "ready" | "loading" | "complete";

export function AssetLoader({ assets, children }: AssetLoaderProps) {
  const app = useApp();
  const [loadState, setLoadState] = useState<LoadState>("ready");

  useEffect(() => {
    for (const asset of assets) {
      app.loader.add(asset);
    }
    setLoadState("loading");
    app.loader.load(() => setLoadState("complete"));
  }, []);

  useEffect(() => console.log(loadState), [loadState]);

  if (loadState != "complete") {
    return <Text text="loading..." style={{ fill: "#fff" }} />;
  }

  return <>{children}</>;
}
