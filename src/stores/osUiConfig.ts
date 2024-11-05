import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OsUiConfig {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
  setTaskbarStyle: (
    style: "default" | "joined" | "classic" | "compact"
  ) => void;
}

export const useOsUiConfigStore = create<OsUiConfig>()(
  persist(
    (set) => ({
      taskbarStyle: "default",
      setTaskbarStyle: (style) => set({ taskbarStyle: style }),
    }),
    {
      name: "os-ui-config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
