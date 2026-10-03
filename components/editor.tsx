"use client";

import useFitScale from "@/hooks/useFitScale";
import { Screen } from "@/type";
import CanvasItem from "./blocks/canvas-item";

function Editor({ screen }: { screen: Screen }) {
  const { ref, scale } = useFitScale(screen.width, screen.height);

  return (
    <div
      ref={ref}
      className="flex flex-1 items-center justify-center overflow-hidden px-30"
    >
      <div
        style={{ width: screen.width * scale, height: screen.height * scale }}
        className="box-content shrink-0 overflow-hidden rounded-md border bg-muted shadow-2xl"
      >
        <div
          style={{
            width: screen.width,
            height: screen.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          {screen.elements.map((el) => (
            <CanvasItem key={el.id} el={el} scale={scale} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Editor;
