import { useEffect, useState } from "react";
import "../index.css";
import useHomeStore from "../Stores/HomeStore.js";
import Camera from '../assets/camera.svg';
import {Link, useNavigate} from 'react-router-dom'
import { loginService } from "../service/auth/service.js";
import useLoaderStore from "../Stores/LoaderStore.js";
import useUserStore from "../Stores/UserStore.js";
import useToastStore from "../Stores/ToastStore.js";

export default function LoginView() {
  const title = useHomeStore((state) => state.title);
  const updateMainLoader = useLoaderStore((state) => state.updateMainLoader);
  const handleUserLogin = useUserStore((state) => state.handleUserLogin);
  const addToast = useToastStore((state) => state.addToast);

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    updateMainLoader(true);
    setShowPassword(false);
    const result = await loginService({ email: userEmail, password: userPassword });
    updateMainLoader(false);
    if (result.code == 1) {
      handleUserLogin(result.data);
      addToast('Login Successful', 'success');
      navigate('/');
    }
    else {
      addToast(result.message, result.code == 0 ? "warning" : "error");
      setUserPassword('');
    }
  }

  useEffect(() => {
    document.title='Login | MovieHub'
  }, []);

  return (
    <div className="w-[100dvw] h-[100dvh] overflow-hidden justify-center flex items-center px-4 max-ssm:px-2">
      <div className="auth__container absolute w-full h-full z-[10]">
        <div className="auth__background__overlay absolute w-full h-full inset-0 backdrop-brightness-[0.60] z-[10]"></div>
      </div>
      <div
        className="login__container -mt-6 w-full tracking-widest relative z-[100] backdrop-blur-md shadow-lg rounded-lg border max-w-[450px] overflow-hidden border-[#f5f5f581]
                  px-6 py-8 flex flex-col gap-y-1 max-ssm:px-4 max-ssm:py-6 max-vsm:px-2 max-vsm:py-4"
      >
        <header className="w-full text-center flex justify-center flex-col items-center">
          <img
            src={Camera}
            alt={`${title} Logo`}
            className="size-36 max-ssm:size-32 -mt-2 sm:-mt-4 lg:-mt-6"
          />
          <h3 className="tracking-normal font-josefin text-[calc(18px+0.3dvw)] -mt-4 text-white">
            Login to {title}
          </h3>
        </header>
        <form
          onSubmit={(e) => handleLoginFormSubmit(e)}
          className="font-roboto tracking-wider mt-4 w-full mx-auto mb-0 space-y-4 flex flex-col text-black"
        >
          <div className="w-full">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                value={userEmail}
                aria-label="Enter your email"
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border-gray-300 p-4 max-sm:p-3.5 max-ssm:p-3 pe-12 text-sm shadow-sm focus:outline-offset-[3px] focus:outline-transparent focus:ring-offset-1 focus:ring-[#f5f5f5] focus:ring-offset-[#f5f5f5] focus:border-transparent"
                id="email"
                type="email"
                required
                aria-required="true"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-gray-400"
                >
                  <path d="M3 18q-.825 0-1.412-.587T1 16V4q0-.825.588-1.412T3 2h16q.825 0 1.413.588T21 4v5q0 .425-.288.713T20 10h-2.5q-1.45 0-2.475 1.025T14 13.5V17q0 .425-.288.713T13 18zm8-9L4.3 4.8q-.425-.275-.862-.025T3 5.525q0 .225.1.413t.3.312l7.075 4.425q.25.15.525.15t.525-.15L18.6 6.25q.2-.125.3-.312t.1-.413q0-.5-.437-.75T17.7 4.8zm8 13q-1.65 0-2.825-1.175T15 18v-4.5q0-1.05.725-1.775T17.5 11t1.775.725T20 13.5V17q0 .425-.288.713T19 18t-.712-.288T18 17v-3.5q0-.2-.15-.35T17.5 13t-.35.15t-.15.35V18q0 .825.588 1.413T19 20t1.413-.587T21 18v-3q0-.425.288-.712T22 14t.713.288T23 15v3q0 1.65-1.175 2.825T19 22" />
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                value={userPassword}
                aria-label="Enter your password"
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border-gray-300 p-4 max-sm:p-3.5 max-ssm:p-3 pe-12 text-sm shadow-sm focus:outline-offset-[3px] focus:outline-transparent focus:ring-offset-1 focus:ring-[#f5f5f5] focus:ring-offset-[#f5f5f5] focus:border-transparent"
                id="password"
                type={showPassword ? "text" : "password"}
                required
                aria-required="true"
              />
              {showPassword ? (
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={() => setShowPassword(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPassword(true)}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                >
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-y-1.5">
            <button
              type="submit"
              className="bg-[#e50914] hover:bg-[#e50914e7] border-none transition-colors shadow-md text-white px-2 py-2 font-semibold text-center rounded-md"
            >
              Login
            </button>
            <div className="px-1 flex justify-end">
              <button
                type="button"
                className="tracking-wide underline text-sm text-gray-300 transition-all hover:text-gray-100"
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex justify-center gap-x-1 mt-3 max-ssm:mt-2 text-gray-200 transition-all text-sm">
              <span>
                New to MovieHub?{" "}
                <Link
                  to={"/signup"}
                  className="underline capitalize hover:text-white font-[600] "
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
