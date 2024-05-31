import axios from "axios";
const URI = import.meta.env.VITE_URI;

export async function loginService(data) {
  try {
    const response = await axios.post(`${URI}/api/auth/login`, data);
    return response.data;
  } catch (err) {
    return { code: 0, message: "Network error. Failed to connect our server." };
  }
}

export async function verifyTokenService(token) {
  try {
    const response = await axios.get(`${URI}/api/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return {
      code: 0,
      message: "Network error. Failed to connect our server.",
    };
  }
}

export async function signupService(data) {
  try {
    const response = await axios.post(`${URI}/api/auth/signup`, data);
    return response.data;
  } catch (err) {
    return { code: 0, message: "Network error. Failed to connect our server." };
  }
}
