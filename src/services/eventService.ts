// src/services/eventService.js

const BASE_URL = "https://fz-backoffice.linooxel.com/api/venues/event/";

/**
 * ایجاد رویداد جدید
 * @param {Object} eventData - اطلاعات فرم رویداد
 * @returns {Promise<any>}
 */
export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(BASE_URL, {
      method: "POST", // فقط POST فعال است
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.detail || `خطا در ارسال اطلاعات (${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("❌ خطا در createEvent:", error);
    throw error;
  }
};
