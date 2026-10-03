"use client";

import DialogCanvas from "@/components/blocks/dialog-canvas";
import Editor from "@/components/editor";
import { useEditor } from "@/store/screen";

export default function Home() {
  const editor = useEditor((state) => state.screen);

  if (editor) return <Editor screen={editor} />;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-extrabold w-full text-center mb-18">
          PersonaLab
        </h1>
        <div className="flex items-center w-full justify-center">
          <DialogCanvas />
        </div>
      </main>
    </div>
  );
}
