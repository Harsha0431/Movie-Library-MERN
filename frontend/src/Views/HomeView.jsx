import { useEffect } from "react";
import useUserStore from "../Stores/UserStore";
import useLoaderStore from "../Stores/LoaderStore";
import { getLibraryListService } from "../service/library/service";
import useToastStore from "../Stores/ToastStore";
import { useNavigate } from "react-router-dom";
import '../index.css'

export default function HomeView() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const userLibrary = useUserStore((state) => state.userLibrary);
  const updateMainLoader = useLoaderStore((state) => state.updateMainLoader);
  const token = useUserStore((state) => state.token);
  const updateUserLibrary = useUserStore((state) => state.updateUserLibrary);
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();

  async function fetchUserLibraryList() {
    updateMainLoader(true);
    const result = await getLibraryListService(token);
    updateMainLoader(false);
    if (result.code == 1) {
      updateUserLibrary(result.data);
    } else if (result.code == -2) {
      navigate("/login");
    } else {
      addToast(result.message, result.code == 0 ? "warning" : "error");
    }
  }

  useEffect(() => {
    if (isLoggedIn && userLibrary.length == 0) {
      fetchUserLibraryList();
    }
  }, [isLoggedIn]);

  return (
    <div className="w-[100dvw] min-h-[100dvh] overflow-x-hidden overflow-y-auto">
      {isLoggedIn && (
        <div className="home__body px-2 py-4 max-ssm:py-2">
          <div className="flex flex-col gap-y-1">
            <h2 className="font-josefin text-[calc(20px+0.2dvw)] tracking-wide">
              Your Collection
            </h2>
            {userLibrary.length > 0 ? (
              <div className="flex justify-center items-center">
                <div className="px-2 max-ssm:px-1 grid items-center grid-cols-5 max-xxl:grid-cols-4 gap-x-4 gap-y-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-vvsm:grid-cols-1">
                  {userLibrary.map((library) => (
                    <button
                      key={library.title}
                      className="library__card group shadow-md dark:shadow dark:shadow-[#68686875] rounded-md flex flex-col gap-y-1 overflow-hidden"
                    >
                      <div className="library__thumbnail flex-1 w-full h-full overflow-hidden">
                        <img
                          src={library.thumbnail}
                          alt={library.title}
                          className="w-full h-full rounded-md group-hover:scale-105 transition-all duration-300 object-cover"
                        />
                      </div>
                      <div className="library__content px-2 pb-1 font-roboto tracking-wide flex flex-col gap-y-0.5">
                        <h3 className="text-[calc(13px+0.2dvw)] line-clamp-1 text-[#000000c7] group-hover:text-black dark:text-[#ffffffdb] dark:group-hover:text-white transition-all">
                          {library.title}
                        </h3>
                        <span
                          className={`text-[calc(10px+0.2dvw)] text-white rounded-md py-[3px] px-1.5 w-fit ${
                            library.visibility == "public" ? "bg-green-500" : "bg-red-500"
                          } mb-1`}
                        >
                          {library.visibility}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-2 max-ssm:px-1">
                <div className="flex flex-col items-center justify-center mt-4">
                  <p>No libraries found.</p>
                  <button
                    onClick={() => {
                      /* Your create library function here */
                    }}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create a Library
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
