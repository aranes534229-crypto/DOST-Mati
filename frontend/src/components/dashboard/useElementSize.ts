// components/dashboard/useElementSize.ts
import { useLayoutEffect, useState, type RefObject } from "react";

interface ElementSize {
  width: number;
  height: number;
}

/**
 * Tracks an element's rendered size via ResizeObserver, so children that need a
 * concrete pixel height (e.g. an ApexCharts chart) can adapt when their flex
 * container grows or shrinks.
 */
export function useElementSize<T extends HTMLElement>(
  ref: RefObject<T | null>,
): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}
