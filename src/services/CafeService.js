import axios from "axios";

const API_URL = "https://fz-backoffice.linooxel.com/api/venues/branch";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

export const getCafes = async (filters = {}) => {
  // اگه هیچ فیلتری ندادی، یه فیلتر پیش‌فرض بده تا ارور نگیره
  const params = Object.keys(filters).length ? filters : { status: "a" };

  const res = await api.get("venues/branch/", { params });
  return res.data;
};

export const getCafeDetail = async (id) => {
  const res = await axios.get(`${API_URL}?id=${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const createCafe = async (data) => {
  const res = await axios.post(API_URL, data, { headers: getAuthHeaders() });
  return res.data;
};

export const updateCafe = async (id, data) => {
  const res = await axios.patch(`${API_URL}?id=${id}`, data, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
