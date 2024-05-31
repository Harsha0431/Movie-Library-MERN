import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeView from './Views/HomeView'
import LoginView from './Views/LoginView'
import RegisterView from './Views/RegisterView'
import useThemeStore from "./Stores/ThemeStore";
import FooterNav from './Components/FooterNav'
import { useEffect } from 'react'
import useUserStore from './Stores/UserStore';
import useLoaderStore from "./Stores/LoaderStore";
import MainLoader from './Components/MainLoader';
import useToastStore from './Stores/ToastStore';
import ToastView from './Components/ToastView';

function App() {
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const navigator = useNavigate();
  const showMainLoader = useLoaderStore((state) => state.showMainLoader);
  const toastList = useToastStore((state)=>state.toastList)

  useEffect(() => {
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

  // Highest z-index elements are Main-loader(10000); toast(10000) ; navbar(1000)

  return (
    <div
      className={`dark:bg-[#101415] bg-[#f5f5f5] w-[100dvw] h-[100dvh] text-black dark:text-white`}
    >
      {showMainLoader && (
        <div className="z-[10000] absolute inset-0 flex justify-center items-center backdrop-brightness-50">
          <MainLoader />
        </div>
      )}
      {toastList.length > 0 && (
        <div className="absolute top-2 left-0 z-[10000] justify-center items-center w-full">
          <div className='flex flex-col w-full gap-y-1 justify-center items-center'>
            {toastList.map((toast, index) => {
              return (
                <ToastView key={`${toast.message}-${index}`} data={toast} />
              );
            })}
          </div>
        </div>
      )}
      <nav className="fixed bottom-2 flex justify-center w-full z-[1000]">
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
