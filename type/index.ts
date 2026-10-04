export type BaseElement = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

export type TextElement = BaseElement & {
  type: "text";
  text: string;
  color: string;
  fontSize: number;
};

export type ImageElement = BaseElement & {
  type: "image";
  imageUrl: string;
};

export type ButtonElement = BaseElement & {
  type: "button";
  label: string;
  actionId: string;
  backgroundColor: string;
  color: string;
  fontSize: number;
};

export type CanvasElement = TextElement | ImageElement | ButtonElement;

export type Screen = {
  id: string;
  width: number;
  height: number;
  elements: CanvasElement[];
};
