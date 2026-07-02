import { create } from "zustand";
import { projectApi } from "../api";

export const useProjectStore = create((set, get) => ({
  items: [],
  selectedItem: null,
  loading: false,
  error: null,

  fetchList: async () => {
    set({ loading: true, error: null });
    try {
      const items = await projectApi.getList();
      set({ items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  fetchById: async (id) => {
    set({ loading: true, error: null, selectedItem: null });
    try {
      let items = get().items;
      if (items.length === 0) {
        items = await projectApi.getList();
        set({ items });
      }
      const found = items.find((item) => String(item.id) === String(id));
      set({ selectedItem: found || null, loading: false });
      if (!found) {
        set({ error: `Проект с id=${id} не найден`, loading: false });
      }
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  clearSelected: () => set({ selectedItem: null }),
  clearError: () => set({ error: null }),
}));