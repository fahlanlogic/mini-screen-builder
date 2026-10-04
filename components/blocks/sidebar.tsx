import { useEditor } from "@/store/screen";
import { Button } from "../ui/button";
import {
  IconLayersSelected,
  IconLayersSelectedBottom,
  IconTrash,
} from "@tabler/icons-react";
import { CanvasElement } from "@/type";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

function Sidebar() {
  const selected = useEditor(
    (s) => s.screen?.elements.find((el) => el.id === s.selectedId) ?? null,
  );
  const update = useEditor((s) => s.updateElement);
  const remove = useEditor((s) => s.deleteElement);
  const bringToFront = useEditor((s) => s.bringToFront);
  const sendToBack = useEditor((s) => s.sendToBack);

  if (!selected) {
    return (
      <aside
        data-keep-selection
        className="absolute w-32 space-y-4 rounded-2xl p-4 bg-muted z-10 left-6 top-1/2 -translate-y-1/2 shadow-md min-h-72 flex items-center text-center"
      >
        Select element first
      </aside>
    );
  }

  const set = (patch: Partial<CanvasElement>) => update(selected.id, patch);
  const num =
    (key: "fontSize" | "x" | "y" | "width" | "height") =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      set({ [key]: Number(e.target.value) });

  return (
    <aside
      data-keep-selection
      className="absolute w-32 space-y-4 rounded-2xl p-4 bg-muted z-10 left-6 top-1/2 -translate-y-1/2 shadow-md"
    >
      {(selected.type === "text" || selected.type === "button") && (
        <>
          <Field>
            <FieldLabel htmlFor="color">Color</FieldLabel>
            <Input
              id="color"
              name="color"
              type="color"
              value={selected.color}
              onChange={(e) => set({ color: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="fontSize">Font size</FieldLabel>
            <Input
              id="fontSize"
              name="fontSize"
              type="number"
              min="0"
              value={selected.fontSize}
              onChange={num("fontSize")}
            />
          </Field>
        </>
      )}

      {selected.type === "button" && (
        <>
          <Field>
            <FieldLabel htmlFor="backgroundColor">Background color</FieldLabel>
            <Input
              id="backgroundColor"
              name="backgroundColor"
              type="color"
              value={selected.backgroundColor}
              onChange={(e) => set({ backgroundColor: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="actionId">Action ID</FieldLabel>
            <Input
              id="actionId"
              name="actionId"
              value={selected.actionId}
              onChange={(e) => set({ actionId: e.target.value })}
            />
          </Field>
        </>
      )}

      <Field>
        <FieldLabel htmlFor="x">x</FieldLabel>
        <Input
          id="x"
          name="x"
          type="number"
          min="0"
          value={selected.x}
          onChange={num("x")}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="y">y</FieldLabel>
        <Input
          id="y"
          name="y"
          type="number"
          min="0"
          value={selected.y}
          onChange={num("y")}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="width">width</FieldLabel>
        <Input
          id="width"
          name="width"
          type="number"
          min="0"
          value={selected.width}
          onChange={num("width")}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="height">height</FieldLabel>
        <Input
          id="height"
          name="height"
          type="number"
          min="0"
          value={selected.height}
          onChange={num("height")}
        />
      </Field>

      <div className="w-full flex gap-2">
        <Button
          variant="outline"
          title="Bring to front"
          onClick={() => bringToFront(selected.id)}
        >
          <IconLayersSelected stroke={2} />
        </Button>
        <Button
          variant="outline"
          title="Send to back"
          onClick={() => sendToBack(selected.id)}
        >
          <IconLayersSelectedBottom stroke={2} />
        </Button>
      </div>

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => remove(selected.id)}
      >
        <IconTrash stroke={2} />
      </Button>
    </aside>
  );
}

export default Sidebar;
