import { IoPencil, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import LocationPicker from "../components/profileComponents/LocationPicker";
import { getProfile, updateProfile } from "../services/profileService";

type Status = "verified" | "unverified";

interface Profile {
  mobile?: string;
  email?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  city_id?: string;
  address?: string;
  birthday?: string;
  link?: string;
  national_code?: string;
  sheba?: string;
}

const InfoField = ({
  label,
  name,
  value,
  status,
  onChange,
  editable = true,
}: {
  label: string;
  name: string;
  value?: string;
  status: Status;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
}) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-1">
      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>
      {status === "verified" && <IoCheckmarkCircle className="text-green-500" />}
      {status === "unverified" && <IoCloseCircle className="text-red-500" />}
    </div>
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value || ""}
        readOnly={!editable}
        onChange={onChange}
        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-3 pr-4 focus:outline-none"
      />
      {editable && (
        <button
          type="button"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <IoPencil />
        </button>
      )}
    </div>
  </div>
);

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>({});
  const [cafeLocation, setCafeLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // 🔑 نمایش توکن برای دیباگ
        const token = localStorage.getItem("accessToken");
        console.debug("[ProfilePage] accessToken in localStorage:", token);

        const data = await getProfile();
        console.debug("[ProfilePage] profile data:", data);

        setProfile(data);
      } catch (err) {
        console.error("❌ خطا در گرفتن پروفایل:", err);
        alert("خطا در گرفتن اطلاعات پروفایل. لطفاً دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setCafeLocation(location.address);
    setProfile({ ...profile, address: location.address });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.debug("[ProfilePage] submitting profile update:", profile);
      await updateProfile(profile);
      alert("✅ پروفایل با موفقیت به‌روزرسانی شد");
    } catch (err) {
      console.error("❌ خطا در ذخیره پروفایل:", err);
      alert("خطا در ذخیره اطلاعات پروفایل!");
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">در حال بارگذاری پروفایل...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-t-4 border-blue-500 p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">اطلاعات حساب کاربری</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InfoField label="نام و نام خانوادگی" name="full_name" value={profile.full_name} status={profile.full_name ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="کد ملی" name="national_code" value={profile.national_code} status={profile.national_code ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="نام" name="first_name" value={profile.first_name} status={profile.first_name ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="نام خانوادگی" name="last_name" value={profile.last_name} status={profile.last_name ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="ایمیل" name="email" value={profile.email} status={profile.email ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="شماره موبایل" name="mobile" value={profile.mobile} status={profile.mobile ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="تاریخ تولد" name="birthday" value={profile.birthday} status={profile.birthday ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="شماره شبا" name="sheba" value={profile.sheba} status={profile.sheba ? "verified" : "unverified"} onChange={handleChange} />
          <InfoField label="لینک" name="link" value={profile.link} status={profile.link ? "verified" : "unverified"} onChange={handleChange} />
        </form>

        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">موقعیت مکانی کافه</label>
            {cafeLocation ? <IoCheckmarkCircle className="text-green-500" /> : <IoCloseCircle className="text-red-500" />}
          </div>
          <LocationPicker onLocationSelect={handleLocationSelect} currentLocation={cafeLocation} />
          {!cafeLocation && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">برای انتخاب موقعیت دقیق کافه روی نقشه کلیک کنید</p>}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <input id="rules" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-red focus:ring-primary-red" />
            <label htmlFor="rules" className="mr-2 text-sm text-gray-600 dark:text-gray-300">
              موافق{" "}
              <a href="#" className="font-semibold text-primary-red hover:underline">
                قوانین
              </a>{" "}
              ثبت نام هستم.
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-primary-red text-white font-bold py-3 px-12 rounded-lg hover:bg-red-700 transition-colors"
          >
            ثبت نهایی
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
