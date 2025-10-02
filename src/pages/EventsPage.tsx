import { useState } from "react";
import CreateEventForm from "../components/events/CreateEventForm";
import GameRequestForm from "../components/events/GameRequestForm";
import filmWatch from "../assets/image24.png";
import mafia from "../assets/mafia.png";
import bordGame from "../assets/bordGame.png";
import foot from "../assets/foot.png";

// --- کامپوننت ۱: کارت‌های رنگی بالا ---
const SuggestedCard = ({ img, icon, title, bgColor, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-2xl text-white ${bgColor} cursor-pointer transform hover:scale-105 transition-transform duration-300`}
  >
    {img ? (
      <img
        src={img}
        alt={title}
        className="w-12 h-12 mx-auto mb-3 object-contain"
      />
    ) : (
      <div className="text-4xl mb-3">{icon}</div>
    )}
    <h4 className="font-semibold text-center">{title}</h4>
  </div>
);

// --- کامپوننت ۲: فرمی که همیشه پایین صفحه است ---
const CreateEventFormm = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <CreateEventForm />
    </div>
  );
};

// --- کامپوننت ۳: فرم درخواست بازی که با کلیک روی کارت‌ها نمایش داده می‌شود ---
const GameRequestFormm = ({
  category,
  onBack,
}: {
  category: string;
  onBack: () => void;
}) => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-fade-in">
      <GameRequestForm category={category} onBack={onBack} />
    </div>
  );
};

// --- کامپوننت اصلی صفحه ---
const EventsPage = () => {
  // این state مشخص می‌کند که کدام دسته انتخاب شده است
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const suggestedItems = [
    {
      img: filmWatch,
      title: "بازی‌های فکری",
      bgColor: "bg-gradient-to-tl from-[#A044FF] to-[#6A3093]",
    },
    {
      img: foot,
      title: "پخش فوتبال",
      bgColor: "bg-gradient-to-tl from-[#0DFFCC] to-[#109E6A]",
    },
    {
      img: mafia,
      title: "مافیا",
      bgColor: "bg-gradient-to-tl from-[#240B36] to-[#C31432]",
    },

    {
      img: bordGame,
      title: "بازی‌های گروهی",
      bgColor: "bg-gradient-to-tl from-[#FFCF68] to-[#FE7F44]",
    },
  ];

  // با کلیک روی کارت، نام آن در state ذخیره می‌شود
  const handleCardClick = (title: string) => {
    setSelectedCategory(title);
  };

  // با کلیک روی بازگشت، state خالی می‌شود
  const handleBack = () => {
    setSelectedCategory(null);
  };

  // --- منطق نمایش ---
  // اگر یک دسته انتخاب شده بود، فرم درخواست را نشان بده
  if (selectedCategory) {
    return <GameRequestFormm category={selectedCategory} onBack={handleBack} />;
  }

  // در غیر این صورت، صفحه اصلی را نشان بده
  return (
    <div className="p-4 sm:p-6 space-y-10">
      {/* بخش کارت‌های پیشنهادی */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          یک دسته بندی انتخاب کنید
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suggestedItems.map((item) => (
            <SuggestedCard
              key={item.title}
              {...item}
              onClick={() => handleCardClick(item.title)}
            />
          ))}
        </div>
      </div>

      {/* فرم ایجاد بازی که همیشه پایین صفحه است */}
      <CreateEventFormm />
    </div>
  );
};

export default EventsPage;
