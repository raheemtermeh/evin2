import React, { useState } from "react";

// --- آیکون‌ها ---
const ArrowLeftIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="3em"
    width="3em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
  </svg>
);

// --- تعریف نوع داده‌ها و خطاهای فرم ---
interface FormData {
  minPlayers: string;
  maxPlayers: string;
  duration: string;
  description: string;
}
type FormErrors = Partial<Record<keyof FormData, string>>;

// --- Props کامپوننت ---
interface GameRequestFormProps {
  category: string;
  onBack: () => void;
}

// --- کامپوننت پیش‌نمایش (با استایل بهبود یافته) ---
const Preview = ({
  data,
  category,
  onConfirm,
  onEdit,
}: {
  data: FormData;
  category: string;
  onConfirm: () => void;
  onEdit: () => void;
}) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 border-b pb-4 dark:border-gray-700">
      پیش‌نمایش درخواست
    </h2>
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
        <span>
          <strong>نام بازی:</strong>
        </span>{" "}
        <span>{category}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
        <span>
          <strong>تعداد نفرات:</strong>
        </span>{" "}
        <span>
          از {data.minPlayers} تا {data.maxPlayers} نفر
        </span>
      </div>
      <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
        <span>
          <strong>حدود زمان بازی:</strong>
        </span>{" "}
        <span>{data.duration} دقیقه</span>
      </div>
      <div className="pt-2">
        <p className="font-semibold mb-2">
          <strong>توضیحات:</strong>
        </p>
        <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          {data.description}
        </p>
      </div>
    </div>
    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
      <button
        onClick={onEdit}
        className="w-full sm:w-auto bg-gray-200 dark:bg-gray-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300"
      >
        ویرایش
      </button>
      <button
        onClick={onConfirm}
        className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/30"
      >
        تایید و ارسال
      </button>
    </div>
  </div>
);

// --- کامپوننت پیام موفقیت ---
const SuccessMessage = ({ onBack }: { onBack: () => void }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in text-center max-w-md mx-auto">
    <CheckCircleIcon className="text-green-500 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
      درخواست شما ارسال شد!
    </h2>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      پس از بررسی تیم پشتیبانی حداکثر تا ۷۲ ساعت آینده نتیجه به شما اعلام خواهد
      شد.
    </p>
    <div className="mt-8">
      <button
        onClick={onBack}
        className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  </div>
);

const GameRequestForm = ({ category, onBack }: GameRequestFormProps) => {
  // --- مدیریت وضعیت‌ها ---
  const [formData, setFormData] = useState<FormData>({
    minPlayers: "",
    maxPlayers: "",
    duration: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStep, setFormStep] = useState<"form" | "preview" | "success">(
    "form"
  );

  const inputBaseClasses =
    "w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-500 text-gray-800 dark:text-gray-200 transition-all duration-300";

  //... (بقیه منطق جاوااسکریپت بدون تغییر باقی می‌ماند)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const min = parseInt(formData.minPlayers);
    const max = parseInt(formData.maxPlayers);

    if (!formData.minPlayers || min <= 0)
      newErrors.minPlayers = "حداقل نفرات باید عددی مثبت باشد.";
    if (!formData.maxPlayers || max <= 0)
      newErrors.maxPlayers = "حداکثر نفرات باید عددی مثبت باشد.";
    else if (min && max && max < min)
      newErrors.maxPlayers = "حداکثر باید بیشتر از حداقل باشد.";
    if (!formData.duration || parseInt(formData.duration) <= 0)
      newErrors.duration = "زمان بازی باید عددی مثبت باشد.";
    if (!formData.description.trim())
      newErrors.description = "توضیحات بازی الزامی است.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormStep("preview");
    }
  };

  // --- نمایش شرطی ---
  if (formStep === "preview") {
    return (
      <Preview
        data={formData}
        category={category}
        onConfirm={() => setFormStep("success")}
        onEdit={() => setFormStep("form")}
      />
    );
  }

  if (formStep === "success") {
    return <SuccessMessage onBack={onBack} />;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-fade-in max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-8 border-b pb-4 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          درخواست بازی: <span className="text-red-500">{category}</span>
        </h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeftIcon />
          <span>بازگشت</span>
        </button>
      </header>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div>
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            نام بازی
          </label>
          <input
            type="text"
            value={category}
            readOnly
            className={`${inputBaseClasses} cursor-not-allowed bg-gray-200 dark:bg-gray-600`}
          />
        </div>

        <fieldset className="border dark:border-gray-600 p-4 rounded-lg">
          <legend className="px-2 font-semibold text-gray-700 dark:text-gray-300">
            تعداد نفرات <span className="text-red-500">*</span>
          </legend>
          <div className="w-full flex items-center gap-4">
            <input
              name="minPlayers"
              type="number"
              value={formData.minPlayers}
              onChange={handleInputChange}
              placeholder="حداقل"
              className={`${inputBaseClasses} text-center`}
            />
            <span className="text-gray-400 font-bold">–</span>
            <input
              name="maxPlayers"
              type="number"
              value={formData.maxPlayers}
              onChange={handleInputChange}
              placeholder="حداکثر"
              className={`${inputBaseClasses} text-center`}
            />
          </div>
          {(errors.minPlayers || errors.maxPlayers) && (
            <p className="text-red-500 text-sm mt-2">
              {errors.minPlayers || errors.maxPlayers}
            </p>
          )}
        </fieldset>

        <div>
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            حدود زمان بازی (دقیقه) <span className="text-red-500">*</span>
          </label>
          <input
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="مثلا: ۶۰"
            className={`${inputBaseClasses}`}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-2">{errors.duration}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            توضیحات بازی <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            placeholder="جزئیات و توضیحات بیشتر..."
            className={`${inputBaseClasses} resize-none`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/40"
          >
            ارسال به پشتیبانی
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameRequestForm;
