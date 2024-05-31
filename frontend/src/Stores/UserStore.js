import { create } from "zustand";
import { deleteCookie, setCookie } from "../utils/cookieHelpers";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  token: "",
  id: "",
  email: "",
  name: "",
  userLibrary: [],
  handleUserLogin: (data) =>
    set((state) => {
      setCookie('access_token', data.token, 7);
      return {
        ...state,
        isLoggedIn: true,
        token: data.token,
        _id: data._id,
        email: data.email,
        name: data.name,
      };
    }),
  handleUserLogout: () =>
    set((state) => {
      deleteCookie('access_token');
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        _id: "",
        email: '',
        name: '',
      };
    }),
  updateUserLibrary: (list) => set((state) => {
    return {...state, userLibrary: list}
  })
}));

export default useUserStore