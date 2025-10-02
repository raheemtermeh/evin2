import axios from "axios";

const API_URL = "https://fz-backoffice.linooxel.com/api/user/profile/me/"; // آدرس API بک‌اندت

// گرفتن پروفایل
export const getProfile = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// آپدیت پروفایل
export const updateProfile = async (data, token) => {
  const res = await axios.put(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// آپدیت بخشی از پروفایل (PATCH)
export const patchProfile = async (data, token) => {
  const res = await axios.patch(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
