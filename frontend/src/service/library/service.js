import axios from "axios";
const URI = import.meta.env.VITE_URI;

export async function getLibraryListService(token) {
    try {
        const response = await axios.get(`${URI}/api/library/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
    catch (err) {
        return { code: 0, message: "Network error. Failed to connect our server." };
    }
}