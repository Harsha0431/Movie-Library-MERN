import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HomeView from "./Views/HomeView";
import LoginView from "./Views/LoginView";
import RegisterView from "./Views/RegisterView";
import useThemeStore from "./Stores/ThemeStore";
import FooterNav from "./Components/FooterNav";
import { useEffect } from "react";
import useUserStore from "./Stores/UserStore";
import useLoaderStore from "./Stores/LoaderStore";
import MainLoader from "./Components/MainLoader";
import useToastStore from "./Stores/ToastStore";
import ToastView from "./Components/ToastView";
import { getCookie } from "./utils/cookieHelpers";
import { verifyTokenService } from "./service/auth/service";
import SearchView from "./Views/SearchView";
import MovieView from "./Views/MovieView";
import { useHistoryPaths } from "./Components/HistoryProvider";
import NavbarView from "./Components/NavbarView";

function App() {
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const showMainLoader = useLoaderStore((state) => state.showMainLoader);
  const toastList = useToastStore((state) => state.toastList);
  const updateMainLoader = useLoaderStore((state) => state.updateMainLoader);
  const handleUserLogin = useUserStore((state) => state.handleUserLogin);

  const history = useHistoryPaths();

  const moveBack = () => {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i] != '/login' && history[i]!='/signup') {
        navigate(history[i]);
        return;
      }
    }
    navigate("/");
  };

  async function verifyToken(token) {
    updateMainLoader(true);
    const result = await verifyTokenService(token);
    updateMainLoader(false);
    if (result.code == 1) {
      result.data = { ...result.data, token: token };
      handleUserLogin(result.data);
      console.log(history);
      moveBack();
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    document.title = "MovieHub";
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const cookieAccessToken = getCookie("access_token") || null;
      if (cookieAccessToken != null && cookieAccessToken.length > 0) {
        verifyToken(cookieAccessToken);
      } else {
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
      className={`dark:bg-[#101415] bg-[#f5f5f5] w-[100dvw] min-h-[100dvh] text-black dark:text-white`}
    >
      {showMainLoader && (
        <div className="z-[10000] absolute inset-0 flex justify-center items-center backdrop-brightness-50">
          <MainLoader />
        </div>
      )}
      {toastList.length > 0 && (
        <div className="absolute top-2 left-0 z-[10000] justify-center items-center w-full">
          <div className="flex flex-col w-full gap-y-1 justify-center items-center">
            {toastList.map((toast, index) => {
              return (
                <ToastView key={`${toast.message}-${index}`} data={toast} />
              );
            })}
          </div>
        </div>
      )}
      <nav
        className={`${
          location.pathname.includes("login") ||
          location.pathname.includes("signup")
            ? "hidden"
            : "flex"
        } flex w-full justify-center items-center text-center`}
      >
        <NavbarView />
      </nav>
      <footer className="fixed bottom-2 flex justify-center w-full z-[1000]">
        <FooterNav />
      </footer>
      <main
        className={`${
          location.pathname.includes("login") ||
          location.pathname.includes("signup")
            ? "pb-0"
            : "pb-24"
        } w-full h-full`}
      >
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<RegisterView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/preview/:id" element={<MovieView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
