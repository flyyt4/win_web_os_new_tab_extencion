import { WebContainer } from "@webcontainer/api";
import { create } from "zustand";

interface WebContainerState {
  container: WebContainer | null;
  setContainer: (container: WebContainer | null) => void;
}

export const useWebContainerStore = create<WebContainerState>((set) => ({
  container: null,
  setContainer: (container) => set({ container }),
}));
