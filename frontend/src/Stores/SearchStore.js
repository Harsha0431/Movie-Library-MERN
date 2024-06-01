import { create } from "zustand";

const useSearchStore = create((set) => ({
  prevSearchText: "",
  updatePrevSearchText: (value) =>
    set((state) => {
      return { ...state, prevSearchText: value };
    }),
  searchDataFetched: false,
  updateSearchDataFetched: (value) =>
    set((state) => {
      return { ...state, searchDataFetched: value };
    }),
  searchData: [],
  updateSearchData: (value) =>
    set((state) => {
      return { ...state, searchData: value };
    }),
  page: 1,
  updatePage: (value) =>
    set((state) => {
      return { ...state, page: value };
    }),
  totalResults: 0,
  updateTotalResults: (value) =>
    set((state) => {
      return { ...state, totalResults: value };
    }),
}));

export default useSearchStore;
