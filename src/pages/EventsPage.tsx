import { useState, useEffect } from "react";
import CreateEventForm from "../components/events/CreateEventForm";
import GameRequestForm from "../components/events/GameRequestForm";
import filmWatch from "../assets/image24.png";
import mafia from "../assets/mafia.png";
import bordGame from "../assets/bordGame.png";
import foot from "../assets/foot.png";

// --- کارت‌های انتخاب دسته ---
const SuggestedCard = ({ img, title, bgColor, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-2xl text-white ${bgColor} cursor-pointer transform hover:scale-105 transition-transform duration-300`}
  >
    <img
      src={img}
      alt={title}
      className="w-12 h-12 mx-auto mb-3 object-contain"
    />
    <h4 className="font-semibold text-center">{title}</h4>
  </div>
);

// --- فرم پایین صفحه برای ایجاد ایونت جدید ---
const CreateEventFormm = ({
  onEventCreated,
}: {
  onEventCreated: () => void;
}) => {
  const handleCreate = async (eventData: any) => {
    try {
      const res = await fetch(
        "https://fz-backoffice.linooxel.com/api/venues/event/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem("accessToken"), // اگر نیاز به توکن بود فعالش کن
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!res.ok) throw new Error("خطا در ایجاد ایونت جدید");
      alert("ایونت جدید با موفقیت ثبت شد ✅");
      onEventCreated();
    } catch (err) {
      console.error(err);
      alert("خطایی در ارتباط با سرور رخ داده است ❌");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <CreateEventForm onSubmit={handleCreate} />
    </div>
  );
};

// --- فرم درخواست بازی ---
const GameRequestFormm = ({
  category,
  onBack,
}: {
  category: string;
  onBack: () => void;
}) => (
  <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-fade-in">
    <GameRequestForm category={category} onBack={onBack} />
  </div>
);

// --- صفحه اصلی ایونت‌ها ---
const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // --- گرفتن لیست ایونت‌ها از API ---
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://fz-backoffice.linooxel.com/api/venues/event/"
      );
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("خطا در دریافت ایونت‌ها:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCardClick = (title: string) => setSelectedCategory(title);
  const handleBack = () => setSelectedCategory(null);

  if (selectedCategory)
    return <GameRequestFormm category={selectedCategory} onBack={handleBack} />;

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

  return (
    <div className="p-4 sm:p-6 space-y-10">
      {/* کارت‌های دسته‌بندی */}
      <section>
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
      </section>

      {/* لیست ایونت‌ها از API */}
      {/* <section>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
          ایونت‌های فعال
        </h3>

        {loading ? (
          <p className="text-gray-500">در حال بارگذاری...</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                  {event.title || "بدون عنوان"}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {event.description || "بدون توضیحات"}
                </p>
                <p className="text-sm">
                  وضعیت:{" "}
                  <span
                    className={`font-semibold ${
                      event.status === "a" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {event.status === "a" ? "فعال" : "غیرفعال"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  امتیاز: {event.point_avg ?? 0} ⭐
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">هیچ ایونتی یافت نشد.</p>
        )}
      </section> */}

      {/* فرم ایجاد ایونت جدید */}
      <CreateEventFormm onEventCreated={fetchEvents} />
    </div>
  );
};

export default EventsPage;
