import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoaderStore from "../Stores/LoaderStore";
import { useHistoryPaths } from "../Components/HistoryProvider";
import { handleGetDataByIdService } from "../service/OMDd/service";
import useToastStore from "../Stores/ToastStore";

export default function MovieView() {
  const { id } = useParams();
  const [dataFetched, setDataFetched] = useState(false);
  const updateMainLoader = useLoaderStore((state) => state.updateMainLoader);
  const navigate = useNavigate();
  const history = useHistoryPaths();
  const [data, setData] = useState(null);
  const addToast = useToastStore((state) => state.addToast);

  async function fetchData() {
    const paramsId = window.atob(id);
    updateMainLoader(true);
    try {
      const result = await handleGetDataByIdService(paramsId);
      setDataFetched(true);
      if (result.code === 1) {
        setData(result.data);
        let recentlyViewed =
          JSON.parse(localStorage.getItem("recently_viewed")) || [];
        const idExists = recentlyViewed.some(
          (movie) => movie.imdbID === result.data.imdbID
        );
        if (!idExists) {
          const newRecentlyViewed = {
            imdbID: result.data.imdbID,
            Year: result.data.Year,
            Title: result.data.Title,
            Poster: result.data.Poster,
            Type: result.data.Type
          };
          recentlyViewed.unshift(newRecentlyViewed);
          localStorage.setItem(
            "recently_viewed",
            JSON.stringify(recentlyViewed)
          );
        }
      } else {
        addToast(result.message, result.code === 0 ? "warning" : "error");
      }
    } catch (error) {
      addToast("An error occurred while fetching data", "error");
    } finally {
      updateMainLoader(false);
    }
  }


  useEffect(() => {
    if (id == null || id == undefined) {
      if (history.length == 1) navigate("/");
      else {
        navigate(history[history.length - 2]);
      }
    } else {
      fetchData();
    }
  }, []);
  return dataFetched ?(data != null ? (
    <div className="data__container w-full px-4 max-md:px-2 flex gap-x-4 gap-y-3 h-full overflow-hidden max-md:flex-col">
      <div className="poster__container overflow-hidden h-auto w-max items-center flex justify-center max-md:min-h-[50dvh] max-md:w-full max-md:justify-center">
        <img
          src={data.Poster}
          alt={data.Title}
          className="h-full w-auto aspect-auto object-fill"
        />
      </div>
      <div className="data_content__container overflow-hidden flex flex-1 flex-col gap-y-2">
        <h2 className="font-josefin text-[calc(24px+0.2dvw)]">{data.Title}</h2>
        <div className="flex gap-x-2 flex-wrap text-[calc(12px+0.2dvw)] gap-y-1.5 -mt-2">
          {data.Type != undefined &&
            data.Type != null &&
            data.Type != "N/A" && (
              <span className="px-1.5 py-0.5 text-center border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md">
                {data.Type.toLowerCase()}
              </span>
            )}
          {data.Year != undefined &&
            data.Year != null &&
            data.Year != "N/A" && (
              <abbr
              title={`${(data.Released!=undefined && data.Released!=null && data.Released!='N/A') ? (`Released: ${data.Released}`):'Released Year'}`}
                className="no-underline px-1.5 py-0.5 text-center border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md"
              >
                {data.Year}
              </abbr>
            )}
          {data.imdbRating != undefined &&
            data.imdbRating != null &&
            data.imdbRating != "N/A" && (
              <abbr
                title="IMDb Rating"
                className="no-underline px-1.5 py-0.5 text-center items-center flex gap-x-0.5 border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-[calc(12px+0.2dvw)]"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                {data.imdbRating}
              </abbr>
            )}
          {data.imdbVotes != undefined &&
            data.imdbVotes != null &&
            data.imdbVotes != "N/A" && (
              <abbr
                title="IMDb Votes"
                className="no-underline px-1.5 py-0.5 text-center items-center flex gap-x-0.5 border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[calc(12px+0.2dvw)]"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="m21.945 14.472l.021.062l.023.1l.01.1v6.516a.75.75 0 0 1-.65.743l-.1.007H2.75a.75.75 0 0 1-.743-.648L2 21.25v-6.5l.002-.052l.01-.086a1 1 0 0 1 .047-.153l2.76-6.019a.75.75 0 0 1 .573-.43l.108-.007l2.54-.001l-.79 1.37l-.067.13H5.98L3.918 14H20.07l-2.027-4.346l.862-1.497q.101.076.172.184l.053.095zm-8.58-12.416l.092.045l5.188 3.003c.328.19.458.591.319.933l-.045.092L16.112 11h1.138a.75.75 0 0 1 .102 1.494l-.102.007l-2.002-.001v.003h-4.079l-.003-.003H6.75a.75.75 0 0 1-.102-1.492l.102-.007L8.573 11l-.182-.105a.75.75 0 0 1-.318-.933l.044-.092l4.317-7.496c.19-.329.59-.46.931-.32m-.01 1.72L9.789 9.97L11.567 11h2.817l2.865-4.973z"
                  />
                </svg>
                {data.imdbVotes}
              </abbr>
            )}
          {data.Genre != undefined &&
            data.Genre != null &&
            data.Genre != "N/A" && (
              <abbr
                title="Genre"
                className="no-underline px-1.5 py-0.5 text-center items-center flex gap-x-0.5 border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md"
              >
                {data.Genre.split(",")
                  .map((genre) => genre.trim())
                  .filter((genre) => genre)
                  .join("/")}
              </abbr>
            )}
        </div>
        {data.Plot != undefined &&
          data.Plot != null &&
          data.Plot != "N/A" &&
          data.Plot.length > 0 && (
            <span className="text-[calc(14px+0.2dvw)] font-roboto font-light">
              {data.Plot}
            </span>
          )}
        <div className="actors_&director_&writer_&language flex flex-col gap-y-2">
          {data.Actors !== undefined &&
            data.Actors != null &&
            data.Actors != "N/A" && (
              <div className="actors__container flex flex-col">
                <h3 className="font-josefin text-[calc(20px+0.2dvw)]">
                  Actor{" "}
                  {data.Actors.split(",").length > 1 && (
                    <span className="text-[calc(16px+0.2dvw)] -ml-1">(s)</span>
                  )}
                </h3>
                {data.Actors.split(",").length > 1 ? (
                  <span className="font-roboto font-light pl-1.5">
                    {data.Actors.split(",")
                      .map((act) => act.trim())
                      .filter((act) => act.length > 0)
                      .join(" • ")}
                  </span>
                ) : (
                  <ul className="list-inside">
                    {data.Actors.split(",").map((actor) => {
                      return (
                        <li
                          key={actor}
                          className="list-item list-disc font-roboto font-light pl-2"
                        >
                          {actor.trim()}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          {data.Director !== undefined &&
            data.Director != null &&
            data.Director != "N/A" &&
            data.Director.length > 0 && (
              <div className="director__container flex flex-col">
                <h3 className="font-josefin text-[calc(20px+0.2dvw)]">
                  Director{" "}
                  {data.Director.split(",").length > 1 && (
                    <span className="text-[calc(16px+0.2dvw)] -ml-1">(s)</span>
                  )}
                </h3>
                <span className="font-roboto font-light pl-2">
                  {data.Director.split(",")
                    .map((act) => act.trim())
                    .filter((act) => act.length > 0)
                    .join(" • ")}
                </span>
              </div>
            )}
          {data.Writer !== undefined &&
            data.Writer != null &&
            data.Writer != "N/A" &&
            data.Writer.length > 0 && (
              <div className="writer__container flex flex-col">
                <h3 className="font-josefin text-[calc(20px+0.2dvw)]">
                  Writer{" "}
                  {data.Writer.split(",").length > 1 && (
                    <span className="text-[calc(16px+0.2dvw)] -ml-1">(s)</span>
                  )}
                </h3>
                <span className="font-roboto font-light pl-2">
                  {data.Writer.split(",")
                    .map((act) => act.trim())
                    .filter((act) => act.length > 0)
                    .join(" • ")}
                </span>
              </div>
            )}
          {data.Language !== undefined &&
            data.Language != null &&
            data.Language != "N/A" &&
            data.Language.length > 0 && (
              <div className="language__container flex flex-col">
                <h3 className="font-josefin text-[calc(20px+0.2dvw)]">
                  Language{" "}
                  {data.Language.split(",").length > 1 && (
                    <span className="text-[calc(16px+0.2dvw)] -ml-1">(s)</span>
                  )}
                </h3>

                <span className="font-roboto font-light pl-2">
                  {data.Language.split(",")
                    .map((lang) => lang.trim())
                    .filter((lang) => lang.length > 0)
                    .join(" • ")}
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center items-center flex flex-col mt-6 font-roboto font-light">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 bg-red-600 p-1 rounded-full"
          viewBox="0 0 15 15"
        >
          <path
            fill="#ffffff"
            fillRule="evenodd"
            d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className="mt-1 font-[500] font-josefin text-[calc(20px+0.3dvw)]">
        Sorry
      </span>
      <span className="text-[calc(16px+0.3dvw)]">
        No related movies, shows or episodes found.
      </span>
      <button
        type="button"
        onClick={fetchData}
        className="p-2 border capitalize w-fit dark:text-[#f5f5f5d2] text-[#000000c9] transition-all shadow-md hover:scale-105 dark:hover:text-[#f5f5f5] hover:text-[#000] font-normal dark:border-[#f5f5f5d2] border-[#000000c9] hover:dark:border-[#f5f5f5] hover:border-[#000] rounded-lg mt-3"
      >
        Try Again
      </button>
    </div>
  )) :
  <div></div>;
}
