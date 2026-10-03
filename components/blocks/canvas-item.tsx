import { useEditor } from "@/store/screen";
import { CanvasElement } from "@/type";
import { Rnd } from "react-rnd";

function CanvasItem({ el, scale }: { el: CanvasElement; scale: number }) {
  const update = useEditor((s) => s.updateElement);
  const select = useEditor((s) => s.selectElement);

  return (
    <Rnd
      scale={scale}
      bounds="parent"
      size={{ width: el.width, height: el.height }}
      position={{ x: el.x, y: el.y }}
      style={{ zIndex: el.zIndex }}
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
      <ElementView el={el} />
    </Rnd>
  );
}

function ElementView({ el }: { el: CanvasElement }) {
  switch (el.type) {
    case "text":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            color: el.color,
            fontSize: el.fontSize,
            overflow: "hidden",
            whiteSpace: "pre-wrap",
          }}
        >
          {el.text}
        </div>
      );

    case "image":
      return (
        <img
          src={el.imageUrl}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );

    case "button":
      return (
        <button
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          className="rounded-md bg-primary text-primary-foreground"
        >
          {el.label}
        </button>
      );
  }
}

export default CanvasItem;
