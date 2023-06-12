import axios from "axios";
// create an instance of the HTTP client with axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, //enables sending cookies along with the requests. This option is often used for handling authentication and maintaining user sessions. It allows the browser to include cookies in cross-origin requests.
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  //   http://localhost:5500/api/send-otp
});

//~ LIST OF ALL THE END POINTS

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);

export const getAllRooms = () => api.get("/api/rooms");

// Interceptors
api.interceptors.response.use(
  (config) => {
    return config; // config have info of req & res
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);
export default api;
