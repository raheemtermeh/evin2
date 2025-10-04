import api from "./api";

const API_URL = "user/profile/me/";

// گرفتن پروفایل
export const getProfile = async () => {
  const res = await api.get(API_URL);
  console.debug("[ProfileService] getProfile response", res.data);
  return res.data;
};

// آپدیت پروفایل
export const updateProfile = async (data) => {
  const res = await api.patch(API_URL, data);
  console.debug("[ProfileService] updateProfile response", res.data);
  return res.data;
};

// آپدیت بخشی از پروفایل (PATCH)
export const patchProfile = async (data) => {
  const res = await api.patch(API_URL, data);
  console.debug("[ProfileService] patchProfile response", res.data);
  return res.data;
};
