import { create } from "zustand";
import { Fs } from "../os";

interface FsState {
  fs: Fs;
  setFs: (fs: Fs) => void;
}

export const useFsStore = create<FsState>((set) => ({
  fs: new Fs(null, true, false),
  setFs: (fs) => set({ fs }),
}));
