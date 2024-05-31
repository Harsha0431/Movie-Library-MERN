import { create } from "zustand";

const useLoaderStore = create((set) => ({
  showMainLoader: false,
  updateMainLoader: (value) =>
    set((state) => {
      return { ...state, showMainLoader: value };
    }),
}));

export default useLoaderStore;
