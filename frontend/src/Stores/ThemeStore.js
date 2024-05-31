import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkTheme: localStorage.getItem("darkTheme") === "true",
  updateTheme: (newTheme) => set(() => {
    localStorage.setItem("darkTheme", newTheme);
    const element = document.getElementById("root__body") || null;
    if (element != null) {
      if (newTheme) {
        element.classList.add("dark");
        document.body.classList.add("bg-[#101415]");
        document.body.classList.remove("#f5f5f5");
      } else {
        element.classList.remove("dark");
        document.body.classList.remove("bg-[#101415]");
        document.body.classList.add("#f5f5f5");
      }
    }
    
    return {isDarkTheme: newTheme}
  })
}));

export default useThemeStore;