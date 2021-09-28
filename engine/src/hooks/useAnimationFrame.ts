import { useRef, useCallback, useEffect } from "react";

// https://bom-shibuya.hatenablog.com/entry/2020/10/27/182226
export function useAnimationFrame(callback: () => Promise<void> | void) {
  const requestRef = useRef<number>();

  const animate = useCallback(async () => {
    await callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        return cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}
