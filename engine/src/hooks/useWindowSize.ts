import { useState, useEffect } from "react";

export function useWindowSize() {
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
