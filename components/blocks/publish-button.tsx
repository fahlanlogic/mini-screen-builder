"use client";

import { api } from "@/lib/api";
import { Button } from "../ui/button";
import { useEditor } from "@/store/screen";
import { useState } from "react";

function PublishButton() {
  const screen = useEditor((s) => s.screen);
  const [loading, setLoading] = useState(false);

  if (!screen) return null;

  const handlePublish = async () => {
    setLoading(true);
    try {
      await api.saveDraft(screen.id, screen.elements); // simpan draft terbaru
      const { version } = await api.publish(screen.id);
      useEditor.setState((s) =>
        s.screen ? { screen: { ...s.screen, publishedVersion: version } } : s,
      );
      alert(`Berhasil dipublish (versi ${version})`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute right-6 top-2 z-50">
      <span className="mr-4">Version: {screen.publishedVersion}</span>
      <Button
        data-keep-selection
        className=""
        disabled={loading}
        onClick={handlePublish}
      >
        {loading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
}

export default PublishButton;
