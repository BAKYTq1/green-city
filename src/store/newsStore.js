import { create } from "zustand";
import { newsApi } from "../api";

export const useNewsStore = create((set, get) => ({
  items: [],
  selectedItem: null,
  loading: false,
  error: null,

  fetchList: async () => {
    set({ loading: true, error: null });
    try {
      const items = await newsApi.getList();
      set({ items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // Бэкенд не отдаёт /news/{id}/, поэтому ищем элемент
  // в уже загруженном списке (или дозагружаем список, если он пуст)
  fetchById: async (id) => {
    set({ loading: true, error: null });
    try {
      let items = get().items;
      if (items.length === 0) {
        items = await newsApi.getList();
        set({ items });
      }
      const found = items.find((item) => String(item.id) === String(id));
      set({ selectedItem: found || null, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  clearSelected: () => set({ selectedItem: null }),
  clearError: () => set({ error: null }),
}));