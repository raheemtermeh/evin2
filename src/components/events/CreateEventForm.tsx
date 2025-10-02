import { useState } from "react";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { div } from "framer-motion/client";
import CreateEventContinue from "./CreateEventContinue";

const CreateEventForm = () => {
  const navigate = useNavigate(); // استفاده از useNavigate برای ناوبری
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    date: null,
    startTime: null,
    endTime: null,
    ticketCount: "",
    ticketPrice: "",
    description: "",
  });

  const handleGoToEventPage = () => {
    console.log("بازگشت به صفحه اصلی");
    navigate("/orders");
  };

  const SuccessMessage = ({ onBack }: { onBack: () => void }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        درخواست شما ارسال شد!
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        پس از بررسی تیم پشتیبانی حداکثر تا ۷۲ ساعت آینده نتیجه به شما اعلام
        خواهد شد.
      </p>
      <div className="mt-8">
        <button
          onClick={onBack}
          className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          ایونت های من!
        </button>
      </div>
    </div>
  );

  const [errors, setErrors] = useState({});
  const [formStep, setFormStep] = useState("form");

  const commonInputClasses =
    "w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 placeholder:text-gray-400 dark:placeholder:text-gray-500";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "انتخاب دسته بندی الزامی است.";
    if (!formData.title) newErrors.title = "وارد کردن عنوان الزامی است.";
    if (!formData.date) newErrors.date = "انتخاب تاریخ الزامی است.";
    if (!formData.startTime) newErrors.startTime = "زمان شروع الزامی است.";
    if (!formData.ticketPrice)
      newErrors.ticketPrice = "وارد کردن قیمت الزامی است.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormStep("preview");
    }
  };

  // --- نمایش شرطی کامپوننت‌ها ---
  if (formStep === "preview") {
    return <div>
      <CreateEventContinue />
    </div>;
  }

  if (formStep === "success") {
    return <SuccessMessage onBack={handleGoToEventPage} />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        ایجاد بازی
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              دسته بندی <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={commonInputClasses}
            >
              <option value="">انتخاب کنید</option>
              <option>بازی فکری</option>
              <option>مافیا</option>
              <option>پخش فوتبال</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              عنوان رویداد <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={commonInputClasses}
              placeholder="نام رویداد خود را وارد کنید"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
          تاریخ و زمان
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              تاریخ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                value={formData.date}
                onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={commonInputClasses}
                placeholder="انتخاب تاریخ"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              زمان شروع <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                disableDayPicker
                format="HH:mm"
                value={formData.startTime}
                onChange={(time) =>
                  setFormData((prev) => ({ ...prev, startTime: time }))
                }
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={commonInputClasses}
                placeholder="انتخاب ساعت"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              زمان پایان
            </label>
            <div className="relative">
              <DatePicker
                disableDayPicker
                format="HH:mm"
                value={formData.endTime}
                onChange={(time) =>
                  setFormData((prev) => ({ ...prev, endTime: time }))
                }
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={commonInputClasses}
                placeholder="انتخاب ساعت"
              />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
          بلیط
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              ظرفیت <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="ticketCount"
              value={formData.ticketCount}
              onChange={handleInputChange}
              placeholder="0"
              className={commonInputClasses}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              قیمت بلیط <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              placeholder="به تومان"
              className={commonInputClasses}
            />
            {errors.ticketPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.ticketPrice}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              تخفیف
            </label>
            <input
              type="number"
              name="discount" // تغییر نام به discount
              placeholder="0"
              className={commonInputClasses}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            توضیحات بازی
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className={commonInputClasses}
            placeholder="توضیحات مربوط به رویداد..."
          ></textarea>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto bg-red-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-red-700 transition-colors"
          >
            ذخیره و ادامه
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
