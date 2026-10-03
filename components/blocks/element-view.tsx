import { CanvasElement } from "@/type";
import React from "react";

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

export default ElementView;
