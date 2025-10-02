import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // آدرس API از .env
  headers: {
    "Content-Type": "application/json",
  },
});

// درخواست‌های آماده
export const getMenu = () => api.get("/menu");
export const getReservations = () => api.get("/reservations");
export const createReservation = (data) => api.post("/reservations", data);

export default api;
