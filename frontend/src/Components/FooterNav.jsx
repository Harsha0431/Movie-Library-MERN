import { Link } from 'react-router-dom';
import TopTooltip from '../Components/TopTooltip';
import useUserStore from '../Stores/UserStore';
import useThemeStore from '../Stores/ThemeStore';

export default function FooterNav() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const updateTheme = useThemeStore((state) => state.updateTheme);


  return (
    <div>
      <div className="flex dark:bg-[#f5f5f5] bg-[#101415] w-fit rounded-2xl">
        <div className="rounded-2xl w-full flex gap-x-6 items-center justify-center p-3">
          <Link
            to={"/home"}
            className="inline-flex items-center border-transparent focus:opacity-100 font-medium rounded-full text-sm text-center"
          >
            <TopTooltip text={"Home"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-7 dark:fill-[#101415db] dark:hover:fill-[#101415] fill-[#f5f5f5da] hover:fill-[#f5f5f5] transition-all"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </TopTooltip>
          </Link>
          <Link
            to={"/library"}
            className="inline-flex items-center border-transparent focus:opacity-100 font-medium rounded-full text-sm text-center"
          >
            <TopTooltip text={"Library"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-7 dark:fill-[#101415db] dark:hover:fill-[#101415] fill-[#f5f5f5da] hover:fill-[#f5f5f5] transition-all"
                viewBox="0 0 24 24"
              >
                <path
                  className="fill-inherit"
                  d="M5 2h14v2H5zM3 5.5h18v2H3zM1 9h22v13H1zm2 2v9h18v-9zm6.75 1.469L15 15.5l-5.25 3.031z"
                />
              </svg>
            </TopTooltip>
          </Link>
          <Link className="mx-2 relative" to={"/search"}>
            <button className="rounded-full p-2 absolute left-1/2 transform -translate-x-1/2 -top-11 bg-[#101415] dark:bg-[#f5f5f5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="size-7 dark:stroke-[#101415db] dark:hover:stroke-[#101415] stroke-[#f5f5f5da] hover:stroke-[#f5f5f5] transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </Link>
          {isLoggedIn ? (
            <Link
              href="href"
              className="inline-flex items-center border-transparent focus:opacity-100 font-medium rounded-full text-sm text-center"
            >
              <TopTooltip text={"Account"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 dark:fill-[#101415db] dark:hover:fill-[#101415] fill-[#f5f5f5da] hover:fill-[#f5f5f5] transition-all"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </TopTooltip>
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="inline-flex items-center border-transparent focus:opacity-100 font-medium rounded-full text-sm text-center"
            >
              <TopTooltip text={"Login"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 dark:fill-[#101415db] dark:hover:fill-[#101415] fill-[#f5f5f5da] hover:fill-[#f5f5f5] transition-all"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-inherit"
                    fillRule="evenodd"
                    d="M10.845 8.095a.75.75 0 0 0 0 1.06l1.72 1.72h-8.19a.75.75 0 0 0 0 1.5h8.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0"
                    clipRule="evenodd"
                  />
                  <path
                    className="fill-inherit"
                    d="M12.375 5.877c0 .448.274.84.591 1.157l3 3a2.25 2.25 0 0 1 0 3.182l-3 3c-.317.317-.591.709-.591 1.157v2.252a8 8 0 1 0 0-16z"
                  />
                </svg>
              </TopTooltip>
            </Link>
          )}
          {isDarkTheme ? (
            <button
              onClick={() => updateTheme(false)}
              className="inline-flex items-center border-transparent focus:opacity-100 font-medium rounded-full text-sm text-center"
            >
              <TopTooltip text={"Turn on the light"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-7 dark:fill-[#101415db] fill-[#f5f5f5da] hover:fill-[#f5f5f5] dark:hover:fill-[#101415] transition-all"
                >
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
              </TopTooltip>
            </button>
          ) : (
            <button
              onClick={() => updateTheme(true)}
              className="inline-flex items-center border-transparent focus:opacity-100 font-medium rounded-full text-sm text-center"
            >
              <TopTooltip text={"Turn off the light"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-7 dark:fill-[#101415db] fill-[#f5f5f5da] hover:fill-[#f5f5f5] dark:hover:fill-[#101415] transition-all"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                    clipRule="evenodd"
                  />
                </svg>
              </TopTooltip>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
