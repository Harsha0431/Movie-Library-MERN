import axios from "axios";
const OMDb_API_KEY = import.meta.env.VITE_OMDb_API_KEY;
const OMDb_URI = import.meta.env.VITE_OMDb_URI;

export async function handleSearchService(query, page = 1) {
  try {
    const result = await axios.get(
      `${OMDb_URI}${OMDb_API_KEY}&s=${"*" + query + "*"}&page=${page}`
    );
    const response = result.data;
    if (response.Response == "True") {
      return {
        code: 1,
        message: `${response.Search.length} related ${
          response.Search.length == 1 ? "movie" : "movies"
        } found`,
        data: response.Search,
        totalResults: response.totalResults,
      };
    } else {
      console.log(response.Error);
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
  } catch (err) {
    console.log(err);
    return {
      code: -1,
      message: "Network error, please check your connection.",
    };
  }
}

export async function handleGetDataByIdService(id) {
  try {
    const result = await axios.get(`${OMDb_URI}${OMDb_API_KEY}&i=${id}`);
    const response = result.data;
    if (response.Response == "True") {
      return {
        code: 1,
        message: `Data found`,
        data: response,
      };
    } else {
      console.log(response.Error);
      if (response.Error == "Incorrect IMDb ID.") {
        return { code: 0, message: "No movies or show found." };
      } else {
        return {
          code: -1,
          message: "Unexpected error, please try again.",
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      code: -1,
      message: "Network error, please check your connection.",
    };
  }
}
