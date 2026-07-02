import { create } from "zustand";
import { aboutUsApi } from "../api";

export const useAboutUsStore = create((set) => ({
  items: [],
  selectedItem: null,
  loading: false,
  error: null,

  fetchList: async () => {
    set({ loading: true, error: null });
    try {
      const items = await aboutUsApi.getList();
      set({ items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  fetchById: async (id) => {
    set({ loading: true, error: null });
    try {
      const selectedItem = await aboutUsApi.getById(id);
      set({ selectedItem, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  clearSelected: () => set({ selectedItem: null }),
  clearError: () => set({ error: null }),
}));