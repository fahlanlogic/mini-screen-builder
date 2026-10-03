import { useEffect, useRef, useState } from "react";

function useFitScale(canvasWidth: number, canvasHeight: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / canvasWidth, height / canvasHeight, 1));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [canvasWidth, canvasHeight]);

  return { ref, scale };
}

export default useFitScale;
