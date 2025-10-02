import {
  IoImageOutline,
  IoAdd,
  IoPencil,
  IoCheckmarkCircle,
  IoCloseCircle,
} from "react-icons/io5";
import cafeImage from "../assets/game-image.jpg";
import { useState } from "react";
import LocationPicker from "../components/profileComponents/LocationPicker";

// کامپوننت برای هر باکس آپلود عکس
const ImageUploadBox = ({ imageSrc }: { imageSrc?: string }) => (
  <div className="relative aspect-video w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    {imageSrc ? (
      <img
        src={imageSrc}
        alt="Uploaded content"
        className="w-full h-full object-cover rounded-lg"
      />
    ) : (
      <div className="text-gray-400 dark:text-gray-500 text-center">
        <IoImageOutline size={32} className="mx-auto" />
        <IoAdd
          size={20}
          className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1"
        />
      </div>
    )}
  </div>
);

// کامپوننت برای فیلدهای اطلاعاتی
type Status = "verified" | "unverified";

const InfoField = ({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: Status;
}) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-1">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
        {label}
      </label>
      {status === "verified" && (
        <IoCheckmarkCircle className="text-green-500" />
      )}
      {status === "unverified" && <IoCloseCircle className="text-red-500" />}
    </div>
    <div className="relative">
      <input
        type="text"
        value={value}
        readOnly
        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 pr-4 focus:outline-none"
      />
      <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <IoPencil />
      </button>
    </div>
  </div>
);

// کامپوننت اصلی صفحه پروفایل
const ProfilePage = () => {
  const menuImages = [null, null, null, null];
  const galleryImages = [null, null, cafeImage, null, null];


    const [cafeLocation, setCafeLocation] = useState("");

    const handleLocationSelect = (location: {
      lat: number;
      lng: number;
      address: string;
    }) => {
      setCafeLocation(location.address);
      // در اینجا می‌توانید location.lat و location.lng را هم ذخیره کنید
      console.log("موقعیت انتخاب شده:", location);
    };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      {/* بخش مدیریت تصاویر */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border-t-4 border-blue-500 shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          مدیریت تصاویر
        </h2>
        <div className="mb-8">
          <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            در این قسمت می‌توانید عکس <span className="text-red-500 text-xl">منو</span> کافه خود را بارگذاری
            کنید.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {menuImages.map((src, index) => (
              <ImageUploadBox
                key={`menu-${index}`}
                imageSrc={src || undefined}
              />
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            در این قسمت می‌توانید عکس و ویدئو کافه خود را بارگذاری کنید.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            اضافه کردن عکس و ویدئو باعث افزایش بازدید کافه شما می‌شود.
            <br />
            حداکثر حجم موارد بارگذار شده ... میباشد.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <ImageUploadBox
                key={`gallery-${index}`}
                imageSrc={src || undefined}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            فرمت ویدئوها باید MP4 باشد.
            <br />
            ویدئوهای غیر مرتبط توسط پشتیبانی حذف خواهد شد.
          </p>
          <button className="bg-transparent border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            انتخاب ویدئو
          </button>
        </div>
      </div>

      {/* بخش اطلاعات حساب کاربری */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-t-4 border-blue-500 p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          اطلاعات حساب کاربری
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InfoField
            label="نام و نام خانوادگی"
            value="مهدی ترمه چی"
            status="verified"
          />
          <InfoField label="کدملی" value="۰۰۳۴۸۷۹۴۷۲" status="verified" />
          <InfoField label="نام کافه" value="کافه حس خوب" status="verified" />
          <InfoField label="شماره موبایل" value="---" status="unverified" />
          <InfoField
            label="آدرس"
            value="شهران، پنجم شرقی، کافه حس خوب"
            status="verified"
          />
          <InfoField
            label="شماره شبا"
            value="IR۲۷۹۵۵۷۳۸۶۷۰۹۸۳۷۶۸۳۷۶۸۴"
            status="verified"
          />
          <InfoField label="کد پستی" value="۱۴۷۷۷۷۷۷۷۷۷" status="verified" />
          <InfoField label="تاریخ تولد" value="۱۳۷۹/۰۵/۲۳" status="verified" />
        </div>
        {/* فیلد جدید برای لوکیشن */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              موقعیت مکانی کافه
            </label>
            {cafeLocation ? (
              <IoCheckmarkCircle className="text-green-500" />
            ) : (
              <IoCloseCircle className="text-red-500" />
            )}
          </div>

          {/* استفاده از کامپوننت LocationPicker */}
          <LocationPicker
            onLocationSelect={handleLocationSelect}
            currentLocation={cafeLocation}
          />

          {!cafeLocation && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              برای انتخاب موقعیت دقیق کافه روی نقشه کلیک کنید
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <input
              id="rules"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-red focus:ring-primary-red"
            />
            <label
              htmlFor="rules"
              className="mr-2 text-sm text-gray-600 dark:text-gray-300"
            >
              موافق{" "}
              <a
                href="#"
                className="font-semibold text-primary-red hover:underline"
              >
                قوانین
              </a>{" "}
              ثبت نام هستم.
            </label>
          </div>
          <button className="w-full sm:w-auto bg-primary-red text-white font-bold py-3 px-12 rounded-lg hover:bg-red-700 transition-colors">
            ثبت نهایی
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
