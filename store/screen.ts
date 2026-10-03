import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CanvasElement, Screen } from "@/type";

type EditorState = {
  screen: Screen | null;
  selectedId: string | null;

  createScreen: (width: number, height: number) => void;
  resetScreen: () => void;

  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, patch: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;

  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
};

// helper: ubah elements hanya kalau screen ada
const withElements = (
  screen: Screen | null,
  fn: (elements: CanvasElement[]) => CanvasElement[],
) => (screen ? { screen: { ...screen, elements: fn(screen.elements) } } : {});

export const useEditor = create<EditorState>()(
  persist(
    (set) => ({
      screen: null,
      selectedId: null,

      createScreen: (width, height) =>
        set({ screen: { width, height, elements: [] }, selectedId: null }),

      resetScreen: () => set({ screen: null, selectedId: null }),

      addElement: (el) =>
        set((s) => ({
          ...withElements(s.screen, (els) => {
            const max = els.length ? Math.max(...els.map((e) => e.zIndex)) : 0;
            return [...els, { ...el, zIndex: max + 1 }];
          }),
          selectedId: el.id,
        })),

      updateElement: (id, patch) =>
        set((s) =>
          withElements(s.screen, (els) =>
            els.map((el) =>
              el.id === id ? ({ ...el, ...patch } as CanvasElement) : el,
            ),
          ),
        ),

      deleteElement: (id) =>
        set((s) => ({
          ...withElements(s.screen, (els) => els.filter((el) => el.id !== id)),
          selectedId: null,
        })),

      selectElement: (id) => set({ selectedId: id }),

      bringToFront: (id) =>
        set((s) =>
          withElements(s.screen, (els) => {
            const max = Math.max(...els.map((e) => e.zIndex));
            return els.map((el) =>
              el.id === id ? { ...el, zIndex: max + 1 } : el,
            );
          }),
        ),

      sendToBack: (id) =>
        set((s) =>
          withElements(s.screen, (els) => {
            const min = Math.min(...els.map((e) => e.zIndex));
            return els.map((el) =>
              el.id === id ? { ...el, zIndex: min - 1 } : el,
            );
          }),
        ),
    }),
    {
      name: "editor-storage",
      partialize: (s) => ({ screen: s.screen }),
    },
  ),
);
