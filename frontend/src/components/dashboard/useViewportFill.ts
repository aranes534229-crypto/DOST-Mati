// components/dashboard/useViewportFill.ts
import { useLayoutEffect, useState, type RefObject } from "react";

interface ViewportFillOptions {
  /** Only fill the viewport at/above this width; below it the page scrolls. */
  minWidth?: number;
  /** Breathing room (px) left below the element. */
  bottomGap?: number;
}

/**
 * Measures the space between an element and the bottom of the viewport and
 * returns a max-height for it, so a dashboard can fill one screen without the
 * page scrolling. Returns `undefined` below `minWidth` (normal page scroll).
 */
export function useViewportFill<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { minWidth = 1024, bottomGap = 16 }: ViewportFillOptions = {},
): number | undefined {
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(`(min-width: ${minWidth}px)`);

    const measure = () => {
      const el = ref.current;
      if (!mql.matches || !el) {
        setHeight(undefined);
        return;
      }
      const top = el.getBoundingClientRect().top;
      setHeight(Math.max(0, window.innerHeight - top - bottomGap));
    };

    measure();
    mql.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      mql.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [minWidth, bottomGap, ref]);

  return height;
}
