import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(persist((set, get) => ({
  theme: "dark",
  setTheme: (t) => set({ theme: t }),

  count: 0,
  increment: () => set(s => ({ count: s.count + 1 })),
  decrement: () => set(s => ({ count: s.count - 1 })),
  resetCount: () => set({ count: 0 }),

  notes: [],
  addNote: (n) => set(s => ({ notes: [n, ...s.notes] })),
  deleteNote: (id) => set(s => ({ notes: s.notes.filter(n => n.id !== id) })),
  clearNotes: () => set({ notes: [] }),
  addSampleNote: () => set(s => ({
    notes: [{
      id: String(Date.now()),
      title: "Welcome to Notes",
      body: "This is a sample note. Use the Command Palette (⌘/Ctrl + K) to add more actions.",
      tags: ["sample", "hello"],
      createdAt: Date.now(),
    }, ...s.notes]
  })),
}), {
  name: "tiny-plus-store"
}));

export default useAppStore;
