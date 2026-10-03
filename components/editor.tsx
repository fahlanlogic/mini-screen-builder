"use client";

import useFitScale from "@/hooks/useFitScale";
import { Screen } from "@/type";
import CanvasItem from "./blocks/canvas-item";
import Toolbar from "./blocks/toolbar";
import { useEditor } from "@/store/screen";

function Editor({ screen }: { screen: Screen }) {
  const { ref, scale } = useFitScale(screen.width, screen.height);
  const select = useEditor((s) => s.selectElement);

  return (
    <div
      className="relative flex flex-1 items-center justify-center"
      onMouseDown={(e) => {
        if (!(e.target as HTMLElement).closest(".canvas-item")) select(null);
      }}
    >
      <Toolbar />
      <div ref={ref} className="overflow-hidden px-30">
        <div
          style={{ width: screen.width * scale, height: screen.height * scale }}
          className="box-content shrink-0 overflow-hidden rounded-2xl border bg-secondary shadow-2xl"
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
    </div>
  );
}

export default Editor;
