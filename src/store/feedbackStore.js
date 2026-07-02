import { create } from "zustand";
import { feedbackApi } from "../api";

export const useFeedbackStore = create((set) => ({
  items: [],
  loading: false,
  submitting: false,
  error: null,
  successMessage: null,

  fetchList: async () => {
    set({ loading: true, error: null });
    try {
      const items = await feedbackApi.getList();
      set({ items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  createFeedback: async (data) => {
    set({ submitting: true, error: null, successMessage: null });
    try {
      const newItem = await feedbackApi.create(data);
      set((state) => ({
        items: [...state.items, newItem],
        submitting: false,
        successMessage: "Успешно отправлен!",
      }));
    } catch (e) {
      set({ error: e.message, submitting: false });
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
}));