import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  dopen: boolean;
  updateOpen: (dopen: boolean) => void;
}

const appStore = create<AppState>()(
  persist(
    (set) => ({
      dopen: true,
      updateOpen: (dopen: boolean) => set({ dopen: dopen })
    }),
    { name: "my_app_store" }
  )
);

export const useAppStore = appStore;