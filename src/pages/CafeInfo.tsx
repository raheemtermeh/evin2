import { useEffect, useState } from "react";
import { getCafes, createCafe, updateCafe } from "../services/CafeService";

const CafeInfo = () => {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    latitude: "",
    longitude: "",
    type: "c",
    status: "a",
  });

  const fetchCafes = async () => {
    setLoading(true);
    try {
      const data = await getCafes({ status: "a" });
      setCafes(data.results || []);
    } catch (err) {
      console.error("خطا در دریافت لیست کافه‌ها:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (selectedCafe) {
        await updateCafe(selectedCafe.id, formData);
      } else {
        await createCafe(formData);
      }
      setFormData({
        name: "",
        phone: "",
        latitude: "",
        longitude: "",
        type: "c",
        status: "a",
      });
      setSelectedCafe(null);
      fetchCafes();
    } catch (err) {
      console.error("خطا در ذخیره کافه:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (cafe) => {
    setSelectedCafe(cafe);
    setFormData({
      name: cafe.name,
      phone: cafe.phone,
      latitude: cafe.latitude,
      longitude: cafe.longitude,
      type: cafe.type,
      status: cafe.status,
    });
  };

  const handleCancel = () => {
    setSelectedCafe(null);
    setFormData({
      name: "",
      phone: "",
      latitude: "",
      longitude: "",
      type: "c",
      status: "a",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Café Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            مدیریت حرفه‌ای کافه‌های شما
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 dark:border-gray-700/40 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {selectedCafe ? "✏️ ویرایش کافه" : "➕ افزودن کافه جدید"}
                </h2>
                {selectedCafe && (
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
                  >
                    ❌ انصراف
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🏷️ نام کافه
                    </label>
                    <input
                      type="text"
                      placeholder="مثلاً: کافه کتاب"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900/30 transition-all duration-300 outline-none shadow-inner"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      📞 شماره تماس
                    </label>
                    <input
                      type="text"
                      placeholder="مثلاً: ۰۹۱۲۳۴۵۶۷۸۹"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900/30 transition-all duration-300 outline-none shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🗺️ عرض جغرافیایی
                    </label>
                    <input
                      type="text"
                      placeholder="مثلاً: ۳۵.۶۸۹۵"
                      value={formData.latitude}
                      onChange={(e) =>
                        setFormData({ ...formData, latitude: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-300 outline-none shadow-inner"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      🗺️ طول جغرافیایی
                    </label>
                    <input
                      type="text"
                      placeholder="مثلاً: ۵۱.۳۸۸۹"
                      value={formData.longitude}
                      onChange={(e) =>
                        setFormData({ ...formData, longitude: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-green-500 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900/30 transition-all duration-300 outline-none shadow-inner"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-[1.02] hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 group"
                >
                  {formLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">در حال ذخیره...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {selectedCafe ? "💾 بروزرسانی" : "✨ افزودن کافه"}
                      </span>
                      <div className="group-hover:translate-x-1 transition-transform duration-300">
                        🚀
                      </div>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Cafes List */}
        <div
          className="max-w-6xl mx-auto animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 dark:border-gray-700/40 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
                    📋 لیست کافه‌ها
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    کافه‌های فعال شما
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full text-sm font-bold shadow-lg">
                    {cafes.length} کافه
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                </div>
              ) : cafes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-6 text-gray-300 dark:text-gray-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">
                    هنوز کافه‌ای اضافه نکرده‌اید
                  </p>
                  <p className="text-gray-400 dark:text-gray-500">
                    اولین کافه خود را اضافه کنید!
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {cafes.map((cafe, index) => (
                    <div
                      key={cafe.id}
                      className="group p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-700/60 dark:to-gray-700/40 backdrop-blur-lg border-2 border-white/50 dark:border-gray-600/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Card Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              {cafe.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {cafe.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 flex items-center space-x-2">
                              <span>📞 {cafe.phone}</span>
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-bold shadow">
                                فعال
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                🌍 {cafe.latitude}, {cafe.longitude}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEdit(cafe)}
                          className="px-6 py-3 bg-white/80 dark:bg-gray-600/80 border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-600 hover:border-purple-600 hover:text-white transform hover:scale-105 transition-all duration-300 font-bold shadow-lg backdrop-blur-sm"
                        >
                          ✏️ ویرایش
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CafeInfo;
