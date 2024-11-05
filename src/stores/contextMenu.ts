import { create } from "zustand";

interface ContextMenuContext {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  x: number;
  y: number;
  setPosition: (x: number, y: number) => void;
  menus: number[];
  addMenu: () => number;
  removeMenu: (menu: number) => void;
  currentMenu: number;
  setCurrentMenu: (menu: number) => void;
}

export const useContextMenusStore = create<ContextMenuContext>()(
  (set, get) => ({
    visible: false,
    setVisible: (visible) => set({ visible }),
    x: 0,
    y: 0,
    setPosition: (x, y) => set({ x, y }),
    menus: [],
    addMenu: () => {
      const menus = get().menus;
      const newMenu = menus.length;
      set({ menus: [...menus, newMenu] });
      return menus.length;
    },
    removeMenu: (menu) => {
      const menus = get().menus;
      set({ menus: menus.filter((m) => m !== menu) });
    },
    currentMenu: 0,
    setCurrentMenu: (menu) => set({ currentMenu: menu }),
  })
);
