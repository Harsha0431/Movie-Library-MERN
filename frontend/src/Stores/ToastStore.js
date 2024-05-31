import { create } from "zustand";

// Toast type success, warning, error

const useToastStore = create((set) => ({
  toastList: [],
  addToast: (message, type) =>
    set((state) => {
      return { ...state, toastList: [...state.toastList, { message, type }] };
    }),
  removeToast: (data) => set((state) => {
    const newList = state.toastList.filter((toast) => toast.message !== data.message && toast.type !== data.type );
    return {...state, toastList: newList}
  })
}));

export default useToastStore;
