import { create } from "zustand";

const useHomeStore = create((set) => ({
    title: 'MovieHub'
}));

export default useHomeStore;