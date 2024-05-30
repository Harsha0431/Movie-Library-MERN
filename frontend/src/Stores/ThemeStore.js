import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkTheme: localStorage.getItem("darkTheme") === "true",
  updateTheme: (newTheme) => set(() => {
    localStorage.setItem("darkTheme", newTheme);
    const element = document.getElementById('root') || null
    if (element != null) {
      if (newTheme) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
    
    return {isDarkTheme: newTheme}
  })
}));

export default useThemeStore;