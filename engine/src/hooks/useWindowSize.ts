import { useState, useEffect } from "react";
import { createContext } from "../utils/createContext";

function _useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const onResize = () => {
      requestAnimationFrame(() =>
        setSize([window.innerWidth, window.innerHeight])
      );
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
}

type WindowSize = ReturnType<typeof _useWindowSize>;

export const [WindowSizeContext, useWindowSize, WindowSizeProvider] =
  createContext<WindowSize>("WindowSize", _useWindowSize);

export type CommandProviderProps = {
  children: React.ReactNode;
};
