import { create } from "zustand";

const useLoaderStore = create((set) => ({
  showMainLoader: false,
  updateMainLoader: (value) =>
    set((state) => {
      if (value) {
        document.body.style.overflow = 'hidden';
      }
      else {
        document.body.style.overflow = "";
      }
      return { ...state, showMainLoader: value };
    }),
}));

export default useLoaderStore;
