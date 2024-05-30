import { create } from "zustand";

const useUserStore = create((set) => ({
    isLoggedIn: false,
    updateUser: (newValue) => set(() => {
        return { isLoggedIn: newValue}
    })
}))

export default useUserStore