import type { CanvasElement } from "@/type";

export function createElement(type: CanvasElement["type"]): CanvasElement {
  const base = { id: crypto.randomUUID(), x: 100, y: 100, zIndex: 0 };

  switch (type) {
    case "text":
      return {
        ...base,
        type,
        width: 400,
        height: 100,
        text: "New Text",
        color: "#000000",
        fontSize: 48,
      };
    case "image":
      return { ...base, type, width: 400, height: 300, imageUrl: "" };
    case "button":
      return {
        ...base,
        type,
        width: 240,
        height: 80,
        label: "Button",
        actionId: "",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontSize: 32,
      };
  }
}
