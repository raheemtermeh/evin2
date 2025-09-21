import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import moment from "jalali-moment"; // برای فرمت تاریخ شمسی

// کامپوننت کوچک برای ورودی‌های آیکون‌دار
const InputWithIcon = ({ icon, ...props }: any) => (
  <div className="relative">
    <input
      {...props}
      className="w-full bg-gray-100 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-200"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      {icon}
    </div>
  </div>
);

const CreateEventForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  // تبدیل تاریخ میلادی به شمسی برای نمایش
  const formatPersianDate = (date: Date) => {
    return moment(date).locale("fa").format("YYYY/MM/DD");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">ایجاد بازی</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* دسته بندی */}
          <div>
            <label className="block font-semibold mb-2">دسته بندی</label>
            <select className="w-full bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-200">
              <option>لطفا یک گزینه را انتخاب کنید</option>
              <option>بازی فکری</option>
              <option>مافیا</option>
              <option>پخش فوتبال</option>
            </select>
          </div>
          {/* عنوان رویداد */}
          <div>
            <label className="block font-semibold mb-2">عنوان رویداد</label>
            <InputWithIcon placeholder="نام رویداد خود را وارد کنید" />
          </div>
        </div>

        {/* تاریخ و زمان */}
        <h3 className="text-xl font-bold mt-8 mb-4">تاریخ و زمان</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2">تاریخ</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              customInput={
                <InputWithIcon
                  icon={<FaCalendarAlt className="text-gray-400" />}
                />
              }
              // برای نمایش تقویم شمسی
              calendar="persian"
              locale="fa"
              value={startDate ? formatPersianDate(startDate) : ""}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              زمان شروع <span className="text-red-500">*</span>
            </label>
            <InputWithIcon
              type="time"
              icon={<FaClock className="text-gray-400" />}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">زمان پایان</label>
            <InputWithIcon
              type="time"
              icon={<FaClock className="text-gray-400" />}
            />
          </div>
        </div>

        {/* بلیط */}
        <h3 className="text-xl font-bold mt-8 mb-4">بلیط</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">تعداد</label>
            <InputWithIcon
              type="number"
              placeholder="0"
              icon={<FaUsers className="text-gray-400" />}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              قیمت بلیط <span className="text-red-500">*</span>
            </label>
            <InputWithIcon
              type="number"
              placeholder="به تومان"
              icon={<FaDollarSign className="text-gray-400" />}
            />
          </div>
        </div>

        {/* توضیحات */}
        <div className="mt-6">
          <label className="block font-semibold mb-2">توضیحات بازی</label>
          <textarea
            rows={5}
            className="w-full bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-200"
            placeholder="توضیحات مربوط به رویداد..."
          ></textarea>
        </div>

        {/* شرایط استفاده */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">شرایط استفاده</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded text-primary-red focus:ring-red-400"
              />
              <span className="mr-3 text-gray-700">
                عضو شرکت‌کننده کلیه مسائل ۱۵ دقیقه قبل از شروع بازی الزامی است.
              </span>
            </label>
            {/* بقیه چک‌باکس‌ها */}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto bg-primary-red text-white font-bold py-3 px-12 rounded-lg hover:bg-red-700 transition-colors"
          >
            ذخیره و اضافه
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
// import { useState } from "react";