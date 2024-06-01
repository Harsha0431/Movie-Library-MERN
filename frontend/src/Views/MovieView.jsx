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
    const result = await handleGetDataByIdService(paramsId);
    setDataFetched(true);
    if (result.code == 1) {
      setData(result.data);
      console.log(result.data);
    } else {
      addToast(result.message, result.code == 0 ? "warning" : "error");
    }
    updateMainLoader(false);
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
  return dataFetched && data != null ? (
    <div className="data__container w-full px-4 max-md:px-2 flex gap-x-4 gap-y-3 h-[calc(100dvh-94px)] max-md:h-[calc(100dvh-78px)] overflow-hidden max-md:flex-col">
      <div className="poster__container max-w-[500px] overflow-hidden h-auto md:w-[calc(50dvw)] w-full items-center flex justify-center">
        <img
          src={data.Poster}
          alt={data.Title}
          className="w-full h-full max-md:w-[350px] max-vsm:w-[300px]"
        />
      </div>
      <div className="data_content__container">
        <h2 className="font-josefin text-[calc(24px+0.2dvw)]">{data.Title}</h2>
        <div className="flex gap-x-2 flex-wrap text-[calc(12px+0.2dvw)]">
          {data.Type != undefined && (
            <span className="px-2 py-1 text-center border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md">
              {data.Type.toLowerCase()}
            </span>
          )}
          {data.Year != undefined && (
            <span className="px-2 py-1 text-center border dark:text-[#ffffffd3] text-[#000000d3] dark:border-[#ffffffd3] border-[#000000d3] rounded-md">
              {data.Year}
            </span>
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
  );
}
