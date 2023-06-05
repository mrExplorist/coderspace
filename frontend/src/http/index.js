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

export default api;
