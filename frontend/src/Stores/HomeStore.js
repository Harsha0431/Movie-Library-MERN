import { create } from "zustand";

const useHomeStore = create((set) => ({
    title: 'MovieHub',
    topMoviesData: [],
    topMoviesPage: 1,
    updateTopMoviesData: (data) => set((state) => {
        return { ...state, topMoviesData: data}
    }),
    updateTopMoviesPage: (page) => set((state) => {
        return {...state, topMoviesPage: page}
    })
}));

export default useHomeStore;