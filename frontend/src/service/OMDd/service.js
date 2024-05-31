const OMDb_API_KEY = import.meta.env.VITE_OMBb_API_KEY;
const OMDb_URI = import.meta.env.OMBb_URI;


export async function handleSearchService(query, page = 1) {
    try {
        const result = await fetch(`${OMDb_URI}${OMDb_API_KEY}&q=${query}&page=${page}`);
        const response = await result.json();
        if (response.Response == "True") {
            return {
              code: 1,
              message: `${response.Search.length} related ${
                response.Search.length == 1 ? "movie" : "movies"
              } found`,
              data: response.Search,
              totalResults: response.totalResults
            };
        }
        else {
            if (response.Error == "Movie not found!") {
              return { code: 0, message: "No movies found with that query." };
            } else if (response.Error == "Too many results.") {
              return {
                code: 0,
                message: "Too many results, please refine your search.",
              };
            } else {
              return {
                code: -1,
                message: "Unexpected error, please try again.",
              };
            }
        }
    }
    catch (err) {
        return {
          code: -1,
          message: "Network error, please check your connection.",
        };
    }
}