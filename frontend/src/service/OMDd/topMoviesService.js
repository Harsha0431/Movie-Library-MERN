import axios from 'axios'
const URI = import.meta.env.VITE_URI;


export async function getTopMoviesList(page) {
    try {
        const response = await axios.get(`${URI}/api/top/movies?page=${page}`);
        return response.data;
    }
    catch (err) {
        console.error(err);
        return {
          code: -1,
          message: "Network error, please check your connection.",
        };
    }
}