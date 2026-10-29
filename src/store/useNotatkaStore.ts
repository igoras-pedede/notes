import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type NotatkaStructure = {
  tytul: string;
  notatka: string;
};

type Notatka = {
  notes: NotatkaStructure[];
  addNotes: (note: NotatkaStructure) => void;
  clearNotes: () => void;
  removeNote: (index: number) => void;
};

export const useNotatkaStore = create<Notatka>()(
  persist(
    (set) => ({
      notes: [],
      addNotes: (note) => set((state) => ({ notes: [...state.notes, note] })),
      clearNotes: () => set({ notes: [] }),
      removeNote: (index) =>
        set((state) => ({
          notes: state.notes.filter((note, indx) => indx !== index),
        })),
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
