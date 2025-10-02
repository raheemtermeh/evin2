import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://fz-backoffice.linooxel.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// اضافه کردن AccessToken به هر درخواست
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// هندل کردن رفرش توکن
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        if (!refresh) throw new Error("Refresh token not found");

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/refresh-token`,
          { refresh }
        );

        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// درخواست‌های آماده
export const getMenu = () => api.get("/menu");
export const getReservations = () => api.get("/reservations");
export const createReservation = (data: any) => api.post("/reservations", data);
