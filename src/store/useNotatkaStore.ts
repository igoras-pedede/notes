import { create } from "zustand";

type NotatkaStructure = {
  tytuł: string;
  notatka: string;
};

type Notatka = {
  notes: NotatkaStructure[];
  addNotes: (note: NotatkaStructure) => void;
  clearNotes: () => void;
  removeNote: (index: number) => void;
};

export const useNotatkaStore = create<Notatka>((set) => ({
  notes: [],
  addNotes: (note) => set((state) => ({ notes: [...state.notes, note] })),
  clearNotes: () => set({ notes: [] }),
  removeNote: (index) =>
    set((state) => ({
      notes: state.notes.filter((note, indx) => indx !== index),
    })),
}));
