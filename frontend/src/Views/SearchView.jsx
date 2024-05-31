import { useEffect, useState } from "react";
import useLoaderStore from "../Stores/LoaderStore";
import useToastStore from "../Stores/ToastStore";
import { handleSearchService } from "../service/OMDd/service";
import "../index.css";
import FooterLoader from "../Components/FooterLoader";
import {Link} from 'react-router-dom'

export default function SearchView() {
  const [searchText, setSearchText] = useState("");
  const [searchDataFetched, setSearchDataFetched] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const updateMainLoader = useLoaderStore((state) => state.updateMainLoader);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const addToast = useToastStore((state) => state.addToast);
  const [prevSearchText, setPrevSearchText] = useState("");

  const [showFooterLoader, setShowFooterLoader] = useState(false);

  async function fetchData(query, currentPage = 1) {
    const result = await handleSearchService(query, currentPage);
    return result;
  }

  async function handleSearchFormSubmit(e) {
    e.preventDefault();
    setPage(1);
    setTotalResults(0);
    setSearchData([]);
    setSearchDataFetched(false);
    updateMainLoader(true);
    const result = await fetchData(searchText);
    setSearchDataFetched(true);
    if (result.code == 1) {
      setSearchData(result.data);
      setTotalResults(result.totalResults);
      setPrevSearchText(searchText);
    } else {
      addToast(result.message, result.code == 0 ? "warning" : "error");
    }
    updateMainLoader(false);
  }

  useEffect(() => {
    if (searchData.length < totalResults) lastChildObserver();
  }, [searchData.length]);

  async function observerFetchData() {
    if (searchData.length < totalResults) {
      const newPage = page + 1;
      setShowFooterLoader(true);
      const result = await fetchData(prevSearchText, newPage);
      setShowFooterLoader(false);
      if (result.code == 1) {
        const data = searchData.concat(result.data);
        setSearchData(data);
        setPage(newPage);
        setTotalResults(result.totalResults);
      } else {
        addToast(result.message, result.code == 0 ? "warning" : "error");
      }
    }
  }

  function lastChildObserver() {
    const element = document.getElementById("search_movie__last_child") || null;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          element.id = null;
            await observerFetchData();
            observer.unobserve(element);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75, 1],
      }
    );
    if (element !== null) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }

  return (
    <div className="search_container__body w-[100dvw] px-2 overflow-x-hidden">
      <div className="search__input w-full flex justify-center mt-1 h-fit py-2">
        <form
          onSubmit={(e) => handleSearchFormSubmit(e)}
          className="relative w-full group-focus/search:w-full flex gap-x-2 justify-center"
        >
          <input
            name="search-input"
            type="search"
            value={searchText}
            required
            id="search-input"
            aria-required="true"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by title for movies, series, or episodes"
            className="bg-transparent border px-3 ssm:px-5 py-2 group/search dark:border-[#f5f5f5] border-[#101415] rounded-lg vsm:w-96 w-full
                  focus:outline-none dark:placeholder-shown:opacity-80 dark:focus:ring-[#f5f5f5] focus:ring-[#101415] focus:ring-1 max-w-[800px] focus:w-full transition-all duration-[1200ms] ease-out"
          />
          <button
            type="submit"
            htmlFor="search-input"
            className="border dark:border-[#f5f5f5] border-[#101415] group/btn rounded-lg px-2 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 stroke-[#101415] group-hover/btn:scale-110 transition-all dark:stroke-[#f5f5f5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>
      {searchDataFetched && (
        <>
          {searchData.length == 0 ? (
            <div className="text-center mt-6 font-roboto font-light">
              <span>No related movies, shows or episodes found.</span>
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-y-2 font-roboto">
              <span className="font-light text-sm">
                Showing {searchData.length} out of {totalResults}{" "}
                {totalResults === 1 ? "result" : "results"} found.
              </span>
              <div className="search_result__container pt-3 max-ssm:pt-1.5 flex flex-col gap-y-6 justify-center items-center">
                <div className="px-2 max-ssm:px-1 grid items-center grid-cols-5 max-xxl:grid-cols-4 gap-x-4 gap-y-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-vvsm:grid-cols-1">
                  {searchData.map((library, index) => (
                      <Link
                        to={`/preview/${window.btoa(library.imdbID)}`}
                      key={`${library.Title}-${index}`}
                      id={
                        index == searchData.length - 1
                          ? "search_movie__last_child"
                          : null
                      }
                      className="search_movie__card group shadow-md dark:shadow dark:shadow-[#68686875] rounded-md flex flex-col gap-y-1 overflow-hidden"
                    >
                      <div className="search_movie__poster flex-1 w-full h-full overflow-hidden">
                        <img
                          src={library.Poster}
                          alt={library.Title}
                          className="w-full h-full rounded-md group-hover:scale-105 transition-all duration-300 object-cover"
                        />
                      </div>
                      <div className="search_movie__content px-2 pb-1 font-roboto tracking-wide flex flex-col gap-y-0.5">
                        <h3 className="text-[calc(13px+0.2dvw)] text-start line-clamp-1 text-[#000000c7] group-hover:text-black dark:text-[#ffffffdb] dark:group-hover:text-white transition-all">
                          {library.Title}
                        </h3>
                        <h4 className="w-fit font-exo text-[calc(11px+0.2dvw)] dark:text-[#f5f5f5b8] line-clamp-1">
                          <span className="font-roboto">{library.Year}</span>
                        </h4>
                        <div className="flex gap-x-2 flex-wrap">
                          <span className="text-[calc(10px+0.2dvw)] text-white rounded-md py-[3px] px-1.5 w-fit bg-red-500 mb-1">
                            Year: {library.Year}
                          </span>
                          <span
                            className={`text-[calc(10px+0.2dvw)] text-white rounded-md py-[3px] px-1.5 w-fit bg-green-500 mb-1`}
                          >
                            {library.Type}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {showFooterLoader && (
                  <div className="footer__loader w-full pb-0 overflow-hidden">
                    <FooterLoader />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
