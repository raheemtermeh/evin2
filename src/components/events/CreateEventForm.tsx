import { useState } from "react";
import type { DateObject } from "react-multi-date-picker"; // ایمپورت type
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const CreateEventForm = () => {
  // نوع state ها دقیق‌تر شد
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
  const [startTime, setStartTime] = useState<DateObject | null>(null);
  const [endTime, setEndTime] = useState<DateObject | null>(null);

  const commonInputClasses =
    "w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 cursor-pointer";

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        ایجاد بازی
      </h2>
      <form>
        {/* ... بقیه فرم بدون تغییر ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              دسته بندی
            </label>
            <select className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500">
              <option>لطفا یک گزینه را انتخاب کنید</option>
              <option>بازی فکری</option>
              <option>مافیا</option>
              <option>پخش فوتبال</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              عنوان رویداد
            </label>
            <input
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 pr-4 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="نام رویداد خود را وارد کنید"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
          تاریخ و زمان
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              تاریخ
            </label>
            <div className="relative">
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)} // onChange به این شکل تغییر کرد
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={commonInputClasses}
                placeholder="انتخاب تاریخ"
              />
              <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
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
                value={startTime}
                onChange={(time) => setStartTime(time)} // onChange به این شکل تغییر کرد
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={commonInputClasses}
                placeholder="انتخاب ساعت"
              />
              <FaClock className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
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
                value={endTime}
                onChange={(time) => setEndTime(time)} // onChange به این شکل تغییر کرد
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={commonInputClasses}
                placeholder="انتخاب ساعت"
              />
              <FaClock className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        {/* ... بقیه فرم ... */}
        <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
          بلیط
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              تعداد
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 pr-4 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              قیمت بلیط <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="به تومان"
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 pr-4 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            توضیحات بازی
          </label>
          <textarea
            rows={5}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
