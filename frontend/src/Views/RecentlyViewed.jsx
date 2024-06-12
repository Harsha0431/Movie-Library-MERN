import { useEffect, useState } from "react";
import "../index.css";
import useUserStore from "../Stores/UserStore";
import { Link, useNavigate } from "react-router-dom";

export default function HomeView() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    if (isLoggedIn) {
      setData(JSON.parse(localStorage.getItem('recently_viewed')) || []);
    }
    document.title = "Recently Viewed | MovieHub";
  }, [isLoggedIn]);

  return (
    <div className="w-[100dvw] min-h-[100dvh] overflow-x-hidden overflow-y-auto">
      {isLoggedIn && (
        <div className="search_result__container flex flex-col gap-y-4 justify-center items-center">
          <h3 className="text-left w-full px-2 max-ssm:px-1 font-josefin text-[calc(22px+0.2dvw)]">
            Recently Viewed
          </h3>
          <div className="px-2 max-ssm:px-1 grid items-center grid-cols-5 max-xxl:grid-cols-4 gap-x-4 gap-y-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-vvsm:grid-cols-1">
            {data.map((library, index) => (
              <Link
                to={`/preview/${window.btoa(library.imdbID)}`}
                key={`${library.Title}-${index}`}
                id={
                  index == data.length - 1
                    ? "recent_movie__last_child"
                    : null
                }
                className="recent_movie__card group shadow-md dark:shadow dark:shadow-[#68686875] rounded-md flex flex-col gap-y-1 h-full overflow-hidden"
              >
                <div className="recent_movie__poster flex-1 w-full h-full overflow-hidden">
                  <img
                    src={library.Poster}
                    alt={library.Title}
                    className="w-full h-full rounded-md group-hover:scale-105 transition-all duration-300 object-cover"
                  />
                </div>
                <div className="recent_movie__content px-2 pb-1 font-roboto tracking-wide flex flex-col gap-y-0.5">
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
        </div>
      )}
    </div>
  );
}
