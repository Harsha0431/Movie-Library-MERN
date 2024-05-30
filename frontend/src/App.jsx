import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeView from './Views/HomeView'
import LoginView from './Views/LoginView'
import RegisterView from './Views/RegisterView'
import useThemeStore from "./Stores/ThemeStore";
import FooterNav from './Components/FooterNav'
import { useEffect } from 'react'
import useUserStore from './Stores/UserStore';

function App() {
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const navigator = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigator('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const element = document.getElementById("root__body") || null;
    if (element != null) {
      if (isDarkTheme) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  }, [isDarkTheme]);

  return (
    <div
      className={`dark:bg-[#101415] bg-[#f5f5f5] w-[100dvw] h-[100dvh] text-black dark:text-white`}
    >
      <nav className='fixed bottom-2 flex justify-center w-full'>
        <FooterNav />
      </nav>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<RegisterView />} />
      </Routes>
    </div>
  );
}

export default App
