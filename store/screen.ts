import { Screen } from "@/type";
import { create } from "zustand";

type EditorState = {
  screen: Screen | null;
  createScreen: (width: number, height: number) => void;
};

export const useEditor = create<EditorState>((set) => ({
  screen: null,
  createScreen: (width, height) =>
    set({ screen: { width, height, elements: [] } }),
}));
