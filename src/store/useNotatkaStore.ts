import { create } from "zustand";

type Notatka = {
  notes: string[];
  addNotes: (note: string) => void;
  clearNotes: () => void;
};

export const useNotatkaStore = create<Notatka>((set) => ({
  notes: [],
  addNotes: (note) => set((state) => ({ notes: [...state.notes, note] })),
  clearNotes: () => set({ notes: [] }),
}));
