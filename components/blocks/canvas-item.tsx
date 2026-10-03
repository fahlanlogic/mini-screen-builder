import { useEditor } from "@/store/screen";
import { CanvasElement } from "@/type";
import { Rnd } from "react-rnd";
import ElementView from "./element-view";
import { useState } from "react";
import { useImagePicker } from "@/hooks/useImagePicker";

function CanvasItem({ el, scale }: { el: CanvasElement; scale: number }) {
  const update = useEditor((s) => s.updateElement);
  const select = useEditor((s) => s.selectElement);
  const isSelected = useEditor((s) => s.selectedId === el.id);
  const [editing, setEditing] = useState(false);

  const { open } = useImagePicker((url) => update(el.id, { imageUrl: url }));

  const stopEditing = () => setEditing(false);

  return (
    <Rnd
      className="canvas-item"
      scale={scale}
      bounds="parent"
      size={{ width: el.width, height: el.height }}
      position={{ x: el.x, y: el.y }}
      style={{
        zIndex: el.zIndex,
        outline: isSelected ? "2px solid #3b82f6" : "none",
      }}
      onMouseDown={() => select(el.id)}
      onDragStop={(_, d) =>
        update(el.id, { x: Math.round(d.x), y: Math.round(d.y) })
      }
      onResizeStop={(_, __, ref, ___, pos) =>
        update(el.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: Math.round(pos.x),
          y: Math.round(pos.y),
        })
      }
    >
      {editing && el.type === "text" && (
        <textarea
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
          value={el.text}
          onChange={(e) => update(el.id, { text: e.target.value })}
          onBlur={stopEditing}
          onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
          style={{
            width: "100%",
            height: "100%",
            color: el.color,
            fontSize: el.fontSize,
            fontFamily: "inherit",
            lineHeight: "inherit",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            padding: 0,
            margin: 0,
            overflow: "hidden",
          }}
        />
      )}

      {editing && el.type === "button" && (
        <input
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
          value={el.label}
          onChange={(e) => update(el.id, { label: e.target.value })}
          onBlur={stopEditing}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") e.currentTarget.blur();
          }}
          className="h-full w-full rounded-md bg-primary text-center text-primary-foreground outline-none"
        />
      )}

      {!editing && (
        <div
          className="h-full w-full"
          onDoubleClick={() =>
            el.type === "image" ? open() : setEditing(true)
          }
        >
          <ElementView el={el} />
        </div>
      )}
    </Rnd>
  );
}

export default CanvasItem;
