"use client";

import { useEditor } from "@/store/screen";
import { Button } from "../ui/button";
import { IconClick, IconCursorText, IconPolaroid } from "@tabler/icons-react";
import { createElement } from "@/lib/create-element";
import { useImagePicker } from "@/hooks/useImagePicker";
import { ImageElement } from "@/type";

function Toolbar() {
  const addElement = useEditor((s) => s.addElement);

  const { open: openImagePicker } = useImagePicker((url) => {
    const el = createElement("image") as ImageElement;
    addElement({ ...el, imageUrl: url });
  });

  return (
    <nav className="bg-primary absolute rounded-full px-2 py-1 top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
      <Button
        size="icon"
        className="hover:text-primary-foreground/50"
        onClick={() => addElement(createElement("text"))}
      >
        <IconCursorText stroke={2} />
      </Button>
      <Button
        size="icon"
        className="hover:text-primary-foreground/50"
        onClick={openImagePicker}
      >
        <IconPolaroid stroke={2} />
      </Button>
      <Button
        size="icon"
        className="hover:text-primary-foreground/50"
        onClick={() => addElement(createElement("button"))}
      >
        <IconClick stroke={2} />
      </Button>
    </nav>
  );
}

export default Toolbar;
