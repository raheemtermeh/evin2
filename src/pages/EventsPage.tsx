import { FaPuzzlePiece, FaUserSecret, FaFutbol, FaUsers } from "react-icons/fa";
import CreateEventForm from "../components/events/CreateEventForm";

// کامپوننت کارت‌های پیشنهادی (بدون تغییر)
const SuggestedCard = ({ icon, title, bgColor }: any) => (
  <div
    className={`flex flex-col items-center justify-center p-6 rounded-2xl text-white ${bgColor}`}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
);

const EventsPage = () => {
  const suggestedItems = [
    {
      icon: <FaPuzzlePiece />,
      title: "بازی‌های فکری",
      bgColor: "bg-orange-500",
    },
    { icon: <FaUserSecret />, title: "مافیا", bgColor: "bg-purple-800" },
    { icon: <FaFutbol />, title: "پخش فوتبال", bgColor: "bg-green-500" },
    { icon: <FaUsers />, title: "بازی‌های گروهی", bgColor: "bg-indigo-500" },
  ];

  return (
    <div>
      {/* بخش پیشنهادی */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {" "}
        {/* <-- تغییر اصلی اینجا بود */}
        پیشنهادی
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {suggestedItems.map((item) => (
          <SuggestedCard key={item.title} {...item} />
        ))}
      </div>

      {/* بخش ایجاد بازی */}
      <CreateEventForm />
    </div>
  );
};

export default EventsPage;
