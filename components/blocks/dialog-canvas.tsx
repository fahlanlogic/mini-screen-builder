"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEditor } from "@/store/screen";
import { api } from "@/lib/api";

function DialogCanvas() {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState<number>(1920);
  const [height, setHeight] = React.useState<number>(1080);
  const createScreen = useEditor((state) => state.createScreen);

  const valid =
    width >= 100 && width <= 5000 && height >= 100 && height <= 5000;

  // const onCreate = () => {
  //   createScreen(width, height);
  //   setOpen(false);
  // };
  const handleCreate = async () => {
    setLoading(true);
    try {
      const screen = await api.createScreen(width, height);
      createScreen(screen);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="uppercase font-bold">
          <IconPlus /> Create Canvas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Canvas</DialogTitle>
          <DialogDescription>
            This will create a new canvas for you to work on.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {/* Canvas content goes here */}
          <FieldGroup className="flex-row gap-4 items-center">
            <Field>
              <FieldLabel htmlFor="width">Width (px)</FieldLabel>
              <Input
                id="width"
                name="width"
                type="number"
                min="100"
                max="5000"
                placeholder="500"
                value={width}
                onChange={(e) => setWidth(+e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="height">Height (px)</FieldLabel>
              <Input
                id="height"
                name="height"
                type="number"
                min="100"
                max="5000"
                placeholder="500"
                value={height}
                onChange={(e) => setHeight(+e.target.value)}
              />
            </Field>
          </FieldGroup>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!valid || loading}
              onClick={handleCreate}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogCanvas;
