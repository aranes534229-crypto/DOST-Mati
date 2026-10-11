import { useEffect, useState } from "react";

export function useChartMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return mounted;
}
